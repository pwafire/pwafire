export declare const FontsApi: {
    accessFonts: (config?: {
        postscriptNames?: string[];
        sfnt?: boolean;
    }) => Promise<{
        ok: boolean;
        message: string;
        fonts: [any];
        sfnt: string[];
    } | {
        ok: boolean;
        message: string;
        fonts: null;
        sfnt?: undefined;
    }>;
};
