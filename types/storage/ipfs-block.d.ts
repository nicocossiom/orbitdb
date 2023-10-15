import { IPFS } from "ipfs-core-types"
import { Storage as OrbitStorage } from "."
export default IPFSBlockStorage

interface IPFSBlockStorage extends OrbitStorage {
    ipfs: IPFS;
    timeout?: number;
    pin?: boolean;
}

/**
 * Creates an instance of IPFSBlockStorage.
 * @function
 * @param {Object} params One or more parameters for configuring
 * IPFSBlockStorage.
 * @param {IPFS} params.ipfs An IPFS instance.
 * @param {number} [params.timeout=defaultTimeout] A timeout in ms.
 * @param {boolean} [params.pin=false] True, if the block should be pinned,
 * false otherwise.
 * @return {module:Storage.Storage-IPFS} An instance of IPFSBlockStorage.
 * @memberof module:Storage
 * @throw An instance of ipfs is required if params.ipfs is not specified.
 * @instance
 */
declare function IPFSBlockStorage(params?: {
    ipfs: IPFS,
    timeout?: number,
    pin?: boolean,
}): Promise<IPFSBlockStorage>;
