import Documents from "./documents"
import Events from "./events"
import KeyValue from "./keyvalue"
import KeyValueIndexed from "./keyvalue-indexed"
import { BaseDatabase } from "../database"
/**
 * getDatabaseType.
 *
 * @param {string} type
 * @returns {BaseDatabase}
 */
export function getDatabaseType(type: string): BaseDatabase;

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
export function useDatabaseType(database: BaseDatabase): void;
export { Documents, Events, KeyValue, KeyValueIndexed }
export type Databases = Documents<Record<string | number | symbol, unknown>> | KeyValue<unknown, unknown> | Events<unknown>
export type DatabaseTypes = typeof Documents.type | typeof Events.type | typeof KeyValue.type

/**
 * A map where orbit databases are registered. When specifying a database type
* to open, orbitdb looks up the type in this mao, getting the corrsponding database
* module to use. This database module must implement the `BasesDatabase` interface.
 * DO NOT USE THIS DIRECTLY. Use `useDatabaseType` instead.
 */
declare const databaseTypes: { [key: string]: BaseDatabase }
