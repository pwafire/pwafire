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

// src/pwa/clipboard/index.ts
var clipboard_exports = {};
__export(clipboard_exports, {
  copyImage: () => copyImage,
  copyText: () => copyText,
  readText: () => readText
});
module.exports = __toCommonJS(clipboard_exports);
var copyText = async (text) => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return { ok: true, message: "Copied" };
    } else {
      return {
        ok: false,
        message: "Copy Text API not supported"
      };
    }
  } catch (error) {
    throw error;
  }
};
var readText = async () => {
  try {
    if (navigator.clipboard) {
      const text = await navigator.clipboard.readText();
      return { ok: true, message: "Read", text };
    } else {
      return { ok: false, message: "Read Text API not supported", text: null };
    }
  } catch (error) {
    throw error;
  }
};
var copyImage = async (imgURL) => {
  try {
    if (navigator.clipboard) {
      const data = await fetch(imgURL);
      const blob = await data.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      return {
        ok: true,
        message: "Image copied"
      };
    } else {
      return { ok: false, message: "Copy Image API not supported" };
    }
  } catch (error) {
    throw error;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  copyImage,
  copyText,
  readText
});
