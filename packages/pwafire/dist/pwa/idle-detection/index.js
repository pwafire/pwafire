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

// src/pwa/idle-detection/index.ts
var idle_detection_exports = {};
__export(idle_detection_exports, {
  idleDetection: () => idleDetection
});
module.exports = __toCommonJS(idle_detection_exports);
var idleDetection = async (action = "start") => {
  try {
    if ("IdleDetector" in window) {
      const idleDetector = new IdleDetector();
      if (action === "start") {
        await idleDetector.start();
        return { ok: true, message: "Idle detection started" };
      } else {
        await idleDetector.stop();
        return { ok: true, message: "Idle detection stopped" };
      }
    } else {
      return { ok: false, message: "Idle Detection API not supported" };
    }
  } catch (error) {
    throw error;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  idleDetection
});
