import { Secp256k1PrivateKey, Secp256k1PublicKey } from "@libp2p/crypto/src/keys/secp256k1-class"
import { PrivateKey } from "@libp2p/interface/src/keys"
import { Storage as OrbitStorage } from "./storage"
type KeyPair = {
        publicKey: Uint8Array
        privateKey: Uint8Array
}

interface KeyStore {
    addKey(id: string, key: KeyPair): Promise<void>
    clear(): Promise<void>
    close(): Promise<void>
    createKey(id: string): Promise<PrivateKey>
    getKey(id:string): Promise<Secp256k1PublicKey>
    getPublic(keys: Secp256k1PublicKey, options?: {
        format?: "hex" | "buffer"
    }): Promise<string | Uint8Array>
    hasKey(id: string): Promise<boolean>
}

/**
 * Creates an instance of KeyStore.
 * @param {Object} params One or more parameters for configuring KeyStore.
 * @param {Object} [params.storage] An instance of a storage class. Can be one
 * of ComposedStorage, IPFSBlockStorage, LevelStorage, etc. Defaults to
 * ComposedStorage.
 * @param {string} [params.path=./keystore] The path to a valid storage.
 * @return {module:KeyStore~KeyStore} An instance of KeyStore.
 * @instance
 */
declare function KeyStore(params?: {
    storage?: OrbitStorage;
    path?: string;
}): KeyStore;
/**
 * Signs data using a key pair.
 * @param {Secp256k1PrivateKey} key The key to use for signing data.
 * @param {string|Uint8Array} data The data to sign.
 * @return {string} A signature.
 * @throws No signing key given if no key is provided.
 * @throws Given input data was undefined if no data is provided.
 * @static
 * @private
 */
export function signMessage(key: Secp256k1PrivateKey, data: string | Uint8Array): string;
/**
 * Verifies input data against a cached version of the signed message.
 * @param {string} signature The generated signature.
 * @param {string} publicKey The derived public key of the key pair.
 * @param {string} data The data to be verified.
 * @return {boolean} True if the the data and cache match, false otherwise.
 * @static
 * @private
 */
export function verifyMessage(signature: string, publicKey: string, data: string): boolean;
export { KeyStore as default }
