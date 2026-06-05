// Verifies every supported pwafire import shape resolves at runtime.
// Each shape is statically imported so Vite resolves it at build time;
// the panel reports which ones actually produced a callable function.

import { copyText as namedCopyText, pwa } from "pwafire";
import { copyText as deepCopyText } from "pwafire/clipboard";
import * as checkNs from "pwafire/check";

type Shape = {
  label: string;
  example: string;
  ok: boolean;
};

const shapes: Shape[] = [
  {
    label: "Named import",
    example: 'import { copyText } from "pwafire"',
    ok: typeof namedCopyText === "function",
  },
  {
    label: "Deep import",
    example: 'import { copyText } from "pwafire/clipboard"',
    ok: typeof deepCopyText === "function",
  },
  {
    label: "Namespace (back-compat)",
    example: 'import { pwa } from "pwafire"',
    ok: typeof pwa?.copyText === "function",
  },
  {
    label: "Subpath namespace",
    example: 'import * as check from "pwafire/check"',
    ok: typeof checkNs === "object" && Object.keys(checkNs).length > 0,
  },
];

export const renderImportsPanel = (mountId = "imports-list"): void => {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  mount.innerHTML = shapes
    .map(
      ({ label, example, ok }) => `
      <div class="import-row ${ok ? "ok" : "fail"}" title="${example}">
        <span class="import-status">${ok ? "✓" : "✗"}</span>
        <span class="import-label">${label}</span>
      </div>
    `
    )
    .join("");
};

export const importsSummary = (): { ok: number; total: number } => ({
  ok: shapes.filter((s) => s.ok).length,
  total: shapes.length,
});
