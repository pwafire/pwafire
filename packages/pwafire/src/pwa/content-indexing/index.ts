import type { ErrorCode } from "../../types/result";

export const contentIndexing = async (): Promise<{
  ok: boolean;
  message: string;
  index?: unknown;
  code?: ErrorCode;
  cause?: unknown;
}> => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const index = (registration as any).index;
    if (!index) {
      return { ok: false, code: "unsupported", message: "Content Indexing API not supported" };
    }
    return { ok: true, message: "Indexed", index };
  } catch (error) {
    return {
      ok: false,
      code: "runtime-error",
      message: error instanceof Error ? error.message : "Failed to access content index",
      cause: error,
    };
  }
};
