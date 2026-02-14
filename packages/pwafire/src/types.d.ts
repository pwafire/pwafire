interface FontAccess {
  postscriptNames?: string[];
}
interface Window {
  addEventListener(arg0: string, arg1: () => { type: string; message: string }): unknown;
  deferredPrompt?: unknown;
  showOpenFilePicker: (options?: FilePickerOptions) => Promise<unknown>;
  showSaveFilePicker: (options?: FilePickerOptions) => Promise<FileSystemFileHandle>;
  queryLocalFonts: (config?: FontAccess) => Promise<unknown>;
  documentPictureInPicture?: unknown;
  wakeLock?: WakeLock;
}

interface Credentials {
  otp: string;
}

declare let BarcodeDetector: {
  new (options?: { formats: string[] }): unknown;
  getSupportedFormats(): Promise<string[]>;
};

interface FontData {
  postscriptName: string;
  fullName: string;
  family: string;
  style: string;
  blob: unknown;
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

declare let IdleDetector: { new (): unknown; requestPermission(): Promise<PermissionState> };

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

interface LazyLoadResult {
  ok: boolean;
  message: string;
}

interface ImageOptions {
  src?: string;
  placeholder?: string | null;
}

interface BackgroundOptions {
  background?: string;
  placeholder?: string | null;
}

interface ScrollOptions {
  animation?: string;
  delay?: number;
  style?: "fade" | "slide" | "zoom" | "none";
}

interface InitOptions {
  images?: string;
  backgrounds?: string;
  animations?: string;
  style?: string;
}
