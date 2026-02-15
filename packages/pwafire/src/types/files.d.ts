// File System Access API types
interface FileResponse {
  ok: boolean;
  message: string;
  files?: File[];
  file?: File;
  contents?: string;
}

interface CreateFileResponse {
  ok: boolean;
  message: string;
  handle?: FileSystemFileHandle;
}

interface FilePickerOptions {
  types: {
    description: string;
    accept: { [mimeType: string]: string[] };
  }[];
  id?: string;
  multiple?: boolean;
  suggestedName?: string;
  startIn?: string;
}
