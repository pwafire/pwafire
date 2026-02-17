# Broadcast Channel API

Cross-tab communication for same-origin browsing contexts. Sync state across tabs without a server (e.g. tenant switching, login/logout).

## API Surface

```typescript
broadcast = {
  channel(name: string): { ok, message, channel: BroadcastChannel | null }
  send(channelName?: string): { ok, message }
  listen(channelName?: string, onMessage?: (data: unknown) => void): { ok, message, channel? }
}
```

**Check:** `check.broadcast()` — returns `true` if Broadcast Channel API is supported.

All methods are **synchronous** — the underlying Broadcast Channel API has no async operations.


## Usage

### Create channel and post

```typescript
import { broadcast } from "pwafire";

const result = broadcast.channel("tenant-context");
if (result.ok && result.channel) {
  result.channel.postMessage({ type: "TENANT_SWITCH", tenantId: "acme" });
  result.channel.close();
}
```

### Listen for messages

```typescript
const result = broadcast.channel("tenant-context");
if (result.ok && result.channel) {
  result.channel.onmessage = (e) => {
    if (e.data?.type === "TENANT_SWITCH") {
      updateAuthForTenant(e.data.tenantId);
    }
  };
}
```

### Helpers (console demo)

```typescript
broadcast.send(); // Send test message (default channel)
broadcast.listen(undefined, (data) => console.log(data)); // Listen with callback
```

## Notes

- **Same origin only** — All tabs must share the same origin.
- **Sender does not receive** — The tab that calls `postMessage` does not receive its own message.
- **Structured clone** — Data is serialized via the structured clone algorithm.
- **Browser support** — Widely available since March 2022 (Chrome, Firefox, Safari, Edge).

## See also

- [MDN: Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)
