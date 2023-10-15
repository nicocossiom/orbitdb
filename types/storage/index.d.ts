export { default as ComposedStorage } from "./composed"
export { default as IPFSBlockStorage } from "./ipfs-block"
export { default as LevelStorage } from "./level"
export { default as LRUStorage } from "./lru"
export { default as MemoryStorage } from "./memory"

export interface Storage{
    clear(): Promise<void>
    close(): Promise<void>
    get(hash: string): Promise<unknown>
    del(hash: string): Promise<void>
    iterator(): AsyncGenerator<[string, unknown], void, unknown>
    merge(other: Storage): Promise<void>
    put(hash: string, data: unknown): Promise<void>
}