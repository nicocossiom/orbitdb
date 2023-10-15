export default LRUStorage

interface LRUStorage extends Storage { }


/**
 * Creates an instance of LRUStorage.
 * @function
 * @param {Object} [params={}] One or more parameters for configuring
 * IPFSBlockStorage.
 * @param {string} [params.size=defaultSize] The number of elements to store.
 * @return {module:Storage.Storage-LRU} An instance of LRUStorage.
 * @memberof module:Storage
 * @instance
 */
declare function LRUStorage(params?:{
    size?: string;
}): Promise<LRUStorage>;
