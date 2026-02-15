# Console App Documentation

The PWAFire console app provides an interactive testing environment for all Progressive Web App APIs.

## API Grouping Pattern

The console app (`/console`) groups related APIs together for better organization and discoverability:

### 🤖 AI APIs
- `summarizer` - Batch text summarization
- `summarizerStream` - Streaming text summarization

**Features:**
- Interactive modal with text input
- Configurable options (type, format, length)
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

### ⚡ System APIs
- `wakeLock` - Prevent screen sleep
- `idleDetection` - Detect user idle state
- `connectivity` - Network status
- `visibility` - Page visibility state
- `displayMode` - App display mode (standalone, etc.)

### 🎨 Media APIs
- `barcodeDetector` - Scan barcodes
- `compressStream` - Compress data streams
- `decompressStream` - Decompress data streams
- `lazyLoad` - Lazy load images/content
- `accessFonts` - Access local fonts

### 👤 User Data APIs
- `contacts` - Access device contacts
- `payment` - Payment Request API
- `webOtp` - Auto-fill OTP from SMS

### 📦 Other APIs
- `contentIndexing` - Content index for offline
- `install` - App installation prompts

## Adding New APIs

When adding new APIs to the console:

1. **Add to appropriate group** in `apiGroups` object in `app.js`
2. **Add configuration** in `apiConfigs` object
3. **Add feature detection** in `check` namespace
4. **Add display name** in `featureDisplayNames`
5. **If AI-related**: Add to `aiFeatures` array for AI tag
6. **Build and copy**: Run `npm run build` in packages/pwafire and copy to console/public/lib/

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

- **Local**: `npm start` in console directory → http://localhost:8080
- **Deploy**: `npm run deploy` for Firebase hosting
- **Requirements**: Chrome 138+ for AI APIs, modern Chrome/Edge for other features

## Architecture

### Files Structure

```
console/
├── public/
│   ├── index.html         # Main HTML structure
│   ├── app.js             # Application logic, API tests, grouping
│   ├── styles.css         # Styling with CSS variables
│   └── lib/               # Built pwafire package
├── firebase.json          # Firebase hosting config
└── package.json           # Scripts and dependencies
```

### Key Components

**API Groups** (`apiGroups` in `app.js`):
- Organizes APIs by functionality
- Renders group headers with emojis
- Improves discoverability

**API Configs** (`apiConfigs` in `app.js`):
- Defines test parameters for each API
- Handles special cases (modals, file pickers)
- Dynamic test generation

**Feature Detection**:
- Scans available APIs from `pwafire.check`
- Marks supported features with checkmarks
- Shows AI tag for AI-powered features

**Modal Interactions**:
- Custom text input for AI APIs
- File pickers for File System APIs
- Configuration options for API parameters

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
2. **Build**: `cd packages/pwafire && npm run build`
3. **Copy**: `rsync -av packages/pwafire/lib/ console/public/lib/`
4. **Test**: `cd console && npm start`
5. **Deploy**: `npm run deploy` (Firebase hosting)

## Browser Requirements

- **Chrome 138+** for AI APIs (Summarizer)
- **Modern Chrome/Edge** for most PWA APIs
- **HTTPS or localhost** required for PWA features
- **User gestures** required for certain APIs (Share, Notifications)
