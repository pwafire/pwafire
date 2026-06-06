import type { ErrorCode } from "../../types/result";

export const contacts = async (
  props: string[],
  options?: {
    multiple: boolean;
  },
): Promise<{
  ok: boolean;
  message: string;
  contacts?: unknown[];
  code?: ErrorCode;
  cause?: unknown;
}> => {
  try {
    if (!("contacts" in navigator) || !("ContactsManager" in window)) {
      return { ok: false, code: "unsupported", message: "Contacts Picker API not supported" };
    }
    const contacts = await (navigator.contacts as any).select(props, options);
    return { ok: true, message: "Selected", contacts };
  } catch (error) {
    let code: ErrorCode = "runtime-error";
    if (error instanceof DOMException) {
      if (error.name === "InvalidStateError") code = "gesture-required";
      else if (error.name === "SecurityError") code = "insecure-context";
    }
    return {
      ok: false,
      code,
      message: error instanceof Error ? error.message : "Failed to select contacts",
      cause: error,
    };
  }
};
