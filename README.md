# ⚡ Shrinker: Photo & PDF Compressor

> **100% Offline, Privacy-First Photo and Multi-Page PDF Compressor to Exact File Sizes (20KB, 50KB, 100KB, 200KB).**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Offline-success.svg)](#privacy-guarantee)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Android-indigo.svg)](#deployment)

---

## 🌟 Key Features

- 🎯 **Exact KB Target Compression**: Built-in precision binary search algorithm that automatically scales image dimensions and quality to hit strict government form limits (e.g. **20 KB** for signatures/thumbprints, **50 KB** for passport/visa photos, **100 KB** for job/exam portals).
- 📄 **Multi-Page PDF Compressor**: Renders and compacts multi-page scanned documents, resumes, and certificates from 15MB down to <300KB without losing text readability.
- 🗂️ **Batch Photo Compressor**: Compress up to 30 photos at once and download everything as a single `.zip` file.
- 🔒 **100% Client-Side & Private**: All compression algorithms execute inside the browser's memory. **Zero user files are ever uploaded, transmitted, or stored on external servers.**
- 💰 **Monetization-Ready**: Pre-configured responsive Google AdSense banners for immediate passive ad earnings.
- 📱 **Google Play Store Ready**: Pre-packaged with Capacitor for instant `.aab` / `.apk` release generation.

---

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Vanilla CSS Design System (Dark & Light theme, tactile mobile-first UI)
- **PDF Engine**: `pdf-lib` + `pdfjs-dist` (client-side canvas rendering)
- **Archive Engine**: `jszip` (bulk photo ZIP packaging)
- **Mobile Runtime**: Capacitor 7 (Android native packaging)

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Clone the repository
git clone https://github.com/Anandha-raaman/shrinker-photo-and-pdf-compressor.git

# 2. Navigate to project
cd shrinker-photo-and-pdf-compressor

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open your browser at `http://localhost:3000/`.

---

## 🌐 Free Web Deployment (Vercel)

1. Open [Vercel](https://vercel.com/new).
2. Connect your GitHub account and import `shrinker-photo-and-pdf-compressor`.
3. Click **Deploy** (zero configuration needed, `vercel.json` is included).
4. Your website will be live in 45 seconds with free HTTPS and global CDN.

---

## 📱 Google Play Store Android Build

```bash
# 1. Build web bundle
npm run build

# 2. Add native Android platform
npx cap add android

# 3. Open in Android Studio to build signed .AAB
npx cap open android
```

Full publishing kit, keywords, and Google Play Data Safety answers can be found in [`docs/PLAY_STORE_GUIDE.md`](docs/PLAY_STORE_GUIDE.md).

---

## 🛡️ Privacy Guarantee

Shrinker is strictly on-device. It does not collect personal identifiable information (PII), device identifiers, or tracking telemetry. Read our full [Privacy Policy](public/privacy-policy.html).

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details. 100% copyright-free and safe for commercial use.
