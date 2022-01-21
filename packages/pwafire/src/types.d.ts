interface Window {
  addEventListener(arg0: string, arg1: () => { type: string; message: string }): any;
  deferredPrompt?: any;
  showOpenFilePicker: () => [any] | PromiseLike<[any]>;
  showSaveFilePicker: () => [any] | PromiseLike<[any]>;
}

interface Navigator {
  contacts: any;
  write: any;
  wakeLock: any;
  setAppBadge: (unreadCount: any) => any;
  clearAppBadge: () => any;
  canShare: (data?: ShareData | undefined) => boolean;
  hid: any;
}

declare var IdleDetector: any;
