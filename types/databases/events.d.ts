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
    add(value: V): Promise<string>
    all(): Promise<Array<{ hash: string, value: V }>>
    get(hash: string): Promise<V>
    iterator(filters?: LogIteratorOptions): AsyncGenerator<{ hash: string, value: V }>
}