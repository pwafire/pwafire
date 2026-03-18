# System APIs (Sync)

`connectivity`, `visibility`, and `displayMode` are **synchronous** — they read browser state directly with no async operations.

## API Surface

```typescript
connectivity(): { ok, message, online: boolean }
visibility(): { ok, message, state: string | null, onlisten: (cb: (state: DocumentVisibilityState) => void) => { unlisten: () => void } }
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

## Visibility listener

To react when the tab becomes visible or hidden (e.g. user switches tabs), use `onlisten`. Call `unlisten()` when you no longer need updates (e.g. component unmount).

```typescript
const result = visibility();
if (result.ok && result.onlisten) {
  const { unlisten } = result.onlisten((state) => {
    console.log("Visibility:", state);
  });
  // later: unlisten();
}
```

## Notes

- No `await` needed — all return immediately
- Underlying APIs: `navigator.onLine`, `document.visibilityState`, `matchMedia("(display-mode: ...)")`
- Visibility: `onlisten` subscribes to `document`'s `visibilitychange`; the callback receives `"visible"` or `"hidden"`
