declare global {
    interface Navigator {
        contacts: {
            select: (props: string[]) => Promise<any>;
        };
    }
}
declare const contacts: (props: string[]) => Promise<{
    ok: boolean;
    message: string;
    contacts: any;
}>;

export { contacts };
