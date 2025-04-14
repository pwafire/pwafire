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

// src/pwa/fonts/index.ts
var fonts_exports = {};
__export(fonts_exports, {
  accessFonts: () => accessFonts
});
module.exports = __toCommonJS(fonts_exports);
var accessFonts = async (config) => {
  try {
    if ("queryLocalFonts" in window) {
      const fonts = await window.queryLocalFonts(config);
      return { ok: true, message: "Fonts", fonts };
    } else {
      return { ok: false, message: "Font Access API not supported", fonts: [] };
    }
  } catch (error) {
    throw error;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  accessFonts
});
