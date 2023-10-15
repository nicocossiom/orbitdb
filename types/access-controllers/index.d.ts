import { Entry } from "../"
import { Storage as OrbitStorage } from "../storage"
import { IPFSAccessController } from "./ipfs.js"
import { OrbitDBAccessController } from "./orbitdb.js"
export interface AccessController{
    type: string, 
    address: string, 
    write: Array<string>, 
    canAppend(entry: Entry): Promise<boolean>
    }

declare function IPFSAccessController(options?: { write: string[], storage?: OrbitStorage }):
    IPFSAccessController
declare function OrbitDBAccessController(options?: { write?: string[] }): OrbitDBAccessController

/**
 * Gets an access controller module specified by type.
 * @param {string} type A valid access controller type.
 * @return {AccessController} The access controller module.
 * @private
 */
export function getAccessController(type: string): AccessController;
/**
 * Adds an access controller module to the list of supported access controller.
 * @param {AccessController} accessController A compatible access controller
 * module.
 * @throws AccessController does not contain required field \'type\'.
 * @throws AccessController '${accessController.type}' already added.
 * @static
 */
export function useAccessController(accessController: AccessController): void;
/**
 * Removes an access controller from the list.
 * @param {string} type A valid access controller type.
 * @static
 */
export function removeAccessController(type: string): void;
export { IPFSAccessController, OrbitDBAccessController }
