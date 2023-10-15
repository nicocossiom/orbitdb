import { AccessController } from "."

export default OrbitDBAccessController
/**
 * Creates an instance of OrbitDBAccessController.
 */
export interface OrbitDBAccessController extends AccessController{}
/**
 * Creates an instance of OrbitDBAccessController.
 * @callback OrbitDBAccessController
 * @param {Object} params Various parameters for configuring the access
 * controller.
 * @param {module:OrbitDB} params.orbitdb An OrbitDB instance.
 * @param {module:Identities} params.identities An Identities instance.
 * @param {string} [params.address] The address of the database.
 * @function
 * @instance
 * @async
 * @memberof module:AccessControllers.AccessControllers-OrbitDB
 * @private
 */
/**
 * Defines an OrbitDB access controller.
 * @param {Object} options Various options for configuring the
 * IPFSAccessController.
 * @param {Array} [params.write] An array of ids of identities who can write to the
 * database.
 * @return {module:AccessControllers.AccessControllers-OrbitDB} An
 * IPFSAccessController function.
 * @memberof module:AccessControllers
 */
declare function OrbitDBAccessController(options?: { write?: string[] }): OrbitDBAccessController
declare namespace OrbitDBAccessController {
    export { type }
}
declare const type: "orbitdb"
