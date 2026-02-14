# 🔥 PWAFire Local Test Environment

A comprehensive **console-style testing environment** for the PWAFire package before publishing to npm.

## 🚀 Quick Start (One Command!)

```bash
cd test-local
./start.sh
# or
npm start
```

This single command will:
- ✅ Build the pwafire package
- ✅ Copy library files to public folder
- ✅ Run all Node.js tests (22 exports)
- ✅ Start the development server
- ✅ Open at **http://localhost:8080**

**To stop:** Press `Ctrl+C`

---

## 🎮 Console-Style Browser Interface

Open **http://localhost:8080** to access the interactive test console featuring:

### **Visual Design**
- 🌌 **Matrix rain animation** background effect
- 💚 **Cyberpunk theme** with neon green and cyan colors
- 🖥️ **Terminal-style interface** with monospace fonts
- ✨ **Glowing text effects** and smooth animations
- 📐 **No scrolling** - everything fits on one screen

### **Three-Panel Layout**

#### **Left Panel - Feature Detection (⚡)**
- Auto-scans all 20 PWA features on load
- Color-coded status indicators (green = supported, red = not supported)
- Hover effects with neon glow
- Real-time feature availability check

#### **Center Panel - API Tests (🧪)**
Interactive test cards for:
- 📤 Web Share API
- 🔔 Notifications
- 📋 Clipboard
- ☀️ Wake Lock
- 🔴 Badging
- 📶 Network Info
- ⛶ Fullscreen
- 👁️ Visibility

Each test shows:
- Execute button with hover glow effect
- Real-time results in compact display
- Success/failure indicators

#### **Right Panel - Quick Actions (⚡)**
- **▶ RUN ALL TESTS** - Execute all API tests sequentially
- **🗑️ CLEAR CONSOLE** - Clear console output
- **🔍 SCAN FEATURES** - Re-scan PWA feature support

**Live Stats:**
- Exports: 22/22
- Features: X/20 supported
- Tests Run: X
- Success: X
- Failed: X

**Keyboard Shortcuts:**
- `Ctrl+R` - Run all tests
- `Ctrl+L` - Clear console
- `Ctrl+S` - Scan features

#### **Bottom Panel - Console Output**
- Live logging with timestamps
- Color-coded messages:
  - 🟢 Green = Success
  - 🔴 Red = Error
  - 🔵 Cyan = Info
- Auto-scrolls to latest output
- Blinking cursor effect

---

## 🧪 Test Coverage

### **Node.js Tests** (`tests/`)

Run from terminal:
```bash
npm test
```

**What it tests:**
- ✅ **test-exports.js** - Verifies all 22 package exports
  - Main export with 35+ functions
  - Check API with 20 feature checks
  - All scoped imports (`pwafire/badging`, `pwafire/check`, etc.)
- ✅ **test-features.js** - Tests feature detection APIs

### **Browser Tests** (`public/index.html`)

Interactive console UI with:
- 🔍 **Feature Detection** - Check browser PWA API support
- 🧪 **API Tests** - Interactive testing of 8 core PWA features
- 📊 **Real-time Stats** - Live test results and metrics
- 💻 **Console Output** - Detailed logging with timestamps

### **All PWA Features Covered:**

| Feature | Detection | Interactive Test |
|---------|-----------|------------------|
| Badging API | ✅ | ✅ |
| Barcode Detector | ✅ | - |
| Clipboard API | ✅ | ✅ |
| Compression Streams | ✅ | - |
| Network Information | ✅ | ✅ |
| Contacts Picker | ✅ | - |
| Content Indexing | ✅ | - |
| File System Access | ✅ | - |
| Font Access | ✅ | - |
| Fullscreen API | ✅ | ✅ |
| Idle Detection | ✅ | - |
| Install API | ✅ | - |
| Lazy Loading | ✅ | - |
| Notification API | ✅ | ✅ |
| Payment Request | ✅ | - |
| Screen Details | ✅ | - |
| Visibility API | ✅ | ✅ |
| Wake Lock | ✅ | ✅ |
| Web OTP | ✅ | - |
| Web Share | ✅ | ✅ |

---

## 💻 Development Workflow

### **Active Development Mode**

**Terminal 1** - Watch mode (auto-rebuild on changes):
```bash
cd packages/pwafire
npm run dev
```

**Terminal 2** - Test server:
```bash
cd test-local
npm run serve
```

**Terminal 3** - Copy updated files to browser:
```bash
cd test-local
cp -r ../packages/pwafire/lib/* public/lib/
```

### **Quick Development Cycle**

1. Make changes to `packages/pwafire/src/`
2. Files auto-rebuild (Terminal 1)
3. Copy to public: `cp -r ../packages/pwafire/lib/* public/lib/`
4. Refresh browser to test

