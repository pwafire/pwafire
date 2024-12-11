declare class Check {
    Share(): boolean;
    shareFiles(): boolean;
    Clipboard(): boolean;
    copyText(): boolean;
    copyImage(): boolean;
    idleDetection(): boolean;
    wakeLock(): boolean;
    Contacts(): boolean;
    onlineStatus(): boolean;
    Badging(): boolean;
    Notifications(): boolean;
    contentIndexing(): boolean;
    notificationPermission(): boolean;
    barcodeDetector(): boolean;
    accessFonts(): boolean;
    serviceWorker(): boolean;
    Bluetooth(): boolean;
    Payment(): boolean;
    webOTP(): boolean;
    webNFC(): boolean;
    All(): {
        name: string;
        message: string;
        ok: boolean;
    }[];
    createSupportObject(name: string, isSupported: boolean): {
        name: string;
        message: string;
        ok: boolean;
    };
}
export default Check;
