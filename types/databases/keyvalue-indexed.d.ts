export default KeyValueIndexed
import { Storage as OrbitStorage } from "../storage"
import { KeyValue } from "./keyvalue"
/**
 * Defines a KeyValueIndexed database.
 * @param {module:Storage} [storage=LevelStorage] A compatible storage where
 * the key/value pairs are indexed.
 * @return {module:Databases.Databases-KeyValueIndexed} A KeyValueIndexed
 * function.
 * @memberof module:Databases
 */
declare function KeyValueIndexed<K, V, I extends keyof V>(params?: { storage: OrbitStorage }): KeyValueIndexed<K, V, I>;
declare namespace KeyValueIndexed {
    let type: string
}

export interface KeyValueIndexed<K, V, I extends keyof V> extends KeyValue<K, V> { }