export default Heads;
/**
 * @namespace module:Log~Heads
 * @memberof module:Log
 * @description The log's heads.
 * @private
 */ declare function Heads({ storage, heads }: {
    storage: any;
    heads: any;
}): Promise<{
    put: (heads: any) => Promise<void>;
    set: (heads: any) => Promise<void>;
    add: (head: any) => Promise<{
        create: (identity: any, id: any, payload: any, clock?: any, next?: any[], refs?: any[]) => Promise<import("./entry.js").module>;
        verify: (identities: Identities, entry: any) => Promise<boolean>;
        decode: (bytes: Uint8Array) => any;
        isEntry: (obj: any) => boolean;
        isEqual: (a: any, b: any) => boolean;
    }[]>;
    iterator: () => AsyncGenerator<any, void, unknown>;
    all: () => Promise<any[]>;
    clear: () => Promise<void>;
    close: () => Promise<void>;
}>;
