declare const check: {
    badging: () => boolean;
    barcode: () => boolean;
    clipboard: () => boolean;
    compression: () => boolean;
    connectivity: () => boolean;
    contacts: () => boolean;
    contentIndexing: () => Promise<boolean>;
    files: () => boolean;
    fonts: () => boolean;
    fullscreen: () => boolean;
    idleDetection: () => boolean;
    install: () => boolean;
    lazyLoad: () => boolean;
    notification: () => boolean;
    payment: () => boolean;
    screen: () => boolean;
    visibility: () => boolean;
    wakeLock: () => boolean;
    webOTP: () => boolean;
    webShare: () => boolean;
};

export { check };
