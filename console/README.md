# 🔥 PWAFire Console

Interactive testing environment for PWAFire APIs.

## 🚀 Quick Start

```bash
cd console
npm start
```

Opens at **http://localhost:8080**

## 🎮 Features

- **Interactive Tests** - Test all 26 PWA APIs
- **Feature Detection** - Real-time browser capability check
- **Live Console** - View API responses and logs
- **Keyboard Shortcuts** - `Ctrl+R`, `Ctrl+L`, `Ctrl+T`, `Ctrl+S`
- **Matrix Theme** - Cyberpunk terminal interface

## 🚀 Deploy

```bash
npm run deploy
```

Deploys to: **https://pwafire-test-console.web.app**

## 📋 Available Commands

```bash
npm start           # Build + test + serve locally
npm test            # Run Node.js tests
npm run serve       # Start dev server only
npm run deploy      # Deploy to Firebase
```

## 🛠️ Development

**Terminal 1** - Watch mode:
```bash
cd packages/pwafire
npm run dev
```

**Terminal 2** - Console server:
```bash
cd console
npm run serve
```

Changes auto-rebuild and reload in browser.

## 📂 Structure

```
console/
├── public/
│   ├── index.html      # Console UI
│   ├── app.js          # Test logic
│   ├── styles.css      # Styling
│   └── lib/            # PWAFire library
└── tests/              # Node.js tests
```

## 🎯 What's Tested

- ✅ 26 PWA API tests
- ✅ 20 feature detections
- ✅ Package exports
- ✅ TypeScript types
- ✅ ESM/CJS compatibility

Start testing: `npm start` then open **http://localhost:8080** 🔥
