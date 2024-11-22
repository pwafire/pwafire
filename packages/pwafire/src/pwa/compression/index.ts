export const compressionStreamsApi = {
  compressStream: async (readableStream: ReadableStream) => {
    try {
      if ("CompressionStream" in window) {
        return {
          ok: true,
          message: "Compressed",
          stream: readableStream.pipeThrough(new CompressionStream("gzip")),
        };
      } else {
        return {
          ok: false,
          message: "Compression Streams API not supported",
        };
      }
    } catch (error) {
      throw error;
    }
  },
  decompressStream: async (compressedReadableStream: ReadableStream) => {
    try {
      if ("DecompressionStream" in window) {
        return {
          ok: true,
          message: "Decompressed",
          stream: compressedReadableStream.pipeThrough(new DecompressionStream("gzip")),
        };
      } else {
        return {
          ok: false,
          message: "DeCompression Streams API not supported",
        };
      }
    } catch (error) {
      throw error;
    }
  },
};
