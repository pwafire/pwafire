import type { ErrorCode } from "../../types/result";

export const accessFonts = async (
  config?: { postscriptNames?: string[]; sfnt?: boolean },
): Promise<{
  ok: boolean;
  message: string;
  fonts: FontData[];
  code?: ErrorCode;
  cause?: unknown;
}> => {
  try {
    if (!("queryLocalFonts" in window)) {
      return { ok: false, code: "unsupported", message: "Font Access API not supported", fonts: [] };
    }
    const fonts = (await window.queryLocalFonts(config)) as FontData[];
    return { ok: true, message: "Fonts", fonts };
  } catch (error) {
    return {
      ok: false,
      code: error instanceof DOMException && error.name === "NotAllowedError" ? "permission-denied" : "runtime-error",
      message: error instanceof Error ? error.message : "Failed to access fonts",
      fonts: [],
      cause: error,
    };
  }
};
