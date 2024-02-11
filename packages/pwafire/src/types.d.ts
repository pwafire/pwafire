interface FontAccess {
  postscriptNames?: string[];
}

interface Navigator {
  contacts: any;
  write: any;
  // wakeLock: any;
  setAppBadge: (unreadCount: number) => any;
  clearAppBadge: () => any;
  canShare: (data?: ShareData | undefined) => boolean;
}

interface Credentials {
  otp: string;
}

declare let BarcodeDetector: {
  new ({ formats: [string] }?: { formats: string[] }): any;
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

declare let IdleDetector: { new (): any; requestPermission: () => any };
