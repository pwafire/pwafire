import Check from "./check";
declare const pwafire: {
    pwa: {
        compressStream: (readableStream: ReadableStream) => Promise<{
            ok: boolean;
            message: string;
            stream: ReadableStream<Uint8Array<ArrayBufferLike>>;
        } | {
            ok: boolean;
            message: string;
            stream?: undefined;
        }>;
        decompressStream: (compressedReadableStream: ReadableStream) => Promise<{
            ok: boolean;
            message: string;
            stream: ReadableStream<Uint8Array<ArrayBufferLike>>;
        } | {
            ok: boolean;
            message: string;
            stream?: undefined;
        }>;
        screenSharingControls: (config: {
            video: {
                displaySurface: "browser" | "monitor" | "window";
            } | boolean;
            monitorTypeSurfaces?: "exclude" | "include";
            surfaceSwitching?: "include" | "exclude";
            selfBrowserSurface?: "include" | "exclude";
            audio?: boolean;
            systemAudio: "exclude" | "include";
        }) => Promise<MediaStream>;
        webPIP: (callback: (data: {
            ok: boolean;
            message: string;
            window: any;
        }) => void, config?: {
            height?: number;
            width?: number;
            disallowReturnToOpener?: boolean;
        }) => Promise<void>;
        wakeLock: () => Promise<{
            ok: boolean;
            message: string;
        }>;
        Visibility: (isVisible: () => void, notAvailable: () => void) => Promise<{
            ok: boolean;
            message: string;
        } | undefined>;
        displayMode: (callback: (mode: "standalone" | "minimal-ui" | "fullscreen" | "broswer-tab") => void) => Promise<void>;
        Share: (data: ShareData) => Promise<{
            ok: boolean;
            message: string;
        }>;
        Payment: (paydata: {
            paymentMethods: PaymentMethodData[];
            paymentDetails: PaymentDetailsInit;
            options: any;
        }, validatePayment: (arg0: PaymentResponse) => void) => Promise<{
            ok: boolean;
            message: string;
        }>;
        webOTP: (callback: (res: {
            code: string | null;
            ok: boolean;
            message: string;
        }) => void) => Promise<void>;
        Notification: (data: {
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
                tag?: string;
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
        Install: (type: "before" | "install" | "installed" | undefined, callback: (event: string | any) => any) => Promise<{
            ok: boolean;
            message: string;
        }>;
        idleDetection: (action?: string, callback?: () => void, threshold?: number) => Promise<{
            ok: boolean;
            message: string;
        }>;
        Fullscreen: () => Promise<{
            ok: boolean;
            message: string;
        }>;
        accessFonts: (config?: {
            postscriptNames?: string[];
            sfnt?: boolean;
        }) => Promise<{
            ok: boolean;
            message: string;
            fonts: [any];
            sfnt: string[];
        } | {
            ok: boolean;
            message: string;
            fonts: null;
            sfnt?: undefined;
        }>;
        readFiles: () => Promise<{
            ok: boolean;
            message: string;
            files: File[] | null;
        }>;
        pickTextFile: () => Promise<{
            ok: boolean;
            message: string;
            contents: any;
        } | {
            ok: boolean;
            message: string;
            contents?: undefined;
        }>;
        pickFile: (options?: {
            types: [{
                description: string;
                accept: {
                    "image/*"?: string[];
                    "audio/*"?: string[];
                    "video/*"?: string[];
                };
            }];
            multiple?: boolean;
        }) => Promise<{
            file: any;
            ok: boolean;
            message: string;
        }>;
        contentIndexing: () => Promise<{
            ok: boolean;
            message: string;
            getAll: () => Promise<{
                [key: string]: any;
            }[]>;
            addItem: (item: {
                id: string;
                title: string;
                category?: "homepage" | "article" | "video" | "audio" | "";
                description: string;
                icons: {
                    src: string;
                    sizes: string;
                    type: string;
                }[];
                url: string;
            }) => Promise<{
                ok: boolean;
                message: string;
            }>;
            removeItem: (id: string) => Promise<{
                ok: boolean;
                message: string;
            }>;
        } | {
            ok: boolean;
            message: string;
            getAll?: undefined;
            addItem?: undefined;
            removeItem?: undefined;
        }>;
        Contacts: (props: string[], options?: {
            multiple: boolean;
        }) => Promise<{
            ok: boolean;
            message: string;
            contacts: any;
        } | {
            ok: boolean;
            message: string;
            contacts?: undefined;
        }>;
        Connectivity: (online: () => "online", offline: () => "offline") => Promise<{
            ok: boolean;
            message: string;
        }>;
        copyText: (text: string) => Promise<{
            ok: boolean;
            message: string;
        }>;
        readText: () => Promise<{
            ok: boolean;
            message: string;
            text: string | null;
        }>;
        copyImage: (imgURL: string) => Promise<{
            ok: boolean;
            message: string;
        }>;
        barcodeDetector: (options: {
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
        setBadge: (unreadCount: number) => Promise<{
            ok: boolean;
            message: string;
        }>;
        clearBadge: () => Promise<{
            ok: boolean;
            message: string;
        }>;
    };
    check: Check;
};
declare const pwa: {
    compressStream: (readableStream: ReadableStream) => Promise<{
        ok: boolean;
        message: string;
        stream: ReadableStream<Uint8Array<ArrayBufferLike>>;
    } | {
        ok: boolean;
        message: string;
        stream?: undefined;
    }>;
    decompressStream: (compressedReadableStream: ReadableStream) => Promise<{
        ok: boolean;
        message: string;
        stream: ReadableStream<Uint8Array<ArrayBufferLike>>;
    } | {
        ok: boolean;
        message: string;
        stream?: undefined;
    }>;
    screenSharingControls: (config: {
        video: {
            displaySurface: "browser" | "monitor" | "window";
        } | boolean;
        monitorTypeSurfaces?: "exclude" | "include";
        surfaceSwitching?: "include" | "exclude";
        selfBrowserSurface?: "include" | "exclude";
        audio?: boolean;
        systemAudio: "exclude" | "include";
    }) => Promise<MediaStream>;
    webPIP: (callback: (data: {
        ok: boolean;
        message: string;
        window: any;
    }) => void, config?: {
        height?: number;
        width?: number;
        disallowReturnToOpener?: boolean;
    }) => Promise<void>;
    wakeLock: () => Promise<{
        ok: boolean;
        message: string;
    }>;
    Visibility: (isVisible: () => void, notAvailable: () => void) => Promise<{
        ok: boolean;
        message: string;
    } | undefined>;
    displayMode: (callback: (mode: "standalone" | "minimal-ui" | "fullscreen" | "broswer-tab") => void) => Promise<void>;
    Share: (data: ShareData) => Promise<{
        ok: boolean;
        message: string;
    }>;
    Payment: (paydata: {
        paymentMethods: PaymentMethodData[];
        paymentDetails: PaymentDetailsInit;
        options: any;
    }, validatePayment: (arg0: PaymentResponse) => void) => Promise<{
        ok: boolean;
        message: string;
    }>;
    webOTP: (callback: (res: {
        code: string | null;
        ok: boolean;
        message: string;
    }) => void) => Promise<void>;
    Notification: (data: {
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
            tag?: string;
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
    Install: (type: "before" | "install" | "installed" | undefined, callback: (event: string | any) => any) => Promise<{
        ok: boolean;
        message: string;
    }>;
    idleDetection: (action?: string, callback?: () => void, threshold?: number) => Promise<{
        ok: boolean;
        message: string;
    }>;
    Fullscreen: () => Promise<{
        ok: boolean;
        message: string;
    }>;
    accessFonts: (config?: {
        postscriptNames?: string[];
        sfnt?: boolean;
    }) => Promise<{
        ok: boolean;
        message: string;
        fonts: [any];
        sfnt: string[];
    } | {
        ok: boolean;
        message: string;
        fonts: null;
        sfnt?: undefined;
    }>;
    readFiles: () => Promise<{
        ok: boolean;
        message: string;
        files: File[] | null;
    }>;
    pickTextFile: () => Promise<{
        ok: boolean;
        message: string;
        contents: any;
    } | {
        ok: boolean;
        message: string;
        contents?: undefined;
    }>;
    pickFile: (options?: {
        types: [{
            description: string;
            accept: {
                "image/*"?: string[];
                "audio/*"?: string[];
                "video/*"?: string[];
            };
        }];
        multiple?: boolean;
    }) => Promise<{
        file: any;
        ok: boolean;
        message: string;
    }>;
    contentIndexing: () => Promise<{
        ok: boolean;
        message: string;
        getAll: () => Promise<{
            [key: string]: any;
        }[]>;
        addItem: (item: {
            id: string;
            title: string;
            category?: "homepage" | "article" | "video" | "audio" | "";
            description: string;
            icons: {
                src: string;
                sizes: string;
                type: string;
            }[];
            url: string;
        }) => Promise<{
            ok: boolean;
            message: string;
        }>;
        removeItem: (id: string) => Promise<{
            ok: boolean;
            message: string;
        }>;
    } | {
        ok: boolean;
        message: string;
        getAll?: undefined;
        addItem?: undefined;
        removeItem?: undefined;
    }>;
    Contacts: (props: string[], options?: {
        multiple: boolean;
    }) => Promise<{
        ok: boolean;
        message: string;
        contacts: any;
    } | {
        ok: boolean;
        message: string;
        contacts?: undefined;
    }>;
    Connectivity: (online: () => "online", offline: () => "offline") => Promise<{
        ok: boolean;
        message: string;
    }>;
    copyText: (text: string) => Promise<{
        ok: boolean;
        message: string;
    }>;
    readText: () => Promise<{
        ok: boolean;
        message: string;
        text: string | null;
    }>;
    copyImage: (imgURL: string) => Promise<{
        ok: boolean;
        message: string;
    }>;
    barcodeDetector: (options: {
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
    setBadge: (unreadCount: number) => Promise<{
        ok: boolean;
        message: string;
    }>;
    clearBadge: () => Promise<{
        ok: boolean;
        message: string;
    }>;
}, check: Check;
export { check, pwa };
export default pwafire;
