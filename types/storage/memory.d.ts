export default MemoryStorage
import { Storage as OrbitStorage } from "."
/**
 * @namespace Storage-Memory
 * @memberof module:Storage
 * @description
 * MemoryStorage stores data in memory.
 */

interface MemoryStorage extends OrbitStorage { }

/**
  * Creates an instance of MemoryStorage.
  * @function
  * @return {module:Storage.Storage-Memory} An instance of MemoryStorage.
  * @memberof module:Storage
  * @instance
  */
declare function MemoryStorage(): Promise<MemoryStorage>;
