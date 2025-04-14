declare const visibility: (isVisible: () => void, notAvailable: () => void) => Promise<{
    ok: boolean;
    message: string;
} | undefined>;
declare const displayMode: (callback: (mode: "standalone" | "minimal-ui" | "fullscreen" | "broswer-tab") => void) => Promise<void>;

export { displayMode, visibility };
