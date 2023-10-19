import { BaseDatabase } from "../database"

export default Documents
/**
 * Defines a Documents database.
 * ## Defining a Documents database
 * When defining a Documents database, you must specify the type of the documents it will store.
 * For this you must provide a type parameter to the Documents class with the shape of the documents this 
 * datbase will store.
 * ```ts
 * interface User {
 *  name: string
 *  age: number
 * }
 * const db = await orbitdb.docs<User>("users")
 * ```
 * The type for this db will be `Documents<User, "_id">`. The second type parameter is the name of the field 
 * which indexes this database. By default, this is `_id`. 
 * ### Changing the index field
 * You can change the index field by passing an options object to the `Documents` constructor with the
 * `indexBy` property set to the name of the field you want to use as the index. You must also provide the
 * field as a type parameter using a string literal type.
 * ```ts
 * const db = await orbitdb.docs<User, "">( indexBy: "") // will get autosuggested to "name" or "age"
 * const db = await orbitdb.docs<User, "name">({indexBy: "name"}) // the indexBy and the type parameter must be the same 
 * ```
 * The type of `db` will be:
 * ```ts
 * const db: Documents<User, "name">
 * ```
 * type parameter for the index field.
 * @param {Object} options Various options for configuring the Document store.
 * @param {string} [options.indexBy=_id] An index.
 * @returns An instance of a Documents database.
 */
declare function Documents<Doc extends Record<string | number | symbol, unknown>, T extends keyof Doc>(
    params: { indexBy: T }
): Documents<Doc, T>;
declare function Documents<Doc extends Record<string | number | symbol, unknown>>(): Documents<Doc, "_id">;

declare namespace Documents {
    export { type }
}
declare const type: "documents"

interface Documents<Doc extends Record<string | number | symbol, unknown>, IndexField extends keyof Doc | "_id" = "_id"> extends BaseDatabase {
    /**
     * Stores a document to the store.
     * @param doc An object representing a key/value list of fields.
     * @return The hash of the new oplog entry.
     */
    put(doc: Doc): Promise<string>

    /**
     * Deletes a document from the store.
     * @param key The key of the doc to delete.
     * @return The hash of the new oplog entry.
     */
    del(key: string): Promise<string>

    /**
     * Gets a document from the store by key.
     * @param key The key of the doc to get.
     * @return The doc corresponding to key or null.
     */
    get(key: string): Promise<Doc | null>


}