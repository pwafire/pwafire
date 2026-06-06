import type { ErrorCode } from "../../types/result";

const errorCodeFor = (error: unknown): ErrorCode => {
  if (error instanceof DOMException && error.name === "NotAllowedError") {
    return "permission-denied";
  }
  return "runtime-error";
};

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
