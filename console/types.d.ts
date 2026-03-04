/// <reference types="@types/dom-chromium-ai" />

import * as PwafireModule from 'pwafire';
import * as CheckModule from 'pwafire/check';

interface OpenFilePickerOptions {
  types?: Array<{ description?: string; accept?: Record<string, string[]> }>;
}

declare global {
  interface Window {
    showOpenFilePicker?: (
      options?: OpenFilePickerOptions
    ) => Promise<FileSystemFileHandle[]>;
    pwafire: typeof PwafireModule;
    check: typeof CheckModule;
    runTest: (apiName: string) => Promise<void>;
    runAllTests: () => Promise<void>;
    clearConsole: () => void;
    toggleConsole: () => void;
    checkAllFeatures: () => void;
    closeSidebar: () => void;
    downloadStream: () => void;
    __summarizerCloseModal: (() => void) | null;
    __lastFileHandle: FileSystemFileHandle | null;
    __visibilityUnlisten: (() => void) | null;
    __currentStreamBlob: Blob | null;
    __currentStreamType: string | null;
  }
}

export {};
