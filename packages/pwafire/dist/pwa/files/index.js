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

// src/pwa/files/index.ts
var files_exports = {};
__export(files_exports, {
  createFile: () => createFile,
  pickFile: () => pickFile,
  pickTextFile: () => pickTextFile,
  readFiles: () => readFiles,
  writeFile: () => writeFile,
  writeUrlToFile: () => writeUrlToFile
});
module.exports = __toCommonJS(files_exports);
var readFiles = async () => {
  try {
    if ("showOpenFilePicker" in self) {
      const [fileHandle] = await self.showOpenFilePicker();
      const file = await fileHandle.getFile();
      return {
        ok: true,
        message: "File read successfully",
        file,
        handle: fileHandle
      };
    } else {
      return {
        ok: false,
        message: "File API not supported"
      };
    }
  } catch (error) {
    throw error;
  }
};
var pickTextFile = async () => {
  try {
    if ("showOpenFilePicker" in self) {
      const [fileHandle] = await self.showOpenFilePicker({
        types: [
          {
            description: "Text Files",
            accept: {
              "text/plain": [".txt"]
            }
          }
        ]
      });
      const file = await fileHandle.getFile();
      return {
        ok: true,
        message: "Text file picked successfully",
        file,
        handle: fileHandle
      };
    } else {
      return {
        ok: false,
        message: "File API not supported"
      };
    }
  } catch (error) {
    throw error;
  }
};
var pickFile = async (options) => {
  try {
    if ("showOpenFilePicker" in self) {
      const [fileHandle] = await self.showOpenFilePicker(options);
      const file = await fileHandle.getFile();
      return {
        ok: true,
        message: "File picked successfully",
        file,
        handle: fileHandle
      };
    } else {
      return {
        ok: false,
        message: "File API not supported"
      };
    }
  } catch (error) {
    throw error;
  }
};
var createFile = async (options) => {
  try {
    if ("showSaveFilePicker" in self) {
      const fileHandle = await self.showSaveFilePicker(options);
      return {
        ok: true,
        message: "File created successfully",
        handle: fileHandle
      };
    } else {
      return {
        ok: false,
        message: "File API not supported"
      };
    }
  } catch (error) {
    throw error;
  }
};
var writeFile = async (handle, contents) => {
  try {
    const writable = await handle.createWritable();
    await writable.write(contents);
    await writable.close();
    return {
      ok: true,
      message: "File written successfully",
      handle
    };
  } catch (error) {
    throw error;
  }
};
var writeUrlToFile = async (handle, url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
    return {
      ok: true,
      message: "URL written to file successfully"
    };
  } catch (error) {
    throw error;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createFile,
  pickFile,
  pickTextFile,
  readFiles,
  writeFile,
  writeUrlToFile
});
