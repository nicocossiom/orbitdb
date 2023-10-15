
export interface IdentityProvider{
  type: string,
  /**
   * Gets the id.
   * @memberof module:IdentityProviders.IdentityProvider-PublicKey
   * @param {string} id The id to retrieve.
   * @return {string} The identity's id.
   * @instance
   */
  getId: () => string,
  /**
   * Signs an identity using the identity's id.
   * @memberof module:IdentityProviders.IdentityProvider-PublicKey
   * @param {*} data The identity data to sign.
   * @param {Object} params One or more parameters for configuring Database.
   * @param {string} [params.id] The identity's id.
   * @return {string} A signature.
   * @instance
   */
  signIdentity(data: unknown, params: { id: string }): Promise<string>
  /**
 * Verifies an identity using the identity's id.
 * @param {module:Identity} identity
 * @return {boolean} True if the identity is valid, false otherwise.
 * @static
 * @private
 */
  verifyIdentity(identity: Identity): Promise<boolean>
}

/**
  * Adds an identity provider.
  * @param {IdentityProvider} identityProvider The identity provider to add.
  * @throws Given IdentityProvider doesn\'t have a field \'type\'.
  * @throws Given IdentityProvider doesn\'t have a function \'verifyIdentity\'.
  * @throws IdentityProvider ${IdentityProvider.type} already added.
  * @static
  * @memberof module:Identities
  */
export function useIdentityProvider(identityProvider: IdentityProvider): void;
export function getIdentityProvider(type: string): IdentityProvider;
import { Identity } from ".."
import PublicKeyIdentityProvider from "./publickey.js"
export { PublicKeyIdentityProvider }
