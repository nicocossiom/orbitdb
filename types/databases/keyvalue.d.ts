import { BaseDatabase } from "../database"

export default KeyValue

export interface KeyValue<K, V> extends BaseDatabase {
    all(): Promise<Array<KVPair<K, V>>>
    del(key: K): Promise<string>
    get(key: K): Promise<V>
    iterator(filters?: { amount?: number }): AsyncGenerator<KVPair<K, V> & { hash: string}>
    put(key: K, value: V): Promise<string>
}

export type KVPair<K, V> = { key: K, value: V }

/**
 * Defines an KeyValue database.
 * @return {module:Databases.Databases-KeyValue} A KeyValue function.
 * @memberof module:Databases
 */
declare function KeyValue<K,V>(): KeyValue<K,V>;
declare namespace KeyValue {
    export { type }
}
declare const type: "keyvalue"
