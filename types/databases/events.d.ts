import { BaseDatabase } from "../database"
import { LogIteratorOptions } from "../oplog/log"
export default Events
/**
 * Defines an Events database.
 * @return {module:Databases.Databases-Events} A Events function.
 * @memberof module:Databases
 */
declare function Events<V>(): Events<V>;
declare namespace Events {
    export { type }
}
declare const type: "events"

export interface Events<V> extends BaseDatabase{
    /**
     * Adds an event to the store.
     *  @param value The event to be added.
     *  @return The hash of the new oplog entry.
     */
    add(value: V): Promise<string>
    /**
     * Returns all events.
     * @return An array of events as hash/value entries.
     */
    all(): Promise<Array<{ hash: string, value: V }>>
    /**
     * Gets an event from the store by hash.@function
     * @param hash The hash of the event to get.
     * @return The value corresponding to hash or null.
   */
    get(hash: string): Promise<V>
    /**
   * Iterates over events.
   * @param filters Various filters to apply to the iterator.
   * @yields The next event as hash/value.
   */
    iterator(filters?: LogIteratorOptions): AsyncGenerator<{ hash: string, value: V }>
}