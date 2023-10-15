
export declare module Storage {
    interface Storage{
        clear(): Promise<void>
        close(): Promise<void>
        get(hash: string): Promise<unknown>
        del(hash: string): Promise<void>
        iterator(): AsyncGenerator<[string, unknown], void, unknown>
        merge(other: Storage): Promise<void>
        put(hash: string, data: unknown): Promise<void>

    }
    interface LRUStorage extends Storage { }
    function LRUStorage(): Promise<LRUStorage>
    interface LevelStorage extends Storage { }
    function LevelStorage(): Promise<LevelStorage>
    function MemoryStorage(): Promise<MemoryStorage>
    interface MemoryStorage extends Storage { }
    interface IPFSBlockStorage extends Storage { }
    function IPFSBlockStorage():Promise<IPFSBlockStorage>
    interface ComposedStorage extends Storage { }
    function ComposedStorage(storage1: Storage, storage2:Storage):Promise<ComposedStorage>

}