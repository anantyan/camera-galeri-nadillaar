# 📸 camera-galeri-nadillaar

> **Official Disposable Wedding Camera Wrapper & Link Generator** by [Galeri Nadillaar](https://invitation.galerinadillaar.com).  
> Live URL: [https://camera.galerinadillaar.com](https://camera.galerinadillaar.com)

---

## ✨ Fitur & Arsitektur

1. **Dynamic URL Routing (`/:slug`)**
   - Mendukung format routing bersih `https://camera.galerinadillaar.com/:slug`.
   - Mengarahkan konten kamera interaktif secara otomatis dari `https://our-wedding.link/kamera/:slug` via responsive `<iframe>`.
   - Konfigurasi izin perangkat keras browser penuh (`allow="camera; microphone; display-capture; autoplay; clipboard-write; web-share"`).

2. **Branded Masking & Overlay**
   - **Splash Screen Elegan**: Logo Galeri Nadillaar beranimasi + gold ring spinner yang menyamarkan loading screen default selama 2.2+ detik.
   - **Floating Header Pill (`glass-panel`)**: Header melayang semi-transparan berlogo Galeri Nadillaar lengkap dengan indikator *Live Cam*, tombol bagikan link cepat (Web Share API / Clipboard fallback), muat ulang kamera, toggle fullscreen, dan navigasi beranda tanpa menghalangi tombol shutter/viewfinder.
   - **Dynamic Tab Customization**: `document.title` dan Favicon bermerek Galeri Nadillaar.

3. **Link Generator & Form Masukan (`/`)**
   - Form input pintar yang otomatis mengekstrak slug/ID dari link `our-wedding.link` atau input kode langsung.
   - Preview link instan dengan 1-click salin URL kamera.
   - Template pesan undangan WhatsApp siap sebar untuk membagikan tautan kamera ke para tamu undangan.

4. **GitHub Pages SPA Deployment Ready**
   - Otomatis menduplikasi `dist/index.html` menjadi `dist/404.html` via plugin Vite `closeBundle` hook untuk mencegah error 404 pada deep routing GitHub Pages.
   - Dikelola oleh GitHub Actions CI/CD (`.github/workflows/deploy.yml`).
   - Domain kustom `public/CNAME` -> `camera.galerinadillaar.com`.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 8 + `@tailwindcss/vite`
- **Styling**: Tailwind CSS v4 + Google Fonts (`Cinzel` & `Plus Jakarta Sans`)
- **Routing**: `react-router-dom` v7
- **Icons**: `lucide-react`
- **Deployment**: GitHub Actions + GitHub Pages (`camera.galerinadillaar.com`)

---

## 🚀 Menjalankan Secara Lokal

```bash
# Clone repository
git clone https://github.com/anantyan/camera-galeri-nadillaar.git
cd camera-galeri-nadillaar

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build produksi
npm run build
```

---

© 2026 [Galeri Nadillaar](https://invitation.galerinadillaar.com). All rights reserved.
