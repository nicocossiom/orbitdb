import Clock from "./clock"

declare namespace Entry {
    export { create }
    export { verify }
    export { decode }
    export { isEntry }
    export { isEqual }
}
export default Entry
/**
 * :Log~Entry
 */
export type Entry = {
    /**
     * A string linking multiple entries together.
     */
    id: string;
    /**
     * An arbitrary chunk of data.
     */
    payload: any;
    /**
     * One or more hashes pointing to the next entries in a chain of
     * entries.
     */
    next: Array<string>;
    /**
     * One or more hashes which reference other entries in the chain.
     */
    refs: Array<string>;
    /**
     * A logical clock. See {@link module :Log~Clock}.
     */
    clock: Clock
    /**
     * The version of the entry.
     */
    v: number;
    /**
     * The public key of the identity.
     */
    key: string;
    /**
     * The identity of the entry's owner.
     */
    identity: string;
    /**
     * The signature of the entry signed by the owner.
     */
    sig: string;
};
/**
 * @typedef {Object} module:Log~Entry
 * @property {string} id A string linking multiple entries together.
 * @property {*} payload An arbitrary chunk of data.
 * @property {Array<string>} next One or more hashes pointing to the next entries in a chain of
 * entries.
 * @property {Array<string>} refs One or more hashes which reference other entries in the chain.
 * @property {Clock} clock A logical clock. See {@link module:Log~Clock}.
 * @property {integer} v The version of the entry.
 * @property {string} key The public key of the identity.
 * @property {string} identity The identity of the entry's owner.
 * @property {string} sig The signature of the entry signed by the owner.
 */
/**
 * Creates an Entry.
 * @param {module:Identities~Identity} identity The identity instance
 * @param {string} logId The unique identifier for this log
 * @param {*} data Data of the entry to be added. Can be any JSON.stringifyable
 * data.
 * @param {module:Log~Clock} [clock] The clock
 * @param {Array<string|Entry>} [next=[]] An array of CIDs as base58btc encoded
 * strings which point to the next entries in a chain of entries.
 * @param {Array<string|module:Log~Entry>} [refs=[]] An array of CIDs as
 * base58btc encoded strings pointing to various entries which come before
 * this entry.
 * @return {Promise<module:Log~Entry>} A promise which contains an instance of
 * Entry.
 * Entry consists of the following properties:
 *
 * - id: A string linking multiple entries together,
 * - payload: An arbitrary chunk of data,
 * - next: One or more hashes pointing to the next entries in a chain of
 * entries,
 * - refs: One or more hashes which reference other entries in the chain,
 * - clock: A logical clock. See {@link module:Log~Clock},
 * - v: The version of the entry,
 * - key: The public key of the identity,
 * - identity: The identity of the entry's owner,
 * - sig: The signature of the entry signed by the owner.
 * @memberof module:Log~Entry
 * @example
 * const entry = await Entry.create(identity, 'log1', 'hello')
 * console.log(entry)
 * // { payload: "hello", next: [], ... }
 * @private
 */
declare function create(identity: Identity, id: string, payload, clock?: Clock, next?: Array<string | Entry>, refs?: Array<string|Entry>): Promise<Entry>;
/**
 * Verifies an entry signature.
 * @param {Identities} identities Identities system to use
 * @param {module:Log~Entry} entry The entry being verified
 * @return {Promise<boolean>} A promise that resolves to a boolean value indicating if
 * the signature is valid.
 * @memberof module:Log~Entry
 * @private
 */
declare function verify(identities: Identities, entry: Entry): Promise<boolean>;
/**
 * Decodes a serialized Entry from bytes
 * @param {Uint8Array} bytes
 * @return {module:Log~Entry}
 * @memberof module:Log~Entry
 * @private
 */
declare function decode(bytes: Uint8Array): Entry;
/**
 * Checks if an object is an Entry.
 * @param {module:Log~Entry} obj
 * @return {boolean}
 * @memberof module:Log~Entry
 * @private
 */
declare function isEntry(obj: unknown): boolean;
/**
 * Determines whether two entries are equal.
 * @param {module:Log~Entry} a An entry to compare.
 * @param {module:Log~Entry} b An entry to compare.
 * @return {boolean} True if a and b are equal, false otherwise.
 * @memberof module:Log~Entry
 * @private
 */
declare function isEqual(a: any, b: any): boolean;
