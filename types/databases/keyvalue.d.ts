import { BaseDatabase } from "../database"

export default KeyValue

/**
 * KeyValue.
 *
 * @extends {BaseDatabase}
 */
interface KeyValue<K, V> extends BaseDatabase {
  /**
   * Returns all key/value pairs.
   * @function
   * @return An array of key/value pairs as
   * key/value/hash entries.
   * @memberof module:Databases.Databases-KeyValue
   */
  all(): Promise<Array<KVPair<K, V>>>
  /**
   * Deletes a key/value pair.
   * @function
   * @param {string} key - The key to delete.
   * @memberof module:Databases.Databases-KeyValue
   */
  del(key: K): Promise<string>

  /**
  * Gets a value by key.
  * @function
  */
  get(key: K): Promise<V>
  iterator(filters?: { amount?: number }): AsyncGenerator<KVPair<K, V> & { hash: string }>
  put(key: K, value: V): Promise<string>
}

export type KVPair<K, V> = { key: K, value: V }

/**
 * Defines an KeyValue database.
 * @return {module:Databases.Databases-KeyValue} A KeyValue function.
 * @memberof module:Databases
 */
declare function KeyValue<K, V>(): KeyValue<K, V>;
declare namespace KeyValue {
  export { type }
}
declare const type: "keyvalue"

