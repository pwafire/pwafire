declare const setBadge: (unreadCount: number) => Promise<{
    ok: boolean;
    message: string;
}>;
declare const clearBadge: () => Promise<{
    ok: boolean;
    message: string;
}>;

export { clearBadge, setBadge };