### **Complete Rebuild**

```bash
cd test-local
./setup.sh
```

This rebuilds everything from scratch.

---

## 📋 Pre-Publishing Checklist

Use this test environment to verify before publishing to npm:

- [ ] **All exports load correctly**
  - Main export with 35+ functions
  - Check API with 20 feature checks
  - All scoped imports work

- [ ] **Package formats work**
  - ✅ ESM format (`import`)
  - ✅ CJS format (`require`)

- [ ] **TypeScript types generated**
  - `.d.ts` files in `lib/`
  - Types for all exports

- [ ] **Node.js compatibility**
  - All exports importable
  - No browser-only crashes

- [ ] **Browser functionality**
  - All PWA APIs accessible
  - Feature detection works
  - APIs return correct response format

- [ ] **Test coverage**
  - 22/22 exports pass
  - Browser console shows no errors
  - Interactive tests work as expected

---

## 🛠️ Available Commands

```bash
# One-command startup (recommended)
npm start              # Build + test + serve

# Individual commands
npm test               # Run all Node.js tests
npm run test:exports   # Test package exports only
npm run test:features  # Test feature detection only
npm run serve          # Start dev server only

# Setup/maintenance
./setup.sh            # Complete rebuild + install
./start.sh            # Full startup with tests
```

---

## 🐛 Troubleshooting

### **"Cannot find module 'pwafire'"**

Run the setup script:
```bash
./setup.sh
```

Or manually install:
```bash
npm install ../packages/pwafire
```

### **Changes not reflected in browser**

1. Check that files are building: `cd ../packages/pwafire && npm run dev`
2. Wait for build to complete
3. Copy files: `cp -r ../packages/pwafire/lib/* public/lib/`
4. Hard refresh browser (`Cmd+Shift+R` on Mac, `Ctrl+Shift+R` on Windows)

### **Browser console shows 404 errors for lib files**

The lib files need to be copied to the public folder:
```bash
cd test-local
cp -r ../packages/pwafire/lib/* public/lib/
```

Or run `./setup.sh` which does this automatically.

### **TypeScript build errors**

Make sure TypeScript definitions are generated:
```bash
cd packages/pwafire
npm run build
ls lib/*.d.ts  # Should show .d.ts files
```

### **Matrix animation causing performance issues**

The background animation is very light, but if needed, you can disable it by commenting out the matrix effect in the browser console:
```javascript
clearInterval(/* matrix interval */)
```

### **Port 8080 already in use**

Kill the existing process:
```bash
lsof -ti:8080 | xargs kill
```

Or use a different port:
```bash
python3 -m http.server 3000 --directory public
```

---

## 📂 Project Structure

```
test-local/
├── .gitignore              # Ignores node_modules and public/lib
├── README.md               # This file
├── package.json            # Dependencies and scripts
├── setup.sh                # Complete setup script
├── start.sh                # One-command startup script
│
├── public/
│   ├── index.html          # Console-style test interface
│   └── lib/                # Auto-generated (copied from ../packages/pwafire/lib)
│       ├── index.mjs
│       ├── index.js
│       ├── *.d.ts
│       └── pwa/
│
└── tests/
    ├── test-exports.js     # Export validation tests
    └── test-features.js    # Feature detection tests
```

---

## 🎯 What Makes This Special

1. **🎮 Console-Style UI** - Cyberpunk terminal aesthetic with Matrix effects
2. **⚡ One-Command Start** - `npm start` does everything
3. **📊 Live Stats** - Real-time test metrics and results
4. **⌨️ Keyboard Shortcuts** - Fast testing with hotkeys
5. **🎨 No Scrolling** - Everything visible on one screen
6. **💚 Color-Coded Logs** - Easy to scan success/failure
7. **🔄 Auto Feature Scan** - Detects capabilities on load
8. **📦 22 Export Tests** - Comprehensive validation
9. **🧪 Interactive Tests** - Click-to-test all PWA APIs
10. **🌌 Matrix Animation** - Cool background effects

---

## 📝 Tips

- Use `Ctrl+R` in the browser console to quickly run all tests
- The console auto-scrolls to show the latest output
- Hover over feature detection items for visual feedback
- Test buttons glow on hover - very satisfying! ✨
- The matrix effect in the background is subtle but adds atmosphere
- All test results show in both the UI and browser's dev console

---

## 🎉 Ready to Test!

Your package is ready for thorough local testing. The console interface provides everything you need to verify your PWAFire package works perfectly before publishing to npm.

**Start testing:**
```bash
cd test-local
npm start
```

Then open **http://localhost:8080** and enjoy the console! 🔥
