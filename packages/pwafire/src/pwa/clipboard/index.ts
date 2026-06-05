import type { ErrorCode } from "../../types/result";

const errorCodeFor = (error: unknown): ErrorCode => {
  if (error instanceof DOMException && error.name === "NotAllowedError") {
    return "permission-denied";
  }
  return "runtime-error";
};

/**
 * Writes text to the system clipboard via the async Clipboard API.
 *
 * Requires a secure context. Most browsers require recent user
 * activation; without it, the call rejects with `permission-denied`.
 *
 * @see https://w3c.github.io/clipboard-apis/#dom-clipboard-writetext
 */
export const copyText = async (
  text: string,
): Promise<{ ok: boolean; message: string; code?: ErrorCode; cause?: unknown }> => {
  try {
    if (!navigator.clipboard) {
      return { ok: false, code: "unsupported", message: "Copy Text API not supported" };
    }
    await navigator.clipboard.writeText(text);
    return { ok: true, message: "Copied" };
  } catch (error) {
    return {
      ok: false,
      code: errorCodeFor(error),
      message: error instanceof Error ? error.message : "Failed to copy text",
      cause: error,
    };
  }
};

/**
 * Reads plain text from the system clipboard.
 *
 * Requires a secure context and (in most browsers) user activation.
 * Some browsers also surface a one-time permission prompt.
 *
 * @see https://w3c.github.io/clipboard-apis/#dom-clipboard-readtext
 */
export const readText = async (): Promise<{
  ok: boolean;
  message: string;
  text: string | null;
  code?: ErrorCode;
  cause?: unknown;
}> => {
  try {
    if (!navigator.clipboard) {
      return { ok: false, code: "unsupported", message: "Read Text API not supported", text: null };
    }
    const text = await navigator.clipboard.readText();
    return { ok: true, message: "Read", text };
  } catch (error) {
    return {
      ok: false,
      code: errorCodeFor(error),
      message: error instanceof Error ? error.message : "Failed to read text",
      text: null,
      cause: error,
    };
  }
};

/**
 * Fetches an image URL and writes it to the clipboard as a `ClipboardItem`.
 *
 * Requires a secure context. The blob's MIME type must be one the
 * platform supports (typically `image/png`).
 *
 * @see https://w3c.github.io/clipboard-apis/#dom-clipboard-write
 */
export const copyImage = async (
  imgURL: string,
): Promise<{ ok: boolean; message: string; code?: ErrorCode; cause?: unknown }> => {
  try {
    if (!navigator.clipboard) {
      return { ok: false, code: "unsupported", message: "Copy Image API not supported" };
    }
    const data = await fetch(imgURL);
    const blob = await data.blob();
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
    return { ok: true, message: "Image copied" };
  } catch (error) {
    return {
      ok: false,
      code: errorCodeFor(error),
      message: error instanceof Error ? error.message : "Failed to copy image",
      cause: error,
    };
  }
};
