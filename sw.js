// Apotheosis service worker — fixed for GitHub Pages subfolder deployment.

const VERSION = "apo-v6";
const HTML_CACHE = `${VERSION}-html`;
const ASSET_CACHE = `${VERSION}-assets`;

const BASE = "/apotheosis";

const PRECACHE = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/manifest.webmanifest`,
  `${BASE}/icon-192.png`,
  `${BASE}/icon-512.png`,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(ASSET_CACHE)
      .then((c) => c.addAll(PRECACHE).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names.filter((n) => !n.startsWith(VERSION)).map((n) => caches.delete(n))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Let external requests (Google Fonts, CDNs, Anthropic API) pass through untouched
  if (url.origin !== self.location.origin) return;

  // Only handle requests within our scope
  if (!url.pathname.startsWith(BASE)) return;

  const isNav = req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html");

  if (isNav) {
    // HTML: NetworkFirst so updates propagate, fallback to cache offline
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(HTML_CACHE);
        cache.put(req.url, fresh.clone()).catch(() => {});
        return fresh;
      } catch {
        const cached = await caches.match(req.url)
          || await caches.match(`${BASE}/index.html`)
          || await caches.match(`${BASE}/`);
        if (cached) return cached;
        return new Response("Offline", { status: 503, statusText: "Offline" });
      }
    })());
    return;
  }

  // Static assets: CacheFirst, populate on miss
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const res = await fetch(req);
      if (res && res.status === 200 && res.type === "basic") {
        const cache = await caches.open(ASSET_CACHE);
        cache.put(req, res.clone()).catch(() => {});
      }
      return res;
    } catch {
      return new Response("Offline asset", { status: 503 });
    }
  })());
});
