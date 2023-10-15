import { Identity } from ".."
import { KeyStore } from "../.."

interface PublicKeyIdentityProvider{
    type: "publickey"
    keystore: KeyStore
    /**
     * Verifies an identity using the identity's id.
     * @param {module:Identity} identity
     * @return {boolean} True if the identity is valid, false otherwise.
     * @static
     * @private
     */
    verifyIdentity(identity: Identity): boolean
}

export default PublicKeyIdentityProvider
/**
 * Instantiates the publickey identity provider.
 * @return {module:IdentityProviders.IdentityProvider-PublicKey} A public key
 * identity provider function.
 * @private
 */
declare function PublicKeyIdentityProvider(params: { keystore: KeyStore }): PublicKeyIdentityProvider;
