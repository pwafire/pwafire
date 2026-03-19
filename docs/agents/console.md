# Console App Documentation

The PWAFire console app provides an interactive testing environment for all Progressive Web App APIs.

## API Grouping Pattern

The console app (`/console`) groups related APIs together for better organization and discoverability:

### 🤖 AI APIs

- `summarizer` - Batch text summarization
- `summarizerStream` - Streaming text summarization
- `translator` - Batch text translation
- `translatorStream` - Streaming text translation
- `languageDetector` - Detect language(s) in text

**Features:**

- Interactive modals with text input for all AI APIs
- Configurable options:
  - **Summarizer**: type, format, length
  - **Translator**: source language, target language
  - **Language Detector**: automatic detection
- Stream support for real-time results
- Status codes for error handling
- AI tag in features list

### 📋 Clipboard APIs

- `copyText` - Copy text to clipboard
- `readText` - Read text from clipboard
- `copyImage` - Copy images to clipboard

### 📁 File System APIs

- `pickFile` - Pick any file
- `pickTextFile` - Pick text files specifically
- `readFiles` - Read files from clipboard
- `createFile` - Create new file with save picker
- `writeFile` - Write content to file
- `writeUrlToFile` - Download URL content to file

### 🔔 Notification APIs

- `notification` - Show push notifications
- `setBadge` - Set app badge count
- `clearBadge` - Clear app badge

### 🔗 Sharing

- `webShare` - Share content via native share sheet

### 🖥️ Screen APIs

- `screenShare` - Capture screen/window
- `webPIP` - Picture-in-picture mode
- `fullscreen` - Toggle fullscreen mode

### 📡 Broadcast APIs

- `broadcast.send` - Send message to other tabs (sync, no loading bar)
- `broadcast.listen` - Listen for messages from other tabs (sync, no loading bar)

### ⚡ System APIs

- `wakeLock` - Prevent screen sleep
- `idleDetection` - Detect user idle state
- `connectivity` - Network status (sync, no loading bar)
- `visibility` - Page visibility state (sync, no loading bar)
- `displayMode` - App display mode (sync, no loading bar)

### 🎨 Media APIs

- `barcodeDetector` - Scan barcodes
- `compressStream` - Compress data streams
- `decompressStream` - Decompress data streams
- `lazyLoad` - Lazy load images/content
- `accessFonts` - Access local fonts

### 💳 Payment

- `payment` - **Open BobBucks sheet** — `supportedMethods` **`https://bobbucks.dev/pay`** (Chrome [Payment Handler sample](https://googlechrome.github.io/samples/paymentrequest/payment-handler/)); `onApprove` logs `PaymentResponse` and returns `true`. [payment.md](https://github.com/pwafire/pwafire/blob/main/docs/apis/payment.md).

### 👤 User Data APIs

- `contacts` - Access device contacts
- `webOtp` - Auto-fill OTP from SMS

### 📦 Other APIs

- `contentIndexing` - Content index for offline
- `install` - App installation prompts

## Adding New APIs

When adding new APIs to the console:

1. **Add to appropriate group** in `apiGroups` object in `src/api-configs/index.ts`
2. **Add configuration** in `apiConfigs` object in `src/api-configs/index.ts`
3. **Add feature detection** in `check` namespace in the pwafire package
4. **Add display name** in `featureDisplayNames` in `src/features/index.ts`
5. **If AI-related**:
   - Add to `aiFeatures` array for AI tag
   - Create modal function in `src/modals/index.ts` if needed
   - Add type definition in `src/types/index.ts`
6. **Build pwafire package**: Run `npm run build` in `packages/pwafire`
7. **Test**: Run `npm run dev` in console directory

## Response Pattern

All APIs follow consistent response structure:

```javascript
{
  ok: boolean,              // Success/failure
  status: string,           // "success" | "not-supported" | "unavailable" | "user-activation-required" | "error"
  message: string,          // Human-readable message
  ...data                   // API-specific data (summary, file, stream, etc.)
}
```

## Testing

- **Local Dev**: `npm run dev` in console directory → http://localhost:8080 (with HMR)
- **Local Preview**: `npm run preview` after building
- **Deploy**: `npm run deploy` for Firebase hosting
- **Requirements**: Chrome 138+ for AI APIs, modern Chrome/Edge for other features

## Architecture

### Files Structure

```
console/
├── public/
│   ├── index.html         # Main HTML structure
│   ├── app.ts             # Legacy entry point (being migrated)
│   ├── styles.css         # Styling with CSS variables
│   └── types.d.ts         # Global type declarations
├── src/
│   ├── api-configs/       # API test configurations and grouping
│   ├── app/               # Main application logic
│   ├── features/          # Feature detection utilities
│   ├── keyboard/          # Keyboard shortcuts handler
│   ├── log/               # Console logging utilities
│   ├── matrix/            # Matrix rain animation
│   ├── modals/            # AI modal implementations
│   ├── results/           # Test results display
│   ├── stats/             # Statistics tracking
│   ├── tests/             # Test execution logic
│   └── types/             # TypeScript type definitions
├── firebase.json          # Firebase hosting config
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── package.json           # Scripts and dependencies
```

### Key Components

**API Groups** (`src/api-configs/index.ts`):

- Organizes APIs by functionality (AI, Clipboard, File System, etc.)
- Renders group headers with emojis
- Improves discoverability

**API Configs** (`src/api-configs/index.ts`):

- Defines test parameters for each API
- Handles special cases (modals, file pickers)
- Dynamic test generation
- Async parameter support for modal interactions

**Feature Detection** (`src/features/index.ts`):

- Scans available APIs from `pwafire.check`
- Marks supported features with checkmarks
- Shows AI tag for AI-powered features

**Modal Interactions** (`src/modals/index.ts`):

- `showSummarizerModal()` - Text summarization configuration
- `showTranslatorModal()` - Translation language selection
- `showLanguageDetectorModal()` - Language detection input
- Reuses modal UI elements for consistent UX
- Promise-based async API
- Stream output support for real-time results

## Styling Guide

### Color Palette

- **Background**: `#000` (black)
- **Panels**: `#111` - `#222` (dark grays)
- **Text**: `#fff` (white), `#888` (muted)
- **Accent**: `#00ff00` (green)
- **AI Gradient**: `#667eea` → `#764ba2` (purple gradient)

### Design Principles

- Monochrome with green accents
- No box-shadows (user preference)
- BEM-like naming conventions
- Mobile-first responsive design
- CSS variables for consistency

## Development Workflow

1. **Make changes** to pwafire package in `/packages/pwafire/src`
2. **Build package**: `cd packages/pwafire && npm run build`
3. **Make changes** to console in `/console/src`
4. **Dev server**: `cd console && npm run dev` (http://localhost:8080)
5. **Build console**: `cd console && npm run build`
6. **Deploy**: `cd console && npm run deploy` (Firebase hosting)

The console now uses Vite for development with hot module replacement and TypeScript support.

## Browser Requirements

- **Chrome 138+** for AI APIs (Summarizer)
- **Modern Chrome/Edge** for most PWA APIs
- **HTTPS or localhost** required for PWA features
- **User gestures** required for certain APIs (Share, Notifications)
