export declare const BadgingApi: {
    setBadge: (unreadCount: number) => Promise<{
        ok: boolean;
        message: string;
    }>;
    clearBadge: () => Promise<{
        ok: boolean;
        message: string;
    }>;
};
