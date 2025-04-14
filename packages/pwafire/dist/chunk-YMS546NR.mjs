// src/pwa/files/index.ts
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

export {
  readFiles,
  pickTextFile,
  pickFile,
  createFile,
  writeFile,
  writeUrlToFile
};
