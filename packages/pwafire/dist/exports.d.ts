declare const setBadge: (unreadCount: number) => Promise<{
    ok: boolean;
    message: string;
}>;
declare const clearBadge: () => Promise<{
    ok: boolean;
    message: string;
}>;

declare const barcodeDetector: (options: {
    image: Blob | HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | ImageBitmap;
    format: "aztec" | "code_128" | "code_39" | "code_93" | "codabar" | "data_matrix" | "ean_13" | "ean_8" | "itf" | "pdf417" | "qr_code" | "upc_a" | "upc_e";
}) => Promise<{
    ok: boolean;
    message: string;
    barcodes: any;
} | {
    ok: boolean;
    message: string;
    barcodes?: undefined;
}>;

declare const copyText: (text: string) => Promise<{
    ok: boolean;
    message: string;
}>;
declare const readText: () => Promise<{
    ok: boolean;
    message: string;
    text: string | null;
}>;
declare const copyImage: (imgURL: string) => Promise<{
    ok: boolean;
    message: string;
}>;

declare const compressStream: (readableStream: ReadableStream) => Promise<{
    ok: boolean;
    message: string;
    stream: ReadableStream<any>;
} | {
    ok: boolean;
    message: string;
    stream?: undefined;
}>;
declare const decompressStream: (compressedReadableStream: ReadableStream) => Promise<{
    ok: boolean;
    message: string;
    stream: ReadableStream<any>;
} | {
    ok: boolean;
    message: string;
    stream?: undefined;
}>;

declare const connectivity: (online: () => void, offline: () => void) => Promise<{
    ok: boolean;
    message: string;
}>;

declare global {
    interface Navigator {
        contacts: {
            select: (props: string[]) => Promise<any>;
        };
    }
}
declare const contacts: (props: string[]) => Promise<{
    ok: boolean;
    message: string;
    contacts: any;
}>;

declare const contentIndexing: () => Promise<{
    ok: boolean;
    message: string;
    index: any;
} | {
    ok: boolean;
    message: string;
    index?: undefined;
}>;

declare const readFiles: () => Promise<FileResponse>;
declare const pickTextFile: () => Promise<FileResponse>;
declare const pickFile: (options?: FilePickerOptions) => Promise<FileResponse>;
declare const createFile: (options?: FilePickerOptions) => Promise<CreateFileResponse>;
declare const writeFile: (handle: FileSystemFileHandle, contents: string | BufferSource | Blob) => Promise<FileResponse>;
declare const writeUrlToFile: (handle: FileSystemFileHandle, url: string) => Promise<{
    ok: boolean;
    message: string;
}>;

declare const accessFonts: (config?: {
    postscriptNames?: string[];
    sfnt?: boolean;
}) => Promise<{
    ok: boolean;
    message: string;
    fonts: [any];
} | {
    ok: boolean;
    message: string;
    fonts: never[];
}>;

declare const fullscreen: () => Promise<{
    ok: boolean;
    message: string;
}>;

declare const idleDetection: (action?: string) => Promise<{
    ok: boolean;
    message: string;
}>;

declare const install: (type: ("before" | "install" | "installed") | undefined, callback: (event: string | any) => any) => Promise<{
    ok: boolean;
    message: string;
}>;

declare const loadImage: (element: string, options?: ImageOptions) => Promise<LazyLoadResult>;
declare const loadBackground: (element: string, options?: BackgroundOptions) => Promise<LazyLoadResult>;
declare const loadOnScroll: (element: string, options?: ScrollOptions) => Promise<LazyLoadResult>;
declare const lazyLoad: (options?: InitOptions) => Promise<LazyLoadResult>;

declare const notification: (data: {
    title: string;
    options: {
        body: string;
        icon?: string;
        badge?: string;
        vibrate?: number[];
        sound?: string;
        timestamp: number;
        data?: any;
        dir?: "auto" | "ltr" | "rtl";
        requireInteraction?: boolean;
        renotify?: boolean;
        silent?: boolean;
        actions?: {
            action: string;
            type: "button" | "text";
            title: string;
            icon?: string;
            placeholder?: string;
        }[];
    };
}) => Promise<{
    ok: boolean;
    message: string;
} | undefined>;

declare const payment: (paydata: {
    paymentMethods: PaymentMethodData[];
    paymentDetails: PaymentDetailsInit;
    options: any;
}, validatePayment: (arg0: PaymentResponse) => void) => Promise<{
    ok: boolean;
    message: string;
}>;

