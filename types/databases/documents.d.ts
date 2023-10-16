export default Documents
/**
 * Defines a Documents database.
 * @param {Object} options Various options for configuring the Document store.
 * @param {string} [options.indexBy=_id] An index.
 * @return {module:Databases.Databases-Documents} A Documents function.
 * @memberof module:Databases
 */
declare function Documents(params?: { indexBy: string }): Documents;
declare namespace Documents {
    export { type }
}
declare const type: "documents"

export interface Documents {}