export declare const IdleDetectionApi: {
    idleDetection: (action?: string, callback?: () => void, threshold?: number) => Promise<{
        ok: boolean;
        message: string;
    }>;
};
