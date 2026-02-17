# System APIs (Sync)

`connectivity`, `visibility`, and `displayMode` are **synchronous** — they read browser state directly with no async operations.

## API Surface

```typescript
connectivity(): { ok, message, online: boolean }
visibility(): { ok, message, state: string | null }
displayMode(): { ok, message, mode: "standalone" | "minimal-ui" | "fullscreen" | "browser-tab" }
```

## Usage

```typescript
import { connectivity, visibility, displayMode } from "pwafire";

const network = connectivity();
if (network.ok) console.log(network.online ? "Online" : "Offline");

const page = visibility();
if (page.ok) console.log("Page is", page.state);

const mode = displayMode();
if (mode.ok) console.log("Display mode:", mode.mode);
```

## Notes

- No `await` needed — all return immediately
- Underlying APIs: `navigator.onLine`, `document.visibilityState`, `matchMedia("(display-mode: ...)")`
