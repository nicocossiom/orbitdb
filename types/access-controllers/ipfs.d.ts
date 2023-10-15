export default IPFSAccessController
import { AccessController } from "."
import { Identities } from "../identities"
import { OrbitDB } from "../orbitdb"
import { Storage as OrbitStorage } from "../storage"


/**
 * Creates an instance of IPFSAccessController.
 */
export interface IPFSAccessController extends AccessController {
    orbitdb: OrbitDB
    identities: Identities
}
/**
 * Creates an instance of IPFSAccessController.
 * @callback IPFSAccessController
 * @param {Object} params Various parameters for configuring the access
 * controller.
 * @param {module:OrbitDB} params.orbitdb An OrbitDB instance.
 * @param {module:Identities} params.identities An Identities instance.
 * @param {string} [params.address] The address of the database.
 * @function
 * @instance
 * @async
 * @memberof module:AccessControllers.AccessControllers-IPFS
 * @private
 */
/**
 * Defines an IPFS access controller.
 * @param {Object} options Various options for configuring the
 * IPFSAccessController.
 * @param {Array} [params.write] An array of identity ids who can write to the
 * database.
 * @param {module:S../storage/index.jsarams.storage} [parm.storage] An instance of a compatible storage.
 * @return {module:AccessControllers.AccessControllers-IPFS} An
 * IPFSAccessController function.
 * @memberof module:AccessControllers
 */
declare function IPFSAccessController(options?: { write: string[], storage?: OrbitStorage }): IPFSAccessController

declare namespace IPFSAccessController {
    export { type }
}
declare const type: "ipfs"
