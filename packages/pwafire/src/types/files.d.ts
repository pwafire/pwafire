// File System Access API types
interface FileResponse {
  ok: boolean;
  message: string;
  files?: File[];
  file?: File;
  contents?: string;
  code?: string;
  cause?: unknown;
}

interface CreateFileResponse {
  ok: boolean;
  message: string;
  handle?: FileSystemFileHandle;
  code?: string;
  cause?: unknown;
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
