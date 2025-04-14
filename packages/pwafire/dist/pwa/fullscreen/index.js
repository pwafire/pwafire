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

// src/pwa/fullscreen/index.ts
var fullscreen_exports = {};
__export(fullscreen_exports, {
  fullscreen: () => fullscreen
});
module.exports = __toCommonJS(fullscreen_exports);
var fullscreen = async () => {
  try {
    if (document.fullscreenEnabled) {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        return { ok: true, message: "Fullscreen" };
      } else {
        await document.exitFullscreen();
        return { ok: true, message: "Exit fullscreen" };
      }
    } else {
      return { ok: false, message: "Fullscreen API not supported" };
    }
  } catch (error) {
    throw error;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fullscreen
});
