export declare const VisibilityApi: {
    Visibility: (isVisible: () => void, notAvailable: () => void) => Promise<{
        ok: boolean;
        message: string;
    } | undefined>;
    displayMode: (callback: (mode: "standalone" | "minimal-ui" | "fullscreen" | "broswer-tab") => void) => Promise<void>;
};
