export declare const ContentIndexingApi: {
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
};
