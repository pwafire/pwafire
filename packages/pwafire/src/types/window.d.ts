// Window augmentations and global types
interface Window {
  addEventListener(arg0: string, arg1: () => { type: string; message: string }): unknown;
  deferredPrompt?: unknown;
  showOpenFilePicker: (options?: FilePickerOptions) => Promise<unknown>;
  showSaveFilePicker: (options?: FilePickerOptions) => Promise<FileSystemFileHandle>;
  queryLocalFonts: (config?: FontAccess) => Promise<unknown>;
  documentPictureInPicture?: unknown;
  wakeLock?: WakeLock;
}
