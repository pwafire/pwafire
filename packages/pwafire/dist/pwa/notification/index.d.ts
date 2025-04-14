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

export { notification };
