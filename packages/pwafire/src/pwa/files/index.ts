type AcceptTypes = "text/plain" | "image/*" | "audio/*" | "video/*" | "application/*";

export interface FileType {
  description: string;
  accept: Partial<Record<AcceptTypes, string[]>>;
}

export interface ISaveFileOptions {
  id?: string;
  startIn?: string;
  suggestedName?: string;
  types?: FileType[];
}

export const FilesApi = {
  readFiles: async (): Promise<{ ok: boolean; message: string; files: File[] | null }> => {
    try {
      if (navigator.clipboard) {
        const files = [] as File[];
        const items = await navigator.clipboard.read();
        for (const item of items) {
          for (const type of item.types) {
            const blob = await item.getType(type);
            const file = new File([blob], "clipboard-file", { type });
            files.push(file);
          }
        }
        return { ok: true, message: "Read", files };
      } else {
        return { ok: false, message: "Read Files API not supported", files: null };
      }
    } catch (error) {
      throw error;
    }
  },
  pickTextFile: async () => {
    try {
      let fileHandle;
      [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();
      if (file) {
        const typeList = file.type.split("/");
        if (typeList.includes("text")) {
          const contents = await file.text();
          return { ok: true, message: "File picked", contents };
        } else {
          return { ok: false, message: "File Picker API not supported" };
        }
      } else {
        return { ok: false, message: "Please pick text type file" };
      }
    } catch (error) {
      throw error;
    }
  },
  pickFile: async (options?: { types?: FileType[]; multiple?: boolean }) => {
    try {
      let fileHandles: any[];
      fileHandles = options ? await window.showOpenFilePicker(options) : await window.showOpenFilePicker();
      if (fileHandles.length > 0) {
        const files = await Promise.all(fileHandles.map((fileHandle) => fileHandle.getFile()));
        return {
          files,
          ok: true,
          message: `${files.length} file(s) picked`,
        };
      } else {
        return {
          files: [],
          ok: false,
          message: "File Picker API not supported",
        };
      }
    } catch (error) {
      throw error;
    }
  },
  saveFile: async (contents: string, options?: ISaveFileOptions) => {
    try {
      const handle = await window.showSaveFilePicker(options);
      const writable = await (handle as FileSystemFileHandle).createWritable();
      await writable.write(contents);
      await writable.close();
      return { ok: true, message: "File saved", handle };
    } catch (error) {
      throw error;
    }
  },
  directoryPicker: async () => {
    try {
      const handle = await window.showDirectoryPicker();
      return { ok: true, message: "Directory picked", handle };
    } catch (error) {
      throw error;
    }
  },
  createNewDirectory: async (name: string, handle: FileSystemDirectoryHandle) => {
    try {
      await handle.getDirectoryHandle(name, { create: true });
      return { ok: true, message: "Directory created" };
    } catch (error) {
      throw error;
    }
  },
  resolveDirectory: async (name: string, handle: FileSystemDirectoryHandle) => {
    try {
      const newHandle = await handle.getDirectoryHandle(name);
      return { ok: true, message: "Directory resolved", handle: newHandle };
    } catch (error) {
      throw error;
    }
  },
  deleteDirectory: async (name: string, handle: FileSystemDirectoryHandle) => {
    try {
      await handle.removeEntry(name);
      return { ok: true, message: "Directory deleted" };
    } catch (error) {
      throw error;
    }
  },
  deleteFile: async (name: string, handle: FileSystemDirectoryHandle) => {
    try {
      await handle.removeEntry(name);
      return { ok: true, message: "File deleted" };
    } catch (error) {
      throw error;
    }
  },
  moveFile: async (name: string, handle: FileSystemDirectoryHandle, newHandle: FileSystemDirectoryHandle) => {
    try {
      await handle.getFileHandle(name).then(() => newHandle.getFileHandle(name, { create: true }));
      return { ok: true, message: "File moved" };
    } catch (error) {
      throw error;
    }
  },
};
