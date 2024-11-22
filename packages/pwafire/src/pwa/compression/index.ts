export const compressionApi = {
  compress: async (readableStream: ReadableStream) => {
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
          message: "Compression Stream API not supported",
        };
      }
    } catch (error) {
      throw error;
    }
  },
  decompress: async (compressedReadableStream: ReadableStream) => {
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
          message: "Decompression Stream API not supported",
        };
      }
    } catch (error) {
      throw error;
    }
  },
};
