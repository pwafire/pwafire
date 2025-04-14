declare const readFiles: () => Promise<FileResponse>;
declare const pickTextFile: () => Promise<FileResponse>;
declare const pickFile: (options?: FilePickerOptions) => Promise<FileResponse>;
declare const createFile: (options?: FilePickerOptions) => Promise<CreateFileResponse>;
declare const writeFile: (handle: FileSystemFileHandle, contents: string | BufferSource | Blob) => Promise<FileResponse>;
declare const writeUrlToFile: (handle: FileSystemFileHandle, url: string) => Promise<{
    ok: boolean;
    message: string;
}>;

export { createFile, pickFile, pickTextFile, readFiles, writeFile, writeUrlToFile };
