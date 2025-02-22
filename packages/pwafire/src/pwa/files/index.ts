export const FilesApi = {
  readFiles: async (): Promise<FileResponse> => {
    if (!navigator.clipboard) {
      return { ok: false, message: "Clipboard API not supported", files: [] };
    }

    try {
      const files: File[] = [];
      const items = await navigator.clipboard.read();

      for (const item of items) {
        for (const type of item.types) {
          const blob = await item.getType(type);
          const file = new File([blob], "clipboard-file", { type });
          files.push(file);
        }
      }

      return { ok: true, message: "Files read successfully", files };
    } catch (error) {
      return { ok: false, message: `Failed to read files: ${error}`, files: [] };
    }
  },

  pickTextFile: async (): Promise<FileResponse> => {
    if (!("showOpenFilePicker" in self)) {
      return { ok: false, message: "File System Access API not supported" };
    }
    try {
      const [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();

      if (!file.type.includes("text")) {
        return { ok: false, message: "Selected file is not a text file" };
      }

      const contents = await file.text();
      return {
        ok: true,
        message: "Text file read successfully",
        contents,
        file,
      };
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return { ok: false, message: "File selection cancelled" };
      }
      return { ok: false, message: `Failed to read text file: ${error}` };
    }
  },
  pickFile: async (options?: FilePickerOptions): Promise<FileResponse> => {
    if (!("showOpenFilePicker" in self)) {
      return { ok: false, message: "File System Access API not supported" };
    }

    try {
      const [fileHandle] = options ? await window.showOpenFilePicker(options) : await window.showOpenFilePicker();
      const file = await fileHandle.getFile();
      return {
        ok: true,
        message: "File selected successfully",
        file,
      };
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return { ok: false, message: "File selection cancelled" };
      }
      return { ok: false, message: `Failed to pick file: ${error}` };
    }
  },
  createFile: async (
    options: FilePickerOptions = {
      types: [
        {
          description: "Text files",
          accept: {
            "text/plain": [".txt"],
          },
        },
      ],
    },
  ): Promise<CreateFileResponse> => {
    if (!("showSaveFilePicker" in self)) return { ok: false, message: "File System Access API not supported" };
    try {
      return {
        ok: true,
        message: "File created successfully",
        handle: await window.showSaveFilePicker(options),
      };
    } catch (error) {
      return { ok: false, message: `Failed to create file: ${error}` };
    }
  },
  writeToFile: async (handle: FileSystemFileHandle, contents: string | BufferSource | Blob): Promise<FileResponse> => {
    if (!("showSaveFilePicker" in self)) return { ok: false, message: "File System Access API not supported" };
    try {
      const writable = await handle.createWritable();
      await writable.write(contents);
      await writable.close();
      return { ok: true, message: "Written to file successfully" };
    } catch (error) {
      return { ok: false, message: `Failed to write to file: ${error}` };
    }
  },
  writeUrlToFile: async (handle: FileSystemFileHandle, url: string) => {
    if (!("showSaveFilePicker" in self)) return { ok: false, message: "File System Access API not supported" };
    try {
      const writable = await handle.createWritable();
      const response = await fetch(url);
      if (!response.body) throw new Error("Response body is null");
      await response.body.pipeTo(writable);
      return { ok: true, message: "URL written to file successfully" };
    } catch (error) {
      return { ok: false, message: `Failed to write URL to file: ${error}` };
    }
  },
};
