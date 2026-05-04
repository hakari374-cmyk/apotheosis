// Apotheosis service worker — offline-first shell + asset caching.
// NetworkFirst for HTML navigations (so deploys propagate),
// CacheFirst for static assets (icons, manifest, css/js bundles).

const VERSION = "apo-v1";
const HTML_CACHE = `${VERSION}-html`;
const ASSET_CACHE = `${VERSION}-assets`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(ASSET_CACHE).then((c) =>
      c.addAll([
        "/",
        "/manifest.webmanifest",
        "/icon-192.png",
        "/icon-512.png",
      ]).catch(() => {})
    )
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
  if (url.origin !== self.location.origin) return;

  // HTML / navigation → NetworkFirst with offline fallback
  const isNav = req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html");

  if (isNav) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(HTML_CACHE);
        cache.put("/", fresh.clone()).catch(() => {});
        return fresh;
      } catch {
        const cache = await caches.open(HTML_CACHE);
        const cached = await cache.match("/");
        if (cached) return cached;
        const asset = await caches.match("/");
        if (asset) return asset;
        return new Response("Offline", { status: 503, statusText: "Offline" });
      }
    })());
    return;
  }

  // Static assets → CacheFirst, populate on miss
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
      return cached || new Response("Offline asset", { status: 503 });
    }
  })());
});
