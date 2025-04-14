// src/pwa/compression/index.ts
var compressStream = async (readableStream) => {
  try {
    if ("CompressionStream" in window) {
      return {
        ok: true,
        message: "Compressed",
        stream: readableStream.pipeThrough(new CompressionStream("gzip"))
      };
    } else {
      return {
        ok: false,
        message: "Compression Streams API not supported"
      };
    }
  } catch (error) {
    throw error;
  }
};
var decompressStream = async (compressedReadableStream) => {
  try {
    if ("DecompressionStream" in window) {
      return {
        ok: true,
        message: "Decompressed",
        stream: compressedReadableStream.pipeThrough(new DecompressionStream("gzip"))
      };
    } else {
      return {
        ok: false,
        message: "DeCompression Streams API not supported"
      };
    }
  } catch (error) {
    throw error;
  }
};

export {
  compressStream,
  decompressStream
};
