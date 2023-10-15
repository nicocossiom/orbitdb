export default ComposedStorage
import { Storage as OrbitStorage } from "."
/**
 * @namespace Storage-Composed
 * @memberof module:Storage
 * @description
 * ComposedStorage stores data to multiple storage backends.
 * @example <caption>Store to LRU and Level</caption>
 * await ComposedStorage(await LRUStorage(), await LevelStorage())
 * @example <caption>Store to memory and IPFS</caption>
 * await ComposedStorage(await MemoryStorage(), await IPFSBlockStorage())
 * @example <caption>Store to LRU and a nested ComposedStorage</caption>
 * const storage1 = await ComposedStorage(await LRUStorage(), await LevelStorage())
 * await ComposedStorage(storage1, await IPFSBlockStorage())
 */

declare interface ComposedStorage extends OrbitStorage { }

/**
  * Creates an instance of ComposedStorage.
  * @function
  * @param {module:Storage} storage1 A storage instance.
  * @param {module:Storage} storage2 A storage instance.
  * @return {module:Storage.Storage-Composed} An instance of ComposedStorage.
  * @memberof module:Storage
  * @instance
  */
declare function ComposedStorage(storage1: OrbitStorage, storage2:OrbitStorage):Promise<ComposedStorage>
