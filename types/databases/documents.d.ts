import { BaseDatabase } from "../database"

export default Documents
/**
 * Defines a Documents database.
 * @param {Object} options Various options for configuring the Document store.
 * @param {string} [options.indexBy=_id] An index.
 * @return {module:Databases.Databases-Documents} A Documents function.
 * @memberof module:Databases
 */
declare function Documents<Doc extends Record, IndexField extends { indexBy: infer I extends keyof Doc ? I : "_id" }>(
    params?: { indexBy: IndexField }
): Documents<Doc, IndexField>;

type X = ReturnType<typeof Documents>

declare namespace Documents {
    export { type }
}
declare const type: "documents"

export interface Documents<Doc, IndexField> extends BaseDatabase {
    /**
     * Stores a document to the store.
     * @param doc An object representing a key/value list of fields.
     * @return The hash of the new oplog entry.
     */
    put(doc: Doc): IndexField extends keyof Doc ? Promise<string> : never

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