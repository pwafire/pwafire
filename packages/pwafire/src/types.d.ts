interface FontAccess {
  postscriptNames?: string[];
}
interface Window {
  addEventListener(arg0: string, arg1: () => { type: string; message: string }): any;
  deferredPrompt?: any;
  showOpenFilePicker: () => [any] | PromiseLike<[any]>;
  showSaveFilePicker: () => [any] | PromiseLike<[any]>;
  queryLocalFonts: (config?: FontAccess) => [any] | PromiseLike<[any]>;
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
