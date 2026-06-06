import type { ErrorCode } from "../../types/result";

type FilesResult = FileResponse & { code?: ErrorCode };
type CreateResult = CreateFileResponse & { code?: ErrorCode };

export const readFiles = async (): Promise<FilesResult> => {
  if (!navigator.clipboard) {
    return { ok: false, code: "unsupported", message: "Clipboard API not supported", files: [] };
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
    return {
      ok: false,
      code: error instanceof DOMException && error.name === "NotAllowedError" ? "permission-denied" : "runtime-error",
      message: `Failed to read files: ${error}`,
      files: [],
      cause: error,
    };
  }
};

export const pickTextFile = async (): Promise<FilesResult> => {
  if (!("showOpenFilePicker" in self)) {
    return { ok: false, code: "unsupported", message: "File System Access API not supported" };
  }
  try {
    const [fileHandle] = (await self.showOpenFilePicker()) as any;
    const file = await fileHandle.getFile();

    if (!file.type.includes("text")) {
      return { ok: false, code: "invalid-argument", message: "Selected file is not a text file" };
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
      return { ok: false, code: "cancelled", message: "File selection cancelled", cause: error };
    }
    return {
      ok: false,
      code: "runtime-error",
      message: `Failed to read text file: ${error}`,
      cause: error,
    };
  }
};

export const pickFile = async (options?: FilePickerOptions): Promise<FilesResult> => {
  if (!("showOpenFilePicker" in self)) {
    return { ok: false, code: "unsupported", message: "File System Access API not supported" };
  }

  try {
    const [fileHandle] = (options ? await self.showOpenFilePicker(options) : await self.showOpenFilePicker()) as any;
    const file = await fileHandle.getFile();
    return {
      ok: true,
      message: "File selected successfully",
      file,
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { ok: false, code: "cancelled", message: "File selection cancelled", cause: error };
    }
    return {
      ok: false,
      code: "runtime-error",
      message: `Failed to pick file: ${error}`,
      cause: error,
    };
  }
};

export const createFile = async (
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
): Promise<CreateResult> => {
  if (!("showSaveFilePicker" in self)) return { ok: false, code: "unsupported", message: "File System Access API not supported" };
  try {
    return {
      ok: true,
      message: "File created successfully",
      handle: await self.showSaveFilePicker(options),
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { ok: false, code: "cancelled", message: "File creation cancelled", cause: error };
    }
    return {
      ok: false,
      code: "runtime-error",
      message: `Failed to create file: ${error}`,
      cause: error,
    };
  }
};

export const writeFile = async (
  handle: FileSystemFileHandle,
  contents: string | BufferSource | Blob,
): Promise<FilesResult> => {
  if (!("showSaveFilePicker" in self)) return { ok: false, code: "unsupported", message: "File System Access API not supported" };
  try {
    const writable = await handle.createWritable();
    await writable.write(contents);
    await writable.close();
    return { ok: true, message: "Written to file successfully" };
  } catch (error) {
    return {
      ok: false,
      code: "runtime-error",
      message: `Failed to write to file: ${error}`,
      cause: error,
    };
  }
};

export const writeUrlToFile = async (
  handle: FileSystemFileHandle,
  url: string,
): Promise<FilesResult> => {
  if (!("showSaveFilePicker" in self)) return { ok: false, code: "unsupported", message: "File System Access API not supported" };
  try {
    const writable = await handle.createWritable();
    try {
      const response = await fetch(url);
      if (!response.body) {
        await writable.abort();
        return { ok: false, code: "runtime-error", message: "Response body is null" };
      }
      await response.body.pipeTo(writable);
    } catch (error) {
      await writable.abort();
      throw error;
    }
    return { ok: true, message: "URL written to file successfully" };
  } catch (error) {
    return {
      ok: false,
      code: "runtime-error",
      message: `Failed to write URL to file: ${error}`,
      cause: error,
    };
  }
};
