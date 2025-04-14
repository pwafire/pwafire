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

// src/pwa/install/index.ts
var install_exports = {};
__export(install_exports, {
  install: () => install
});
module.exports = __toCommonJS(install_exports);
var install = async (type = "installed", callback) => {
  try {
    if (navigator.serviceWorker) {
      const methods = {
        checkIfAppInstalled: async () => {
          try {
            window.addEventListener("appinstalled", () => {
              callback("installed");
            });
            return { ok: true, message: "Check if installed" };
          } catch (error) {
            throw error;
          }
        },
        beforeInstallPromptEvent: async () => {
          try {
            window.addEventListener("beforeinstallprompt", (event) => {
              callback(event);
            });
            return { ok: true, message: "Before install prompt" };
          } catch (error) {
            throw error;
          }
        },
        installApp: async () => {
          try {
            callback("install");
            return { ok: true, message: "Install App" };
          } catch (error) {
            throw error;
          }
        }
      };
      switch (type) {
        case "before":
          return await methods.beforeInstallPromptEvent();
        case "install":
          return await methods.installApp();
        case "installed":
          return await methods.checkIfAppInstalled();
        default:
          return { ok: false, message: "Type can be 'install', 'installed' or 'before'" };
      }
    } else {
      return { ok: false, message: "Service Worker not supported" };
    }
  } catch (error) {
    throw error;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  install
});
