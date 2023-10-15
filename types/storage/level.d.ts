export default LevelStorage
import { Storage as OrbitStorage } from "."

interface LevelStorage extends OrbitStorage { }

/**
 * Creates an instance of LevelStorage.
 * @function
 * @param {Object} [params={}] One or more parameters for configuring
 * LevelStorage.
 * @param {string} [params.path=defaultPath] The Level path.
 * @param {string} [params.valueEncoding=defaultValueEncoding] Value encoding.
 * @return {module:Storage.Storage-Level} An instance of LevelStorage.
 * @memberof module:Storage
 * @instance
 */
declare function LevelStorage({ path, valueEncoding }?: {
    path?: string;
    valueEncoding?: string;
}): Promise<LevelStorage>;
