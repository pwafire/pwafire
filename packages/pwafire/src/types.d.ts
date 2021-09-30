interface Window {
  addEventListener(arg0: string, arg1: () => { type: string; message: string }): any;
  deferredPrompt?: any;
  showOpenFilePicker: () => [any] | PromiseLike<[any]>;
}

interface Navigator {
  contacts: any;
  write: any;
  wakeLock: any;
  setAppBadge: (unreadCount: any) => any;
  clearAppBadge: () => any;
  canShare: any;
  hid: any;
}

interface Clipboard {
  write: (data: ClipboardItem[]) => Promise<void>;
}
