export default ManifestStore;
declare function ManifestStore({ ipfs, storage }?: {
    ipfs: any;
    storage: any;
}): Promise<{
    get: (address: any) => Promise<unknown>;
    create: ({ name, type, accessController, meta }: {
        name: any;
        type: any;
        accessController: any;
        meta: any;
    }) => Promise<{
        hash: string;
        manifest: {
            name: any;
            type: any;
            accessController: any;
        } & ({
            meta: any;
        } | {
            meta?: undefined;
        });
    }>;
    close: () => Promise<void>;
}>;
