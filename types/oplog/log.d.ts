import { IPFS } from "ipfs-core-types"
import { AccessController } from "../access-controllers"
import { Identity } from "../identities"
import Clock from "./clock"
import { Entry } from "./entry"
export function DefaultAccessController(): Promise<{
    canAppend: (entry: Entry) => Promise<boolean>;
}>;

/**
 * Create a new Log instance

 * @function
 * @param {IPFS} ipfs An IPFS instance
 * @param {Object} identity Identity.
 * @param {Object} options
 * @param {string} options.logId ID of the log
 * @param {Object} options.access AccessController (./default-access-controller)
 * @param {Array<Entry>} options.entries An Array of Entries from which to create the log
 * @param {Array<Entry>} options.heads Set the heads of the log
 * @param {module:Clock} options.clock Set the clock of the log
 * @param {Function} options.sortFn The sort function - by default LastWriteWins
 * @return {module:Log~Log} sync An instance of Log
 * @memberof module:Log
 * @instance
 */
declare function Log(
    ipfs: IPFS,
    identity: Identity,
    options: {
        logId: string,
        access: AccessController,
        entries: Array<Entry>,
        heads: Array<Entry>,
        clock: Clock,
        sortFn: (a: Entry, b: Entry) => number,
    }
): Log


export type LogIteratorOptions = {
    /** The number of results to fetch. Default: -1 (all)*/
    amount?: number,
    /** All events which are greater than the given hash. */
    gt?: string,
    /** All events which are greater than or equal to the given hash. */
    gte?: string,
    /** All events which are less than the given hash */
    le?: string,
    /** All events which are less than or equal to the given hash. */
    lte?: string
}
interface Log {
    append(data, options?: { referencesCount: number }): Promise<Entry>
    clear(): Promise<void>
    clock(): Promise<Clock>
    close(): Promise<void>
    get(hash: string): Promise<Entry>
    heads(): Array<Entry>
    isLog(obj: unknown): boolean
    iterator(options: LogIteratorOptions): AsyncIterator<Entry>
    join(other: Log): Promise<void>
    joinEntry(entry: Entry): Promise<void>
    traverse(rootEntries: Array<Entry>, shouldStopFn: () => boolean, useRefs: boolean): AsyncIterator<Entry>
    values(): Array<Entry>
}
export { Log as default }

