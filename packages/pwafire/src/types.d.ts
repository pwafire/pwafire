declare class ClipboardItem {
  constructor(data: { [mimeType: string]: Blob });
}

declare let wakeLock: any;
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
}

interface Clipboard {
  write: (arg0: any[]) => any;
}
