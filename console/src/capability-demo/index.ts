// Exercises the v6.5 surface end-to-end in a real consumer:
// - `pwafire/capability` for structured detection (one row per API,
//   showing supported/reason live)
// - typed `code` discriminator from `pwafire/clipboard` on the copy
//   button (branches on the literal, not the message)

import { copyText } from "pwafire";
import * as cap from "pwafire/capability";

type Row = { label: string; cap: ReturnType<typeof cap.clipboard> };

const rows: Row[] = [
  { label: "clipboard", cap: cap.clipboard() },
  { label: "notification", cap: cap.notification() },
  { label: "passkey", cap: cap.passkey() },
  { label: "web-share", cap: cap.webShare() },
  { label: "wake-lock", cap: cap.wakeLock() },
];

export const renderCapabilityDemo = (mountId = "capability-demo-list"): void => {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  mount.innerHTML = rows
    .map(({ label, cap: c }) => {
      const ok = c.supported ? "ok" : "fail";
      const status = c.supported ? "supported" : c.reason ?? "no-api";
      return `
        <div class="import-row ${ok}" title="secureContext=${c.secureContext}; needsGesture=${c.requiresUserActivation}">
          <span class="import-status">${c.supported ? "✓" : "✗"}</span>
          <span class="import-label">${label}</span>
          <span class="import-reason">${status}</span>
        </div>
      `;
    })
    .join("");
};

export const capabilityDemoSummary = (): { supported: number; total: number } => ({
  supported: rows.filter((r) => r.cap.supported).length,
  total: rows.length,
});

// Wired to the in-app "Try copyText" button (see console/index.html).
// Demonstrates the typed-code branching pattern consumers should adopt.
export const demoCopy = async (): Promise<string> => {
  const r = await copyText("hello from pwafire v6.5");
  if (r.ok) return "copied to clipboard";
  switch (r.code) {
    case "permission-denied":
      return "permission denied — grant clipboard access and retry";
    case "unsupported":
      return "Clipboard API not supported in this browser";
    case "gesture-required":
      return "needs a user gesture — click again";
    default:
      return `failed: ${r.code ?? "unknown"} (${r.message})`;
  }
};
