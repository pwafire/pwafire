declare const wakeLock: () => Promise<{
    ok: boolean;
    message: string;
    wakeLock: WakeLockSentinel;
} | {
    ok: boolean;
    message: string;
    wakeLock?: undefined;
}>;

export { wakeLock };
