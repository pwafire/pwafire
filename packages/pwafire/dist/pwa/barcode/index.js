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

// src/pwa/barcode/index.ts
var barcode_exports = {};
__export(barcode_exports, {
  barcodeDetector: () => barcodeDetector
});
module.exports = __toCommonJS(barcode_exports);
var barcodeDetector = async (options) => {
  try {
    if ("BarcodeDetector" in window) {
      const formatSupported = (await BarcodeDetector.getSupportedFormats()).includes(options.format);
      if (formatSupported) {
        const barcodeDetector2 = new BarcodeDetector({
          formats: [options.format]
        });
        const barcodes = await barcodeDetector2.detect(options.image);
        return {
          ok: barcodes ? true : false,
          message: barcodes ? "Barcode detected" : "No barcode detected",
          barcodes
        };
      } else {
        return {
          ok: false,
          message: `Sorry, "${options.format.charAt(0).toUpperCase() + options.format.slice(1)}" format not supported`
        };
      }
    } else {
      return {
        ok: false,
        message: "Barcode Detector API not supported"
      };
    }
  } catch (error) {
    throw error;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  barcodeDetector
});
