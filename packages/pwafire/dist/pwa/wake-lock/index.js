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

// src/pwa/wake-lock/index.ts
var wake_lock_exports = {};
__export(wake_lock_exports, {
  wakeLock: () => wakeLock
});
module.exports = __toCommonJS(wake_lock_exports);
var wakeLock = async () => {
  try {
    if ("wakeLock" in navigator) {
      const wakeLock2 = await navigator.wakeLock.request("screen");
      return { ok: true, message: "Wake lock", wakeLock: wakeLock2 };
    } else {
      return { ok: false, message: "Wake Lock API not supported" };
    }
  } catch (error) {
    throw error;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  wakeLock
});
