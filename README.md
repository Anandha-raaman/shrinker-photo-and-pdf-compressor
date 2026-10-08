# ⚡ Shrinker — Photo & PDF Compressor to Exact KB

> **A 100% Privacy-First, Client-Side Photo & Multi-Page PDF Compressor designed for instant, exact file size targeting (20KB, 50KB, 100KB, 200KB) with zero cloud server uploads.**

[![Live Web Application](https://img.shields.io/badge/Live%20App-Online-success.svg?style=for-the-badge&logo=vercel)](https://shrinker-photo-and-pdf-compressor.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Privacy: 100% Offline](https://img.shields.io/badge/Privacy-100%25%20On--Device-indigo.svg?style=for-the-badge)](#-privacy--security-architecture)

---

## 🌐 Live Application & Production Links

- **Live Web Application:** [https://shrinker-photo-and-pdf-compressor.vercel.app/](https://shrinker-photo-and-pdf-compressor.vercel.app/)
- **GitHub Repository:** [https://github.com/Anandha-raaman/shrinker-photo-and-pdf-compressor](https://github.com/Anandha-raaman/shrinker-photo-and-pdf-compressor)

---

## 🌟 Key Features & Capabilities

- 🎯 **Exact KB Target Compression:** Built-in precision binary search algorithm that automatically scales image dimensions and DCT quantization tables to hit strict recruitment form limits (**20 KB** for signatures/thumbprints, **50 KB** for passport photos, **100 KB** for job/exam portals).
- 📄 **Multi-Page PDF Compressor:** Renders and compacts multi-page scanned documents, marksheets, and certificates from 15MB down to <300KB without losing text readability.
- 🗂️ **Batch Photo Compressor:** Compress 5, 10, 20+ photos simultaneously and download all processed images in a single `.zip` archive.
- 📱 **Mobile & HEIC Auto-Conversion:** Built with a custom Single-Pass Master Canvas RAM architecture supporting mobile Android `content://` URIs and automatic client-side iPhone/Samsung `.heic` / `.heif` photo conversion.
- 🔒 **100% Client-Side Privacy:** All compression algorithms execute inside the browser's memory. **Zero user files are ever uploaded, transmitted, or stored on external servers.**
- 💰 **Monetization & AdSense Compliant:** Fully configured with Google AdSense Auto-Ads, `ads.txt`, `sitemap.xml`, and complete trust pages (About Us, Terms of Service, Contact Us, Privacy Policy).

---

## 🛠️ Technology Stack & Architecture

- **Frontend Framework:** React 18 + TypeScript + Vite
- **PDF Engine:** `pdf-lib` (stream object reconstruction) + `pdfjs-dist` (canvas page rendering)
- **Archive Engine:** `JSZip` (bulk photo ZIP packaging)
- **HEIC Converter:** `heic2any` (dynamic client-side HEIC/HEIF to JPEG converter)
- **Styling System:** Custom Vanilla CSS Design System with Dark/Light theme switching & tactile mobile bottom navigation
- **Deployment & CDN:** Vercel Global CDN with static route rewrites

---

## 🛡️ Privacy & Security Architecture

Unlike traditional online compressors that transmit confidential passport photos, identity cards, signatures, and marksheets to remote cloud servers, **Shrinker operates 100% inside your local browser memory**:

1. **File System Isolation:** User files (`File` / `Blob` / `ArrayBuffer`) are read directly into browser RAM.
2. **Zero Upload Endpoints:** The application contains zero backend upload endpoints or third-party storage buckets.
3. **Memory Safety:** Image objects and canvas memory buffers are automatically cleaned up after processing completes.

---

## 📂 Project Architecture

```
shrinker-photo-and-pdf-compressor/
├── public/
│   ├── about.html          # AdSense Compliant About Us Page
│   ├── contact.html        # Support & Inquiries Page
│   ├── terms.html          # Terms of Service & Disclaimer Page
│   ├── privacy-policy.html # Privacy Policy & DART Cookie Disclosures
│   ├── ads.txt             # Google AdSense Publisher Verification
│   ├── sitemap.xml         # XML Sitemap for Search Crawlers
│   └── manifest.json       # Progressive Web App Manifest
├── src/
│   ├── components/
│   │   ├── PhotoCompressor.tsx # Exact KB & Manual Image Compressor
│   │   ├── PdfCompressor.tsx   # Multi-Page PDF Document Optimizer
│   │   ├── BatchCompressor.tsx # Bulk Image Compressor & ZIP Exporter
│   │   ├── FaqSection.tsx      # Comprehensive Form Guidelines & FAQs
│   │   └── Header.tsx / BottomNav.tsx
│   ├── services/
│   │   ├── imageCompressor.ts  # Binary-Search Quality Engine
│   │   └── pdfCompressor.ts    # PDF Canvas Rendering & Stream Compactor
│   └── App.tsx                 # Main Application Layout & Routing
├── vercel.json             # Route Rewrites & Global CDN Configuration
└── package.json
```

---

## 👤 Author & Maintainer

**Anandha Raaman S**  
*Python & Full-Stack Developer*  
- **GitHub:** [@Anandha-raaman](https://github.com/Anandha-raaman)  
- **Live Project:** [Shrinker PDF & Photo Compressor](https://shrinker-photo-and-pdf-compressor.vercel.app/)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details. 100% copyright-free and safe for commercial use.
