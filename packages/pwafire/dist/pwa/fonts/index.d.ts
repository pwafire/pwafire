declare const accessFonts: (config?: {
    postscriptNames?: string[];
    sfnt?: boolean;
}) => Promise<{
    ok: boolean;
    message: string;
    fonts: [any];
} | {
    ok: boolean;
    message: string;
    fonts: never[];
}>;

export { accessFonts };
