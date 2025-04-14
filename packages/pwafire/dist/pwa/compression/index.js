"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/pwa/compression/index.ts
var compression_exports = {};
__export(compression_exports, {
  compressStream: () => compressStream,
  decompressStream: () => decompressStream
});
module.exports = __toCommonJS(compression_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  compressStream,
  decompressStream
});
