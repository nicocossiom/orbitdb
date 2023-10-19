import Documents from "./documents"
import Events from "./events"
import KeyValue from "./keyvalue"
import KeyValueIndexed from "./keyvalue-indexed"

export function getDatabaseType(type: Databases): unknown;
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
export function useDatabaseType(database: unknown): void;
export { Documents, Events, KeyValue, KeyValueIndexed }
export type Databases = Documents<unknown, unknown> | KeyValue<unknown, unknown> | Events<unknown>
export type DatabaseTypes = typeof Documents.type | typeof Events.type | typeof KeyValue.type