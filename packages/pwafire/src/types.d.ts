interface FontAccess {
  postscriptNames?: string[];
}
interface Window {
  addEventListener(arg0: string, arg1: () => { type: string; message: string }): any;
  deferredPrompt?: any;
  showOpenFilePicker: (options?: FilePickerOptions) => [any] | PromiseLike<[any]>;
  showSaveFilePicker: (options?: FilePickerOptions) => Promise<FileSystemFileHandle>;
  queryLocalFonts: (config?: FontAccess) => [any] | PromiseLike<[any]>;
  documentPictureInPicture?: any;
  wakeLock?: WakeLock;
}

interface Credentials {
  otp: string;
}

declare var BarcodeDetector: {
  new ({ formats: [] }?: { formats: string[] }): any;
  detect: () => any;
  getSupportedFormats: () => any;
};

interface FontData {
  postscriptName: string;
  fullName: string;
  family: string;
  style: string;
  blob: any;
}

interface OTPCredential extends Credential {
  code: string;
  type: "otp";
  otp: {
    transport: "sms" | "email";
    code: string;
  };
}

interface OTPCredentialOptions extends CredentialRequestOptions {
  otp: { transport: string[] };
}

declare var IdleDetector: { new (): any; requestPermission: () => any };

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
