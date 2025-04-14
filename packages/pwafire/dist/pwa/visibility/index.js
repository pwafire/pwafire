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

// src/pwa/visibility/index.ts
var visibility_exports = {};
__export(visibility_exports, {
  displayMode: () => displayMode,
  visibility: () => visibility
});
module.exports = __toCommonJS(visibility_exports);
var visibility = async (isVisible, notAvailable) => {
  try {
    if (document.visibilityState) {
      const state = document.visibilityState;
      if (state === "visible") {
        isVisible();
        return { ok: true, message: "Visible" };
      }
    } else {
      notAvailable();
      return {
        ok: false,
        message: "Visibility API not supported"
      };
    }
  } catch (error) {
    throw error;
  }
};
var displayMode = async (callback) => {
  try {
    window.addEventListener("DOMContentLoaded", () => {
      const displayMode2 = window.matchMedia("(display-mode: standalone)").matches ? "standalone" : window.matchMedia("(display-mode: minimal-ui)").matches ? "minimal-ui" : window.matchMedia("(display-mode: fullscreen)").matches ? "fullscreen" : "broswer-tab";
      callback(displayMode2);
    });
  } catch (error) {
    throw error;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  displayMode,
  visibility
});
