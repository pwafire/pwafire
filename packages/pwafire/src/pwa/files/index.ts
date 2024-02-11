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
  pickFile: async (options?: {
    types: [
      {
        description: string;
        accept: {
          "image/*"?: string[];
          "audio/*"?: string[];
          "video/*"?: string[];
        };
      },
    ];
    multiple?: boolean;
  }) => {
    try {
      let fileHandle: any;
      [fileHandle] = options ? await window.showOpenFilePicker(options) : await window.showOpenFilePicker();
      const file: any = await fileHandle.getFile();
      if (file) {
        return {
          file,
          ok: true,
          message: "File picked",
        };
      } else {
        return {
          file: null,
          ok: false,
          message: "File Picker API not supported",
        };
      }
    } catch (error) {
      throw error;
    }
  },
};
