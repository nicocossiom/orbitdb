export type OrbitDBAddress = {
    /**
     * Protocol prefix "/orbitdb/".
     */
    protocol: string;
    /**
     * The hash of the database manifest.
     */
    hash: string;
    /**
     * The full database address.
     */
    address: string;
};
/**
 * @typedef {Object} OrbitDBAddress
 * @property {string} protocol Protocol prefix "/orbitdb/".
 * @property {string} hash The hash of the database manifest.
 * @property {string} address The full database address.
 */
declare function OrbitDBAddress(address: any): any;
/**
 * Validates an OrbitDB database address.
 * @function
 * @param {module:Address~OrbitDBAddress|string} address An OrbitDB database address.
 * @return {boolean} True if the address is a valid OrbitDB database address,
 * false otherwise.
 * @static
 */
export function isValidAddress(address: any): boolean;
/**
 * Parses an OrbitDB database address.
 * @function
 * @param {module:Address~OrbitDBAddress|string} address A valid OrbitDB database address.
 * @return {module:Address~OrbitDBAddress} An instance of OrbitDBAddress.
 * @throws Not a valid OrbitDB address if no address if provided.
 * @throws Not a valid OrbitDB address if address is invalid.
 * @static
 */
export function parseAddress(address: any): any;
export { OrbitDBAddress as default };
