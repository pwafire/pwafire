// Exercises the v6.5 surface end-to-end in a real consumer:
// - `pwafire/capability` for structured detection — re-evaluated per
//   render so `userActivation`/`secureContext`/etc. reflect live state
// - typed `code` discriminator from `pwafire/clipboard` on the copy
//   button (branches on the literal, not the message)

import { copyText } from "pwafire";
import * as cap from "pwafire/capability";

const LABELS: Array<{ label: string; probe: () => ReturnType<typeof cap.clipboard> }> = [
  { label: "clipboard", probe: cap.clipboard },
  { label: "notification", probe: cap.notification },
  { label: "passkey", probe: cap.passkey },
  { label: "web-share", probe: cap.webShare },
  { label: "wake-lock", probe: cap.wakeLock },
];

// Read live each render — capability is `userActivation.isActive`-sensitive
// (and `isSecureContext`-sensitive), so a one-shot read at module load
// would freeze `reason` at "no-user-activation" forever after the first
// user click.
const snapshot = () => LABELS.map(({ label, probe }) => ({ label, c: probe() }));

export const renderCapabilityDemo = (mountId = "capability-demo-list"): void => {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  mount.innerHTML = snapshot()
    .map(({ label, c }) => {
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

export const capabilityDemoSummary = (): { supported: number; total: number } => {
  const live = snapshot();
  return {
    supported: live.filter((r) => r.c.supported).length,
    total: live.length,
  };
};

// Wired to the in-app "Try copyText" button (see console/index.html).
// Demonstrates the typed-code branching pattern consumers should adopt.
// After clicking, re-renders the panel so the reason flips from
// "no-user-activation" → "supported" (proving the live re-read works).
export const demoCopy = async (): Promise<string> => {
  const r = await copyText("hello from pwafire v6.5");
  renderCapabilityDemo();
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
