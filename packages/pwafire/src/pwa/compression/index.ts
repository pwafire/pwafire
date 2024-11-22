export const compressionApi = {
  compress: async (readableStream: ReadableStream) => {
    try {
      if ("CompressionStream" in window) {
        return {
          message: "Compressed",
          stream: readableStream.pipeThrough(new CompressionStream("gzip")),
        };
      } else {
        throw new Error("Compression Stream API not supported");
      }
    } catch (error) {
      throw error;
    }
  },
  decompress: async (compressedReadableStream: ReadableStream) => {
    try {
      if ("DecompressionStream" in window) {
        return {
          message: "Decompressed",
          stream: compressedReadableStream.pipeThrough(new DecompressionStream("gzip")),
        };
      } else {
        throw new Error("Decompression Stream API not supported");
      }
    } catch (error) {
      throw error;
    }
  },
};
