import type { ErrorCode } from "../../types/result";

/**
 * Sets the application badge to `unreadCount`.
 *
 * Browsers display the badge on the installed PWA icon. Requires a
 * secure context.
 *
 * @see https://w3c.github.io/badging/
 */
export const setBadge = async (
  unreadCount: number,
): Promise<{ ok: boolean; message: string; code?: ErrorCode; cause?: unknown }> => {
  try {
    if (!navigator.setAppBadge) {
      return { ok: false, code: "unsupported", message: "Badging API not supported" };
    }
    await navigator.setAppBadge(unreadCount);
    return { ok: true, message: "Set" };
  } catch (error) {
    return {
      ok: false,
      code: "runtime-error",
      message: error instanceof Error ? error.message : "Failed to set badge",
      cause: error,
    };
  }
};

/**
 * Clears the application badge.
 *
 * @see https://w3c.github.io/badging/#dom-navigator-clearappbadge
 */
export const clearBadge = async (): Promise<{
  ok: boolean;
  message: string;
  code?: ErrorCode;
  cause?: unknown;
}> => {
  try {
    if (!navigator.clearAppBadge) {
      return { ok: false, code: "unsupported", message: "Badging API not supported" };
    }
    await navigator.clearAppBadge();
    return { ok: true, message: "Cleared" };
  } catch (error) {
    return {
      ok: false,
      code: "runtime-error",
      message: error instanceof Error ? error.message : "Failed to clear badge",
      cause: error,
    };
  }
};
