/// <reference types="@types/dom-chromium-ai" />

import * as PwafireModule from 'pwafire';
import * as CheckModule from 'pwafire/check';

declare global {
  interface Window {
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
    __currentStreamBlob: Blob | null;
    __currentStreamType: string | null;
  }
}

export {};
