import type { ErrorCode } from "../../types/result";

export const compressStream = async (
  readableStream: ReadableStream,
): Promise<{
  ok: boolean;
  message: string;
  stream?: ReadableStream;
  code?: ErrorCode;
  cause?: unknown;
}> => {
  try {
    if (!("CompressionStream" in window)) {
      return { ok: false, code: "unsupported", message: "Compression Streams API not supported" };
    }
    return {
      ok: true,
      message: "Compressed",
      stream: readableStream.pipeThrough(new CompressionStream("gzip")),
    };
  } catch (error) {
    return {
      ok: false,
      code: "runtime-error",
      message: error instanceof Error ? error.message : "Failed to compress stream",
      cause: error,
    };
  }
};

export const decompressStream = async (
  compressedReadableStream: ReadableStream,
): Promise<{
  ok: boolean;
  message: string;
  stream?: ReadableStream;
  code?: ErrorCode;
  cause?: unknown;
}> => {
  try {
    if (!("DecompressionStream" in window)) {
      return { ok: false, code: "unsupported", message: "DeCompression Streams API not supported" };
    }
    return {
      ok: true,
      message: "Decompressed",
      stream: compressedReadableStream.pipeThrough(new DecompressionStream("gzip")),
    };
  } catch (error) {
    return {
      ok: false,
      code: "runtime-error",
      message: error instanceof Error ? error.message : "Failed to decompress stream",
      cause: error,
    };
  }
};
