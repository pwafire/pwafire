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

export { screenSharingControls, webPIP };
