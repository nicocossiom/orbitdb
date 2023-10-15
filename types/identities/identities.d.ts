export { Identities as default }
import { IPFS } from "ipfs-core-types"
import { Identity } from "."
import { KeyStore } from ".."
import { Storage as OrbitStorage } from "../storage"
import { IdentityProvider } from "./providers"

export interface Identities {
    /**
   * Creates an identity, adding it to storage.
   * @param {Object} options Various options for configuring a new identity.
   * @param {Function} [options.providerFn=PublicKeyIdentityProvider()] An instance of the Provider to use for generating an identity, e.g. PublicKeyIdentityProvider({ keystore })
   * @return {module:Identities~Identity} An instance of identity.
   * @memberof module:Identities~Identities
   * @instance
   */
    createIdentity(options?: { providerFn?: () => Promise<IdentityProvider> }): Promise<Identity>
    /**
   * Verifies an identity using the identity's provider.
   * @param {module:Identities~Identity} identity The identity to verify.
   * @return {boolean} True the identity is valid, false otherwise.
   * @memberof module:Identities~Identities
   */
    verifyIdentity(identity: Identity): Promise<boolean>
    /**
   * Gets an identity by hash.
   * @param {string} hash An identity hash.
   * @return {module:Identities~Identity} An instance of identity.
   * @memberof module:Identities~Identities
   * @instance
   */
    getIdentity(hash: string): Promise<Identity>
    /**
   * Signs data using an identity.
   * @param {module:Identities~Identity} identity The identity to use for
   * signing.
   * @param {string} data The data to sign.
   * @return {string} The signed data.
   * @throws Private signing key not found from KeyStore when no signing key can
   * be retrieved.
   * @memberof module:Identities~Identities
   * @instance
   * @private
   */
    sign(identity: Identity, data: string): Promise<string>
    /**
   * Verifies data using a valid signature and publicKey.
   * @param {string} signature A signature.
   * @param {string} publicKey A public key.
   * @param {string} data The data to be verified.
   * @return {boolean} True if the the data is signed by the publicKey, false
   * otherwise.
   * @memberof module:Identities~Identities
   * @instance
   * @private
   */
    verify(signature: string, publicKey:string, data:string): Promise<boolean>
    keystore: KeyStore
}

/**
 * Creates an instance of Identities.
 * @function
 * @param {Object} params One or more parameters for configuring Identities.
 * @param {module:KeyStore} [params.keystore] A preconfigured KeyStore.
 * A KeyStore will be created in the path defined by the path param. If neither
 * Keystore nor path are defined, a new KeyStore is stored in ./orbitdb
 * identities.
 * @param {string} [params.path] The path to a KeyStore. If no path is
 * provided, the default is ./orbitdb/identities.
 * @param {module:Storage} [params.storage] An instance of a compatible storage
 * module.
 * @param {IPFS} [params.ipfs] An instance of IPFS. This param is not required
 * if storage is provided.
 * @return {module:Identities~Identities} An instance of Identities.
 * @instance
 */
export declare function Identities(params?: {
    keystore?: KeyStore, 
    path?: string,
    storage?: OrbitStorage, 
    ipfs?: IPFS
})
    : Identities
