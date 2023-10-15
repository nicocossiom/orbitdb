import Documents from "./documents.js";
import Events from "./events.js";
import KeyValue from "./keyvalue.js";
import KeyValueIndexed from "./keyvalue-indexed.js";
export function getDatabaseType(type: any): any;
/**
 * Add a new database type.
 * @example
 * import { useDatabaseType } from 'orbitdb'
 * const CustomDBTypeModule = async (params) => {
 *   const database = await Database(...params)
 *   ...
 * }
 * useDatabaseType(CustomDBTypeModule)
 * @function useDatabaseType
 * @param {module:Databases} database A Database-compatible module.
 * @throws Database type does not contain required field \'type\'.
 * @throws Database type '${store.type}' already added.
 * @memberof module:Databases
 */
export function useDatabaseType(database: any): void;
export { Documents, Events, KeyValue, KeyValueIndexed };
