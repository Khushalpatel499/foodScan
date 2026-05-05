# 🍎 FoodScan - Smart Food Scanner PWA

A production-ready Progressive Web App that scans food product barcodes and provides instant health insights. Built with clean architecture principles.

## ✨ Features

- 📷 **Barcode Scanning** - Real-time camera-based barcode scanning
- 🏥 **Health Score** - Calculated from sugar, fat, salt (0-100 scale)
- ⚠️ **Allergen Detection** - Highlights milk, nuts, gluten, etc.
- 💡 **Smart Insights** - "High sugar content ⚠️" warnings
- 📜 **Scan History** - Stored locally, persists across sessions
- ❤️ **Favorites** - Save products you buy regularly
- 🌙 **Dark Mode** - Toggle in settings
- 🔊 **Voice Feedback** - Reads health assessment aloud
- 📱 **Installable PWA** - Works offline, add to home screen
- ✍️ **Manual Entry** - Type barcode if camera unavailable

## 🏗️ Architecture

```
src/
├── components/          # Reusable UI components
│   ├── layout/          # App shell, navigation
│   ├── product/         # Product display components
│   ├── scanner/         # Barcode scanner components
│   └── ui/              # Generic UI primitives (Button, Skeleton, etc.)
├── hooks/               # Custom React hooks (useScanner, useProduct)
├── pages/               # Route-level page components
├── services/            # External API & storage abstractions
├── stores/              # Zustand state management
├── types/               # TypeScript type definitions
└── utils/               # Pure utility functions (healthScore, voice)
```

### Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| **Zustand** over Context | Simpler API, no provider nesting, built-in persistence |
| **Custom hooks** for logic | Separates business logic from UI rendering |
| **Service layer** | API calls decoupled from components, easy to mock/swap |
| **Pure utility functions** | Health score calculation is testable without React |
| **Lazy routes** | Code splitting reduces initial bundle by ~60% |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
1. Push to GitHub
2. Connect repo in Netlify dashboard
3. Build command: `npm run build`
4. Publish directory: `dist`

Add `_redirects` file in `public/` for SPA routing:
```
/*    /index.html   200
```

## 🛠️ Tech Stack

- **React 19** + TypeScript
- **Vite 8** - Build tool
- **Tailwind CSS 4** - Styling
- **Zustand** - State management
- **html5-qrcode** - Barcode scanning
- **vite-plugin-pwa** - Service worker + manifest
- **Open Food Facts API** - Product data (free, no API key needed)

## 📱 PWA Features

- Service worker with offline caching
- Runtime caching for API responses and images
- Installable on mobile and desktop
- 192x192 and 512x512 app icons

## 🎨 Design System

- **Green** (#10b981) = Healthy
- **Yellow** (#f59e0b) = Moderate
- **Red** (#ef4444) = Avoid
- Mobile-first, max-width 512px content area
- Bottom navigation for thumb-friendly interaction
