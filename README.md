# Apotheosis — Personal Operating System

A mobile-first Progressive Web App (PWA) for daily self-mastery: track body, money, discipline, and systems — all stored locally on your device.

---

## 🚀 Deploy to GitHub Pages (free hosting)

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click the **+** icon → **New repository**
3. Name it `apotheosis` (or anything you like)
4. Set it to **Public**
5. Do **not** check "Add a README" (we already have one)
6. Click **Create repository**

### Step 2 — Upload the files

On your new empty repo page, click **uploading an existing file** (or "Add file → Upload files").

Upload **all** of these files:
```
index.html
manifest.webmanifest
sw.js
icon-192.png
icon-192.svg
icon-512.png
icon-512.svg
README.md
```

Click **Commit changes**.

### Step 3 — Enable GitHub Pages

1. In your repo, go to **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **Deploy from a branch**
3. Set branch to **main** (or `master`) and folder to **/ (root)**
4. Click **Save**

GitHub will show you your live URL — it looks like:
```
https://YOUR-USERNAME.github.io/apotheosis/
```

> It takes 1–3 minutes to go live the first time.

---

## 📱 Install on your phone

### iPhone / iPad (Safari required)

1. Open **Safari** and go to your GitHub Pages URL
2. Tap the **Share** button (box with arrow pointing up)
3. Scroll down and tap **"Add to Home Screen"**
4. Name it `Apotheosis` and tap **Add**
5. The app icon now appears on your home screen — tap it to launch fullscreen

> ⚠️ Must use Safari. Chrome/Firefox on iOS cannot install PWAs.

### Android (Chrome)

1. Open **Chrome** and go to your GitHub Pages URL
2. Tap the **⋮ menu** (top-right)
3. Tap **"Add to Home screen"** or **"Install app"**
4. Tap **Install**
5. The app appears on your home screen and in your app drawer

### Android (alternative — banner)

Chrome may show an automatic **"Add Apotheosis to Home screen"** banner at the bottom — just tap **Install**.

---

## ✨ Features

| Pillar | What you track |
|---|---|
| 🏠 Home | Daily state (energy, focus, mood, sleep) · North Star · Directives |
| 💪 Body | Workouts · Nutrition · Water · Skin · Sleep log |
| 💰 Money | Net worth · Income · Expenses · Investments · Savings |
| 🔥 Discipline | Habits · Streaks · Pomodoro timer · Journal |
| ⚙️ Systems | Content · Books · Projects · Protocols |
| 🔐 Vault | Backup/restore · CSV export · Weekly review |

**All data is stored locally** on your device using `localStorage` — nothing is sent to any server.

---

## ⌨️ Keyboard shortcuts (desktop)

| Key | Action |
|---|---|
| `V` | Open Vault |
| `G` then `H/B/M/D/S` | Navigate pages |
| `J` | Search Journal |
| `F` | Open Focus Timer |
| `E` | Export JSON backup |
| `?` | Show all shortcuts |
| `Esc` | Close any panel |

---

## 🔄 Updating the app

When you push new files to GitHub, the app updates automatically for users who are online. The service worker uses **NetworkFirst** for HTML so updates propagate immediately.

---

## 📂 File structure

```
apotheosis/
├── index.html            # The entire app (self-contained)
├── manifest.webmanifest  # PWA metadata (name, icons, display mode)
├── sw.js                 # Service worker (offline support)
├── icon-192.png          # App icon (small)
├── icon-512.png          # App icon (large, splash screen)
├── icon-192.svg          # Vector icon
├── icon-512.svg          # Vector icon
└── README.md             # This file
```