declare const screenSharingControls: (config: {
    video: {
        displaySurface: "browser" | "monitor" | "window";
    } | boolean;
    monitorTypeSurfaces?: "exclude" | "include";
    surfaceSwitching?: "include" | "exclude";
    selfBrowserSurface?: "include" | "exclude";
    audio?: boolean;
    systemAudio: "exclude" | "include";
}) => Promise<MediaStream>;
declare const webPIP: (callback: (data: {
    ok: boolean;
    message: string;
    window: any;
}) => void, config?: {
    height?: number;
    width?: number;
    disallowReturnToOpener?: boolean;
}) => Promise<void>;

declare const visibility: (isVisible: () => void, notAvailable: () => void) => Promise<{
    ok: boolean;
    message: string;
} | undefined>;
declare const displayMode: (callback: (mode: "standalone" | "minimal-ui" | "fullscreen" | "broswer-tab") => void) => Promise<void>;

declare const wakeLock: () => Promise<{
    ok: boolean;
    message: string;
    wakeLock: WakeLockSentinel;
} | {
    ok: boolean;
    message: string;
    wakeLock?: undefined;
}>;

declare const webOtp: (callback: (res: {
    code: string | null;
    ok: boolean;
    message: string;
}) => void) => Promise<void>;

declare const webShare: (data: ShareData) => Promise<{
    ok: boolean;
    message: string;
}>;

declare const pwa_accessFonts: typeof accessFonts;
declare const pwa_barcodeDetector: typeof barcodeDetector;
declare const pwa_clearBadge: typeof clearBadge;
declare const pwa_connectivity: typeof connectivity;
declare const pwa_contacts: typeof contacts;
declare const pwa_contentIndexing: typeof contentIndexing;
declare const pwa_copyImage: typeof copyImage;
declare const pwa_copyText: typeof copyText;
declare const pwa_createFile: typeof createFile;
declare const pwa_fullscreen: typeof fullscreen;
declare const pwa_idleDetection: typeof idleDetection;
declare const pwa_install: typeof install;
declare const pwa_notification: typeof notification;
declare const pwa_payment: typeof payment;
declare const pwa_pickFile: typeof pickFile;
declare const pwa_pickTextFile: typeof pickTextFile;
declare const pwa_readFiles: typeof readFiles;
declare const pwa_readText: typeof readText;
declare const pwa_screenSharingControls: typeof screenSharingControls;
declare const pwa_setBadge: typeof setBadge;
declare const pwa_visibility: typeof visibility;
declare const pwa_wakeLock: typeof wakeLock;
declare const pwa_webOtp: typeof webOtp;
declare const pwa_webPIP: typeof webPIP;
declare const pwa_webShare: typeof webShare;
declare const pwa_writeFile: typeof writeFile;
declare const pwa_writeUrlToFile: typeof writeUrlToFile;
declare namespace pwa {
  export {
    pwa_accessFonts as accessFonts,
    pwa_barcodeDetector as barcodeDetector,
    pwa_clearBadge as clearBadge,
    pwa_connectivity as connectivity,
    pwa_contacts as contacts,
    pwa_contentIndexing as contentIndexing,
    pwa_copyImage as copyImage,
    pwa_copyText as copyText,
    pwa_createFile as createFile,
    pwa_fullscreen as fullscreen,
    pwa_idleDetection as idleDetection,
    pwa_install as install,
    pwa_notification as notification,
    pwa_payment as payment,
    pwa_pickFile as pickFile,
    pwa_pickTextFile as pickTextFile,
    pwa_readFiles as readFiles,
    pwa_readText as readText,
    pwa_screenSharingControls as screenSharingControls,
    pwa_setBadge as setBadge,
    pwa_visibility as visibility,
    pwa_wakeLock as wakeLock,
    pwa_webOtp as webOtp,
    pwa_webPIP as webPIP,
    pwa_webShare as webShare,
    pwa_writeFile as writeFile,
    pwa_writeUrlToFile as writeUrlToFile,
  };
}

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

declare const pwafire: {
    pwa: typeof pwa;
    check: {
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
};

export { accessFonts, barcodeDetector, check, clearBadge, compressStream, connectivity, contacts, contentIndexing, copyImage, copyText, createFile, decompressStream, displayMode, fullscreen, idleDetection, install, lazyLoad, loadBackground, loadImage, loadOnScroll, notification, payment, pickFile, pickTextFile, pwa, pwafire, readFiles, readText, screenSharingControls, setBadge, visibility, wakeLock, webOtp, webPIP, webShare, writeFile, writeUrlToFile };
