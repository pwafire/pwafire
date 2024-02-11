import { FileType, ISaveFileOptions } from "./pwa/files";

interface FontAccess {
  postscriptNames?: string[];
}

declare global {
  interface Window {
    addEventListener(arg0: string, arg1: () => { type: string; message: string }): any;
    deferredPrompt?: any;
    queryLocalFonts: (config?: FontAccess) => [any] | PromiseLike<[any]>;
    showSaveFilePicker: (options?: ISaveFileOptions) => Promise<FileSystemHandle>;
    showOpenFilePicker: (options?: { types?: FileType[]; multiple?: boolean }) => Promise<FileSystemFileHandle[]>;
    showDirectoryPicker: () => Promise<FileSystemDirectoryHandle>;
  }
}

interface Navigator {
  contacts: any;
  write: any;
  wakeLock: any;
  setAppBadge: (unreadCount: number) => any;
  clearAppBadge: () => any;
  canShare: (data?: ShareData | undefined) => boolean;
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
