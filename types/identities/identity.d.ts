/**
 * :Identities~Identity
 */
export type Identity = {
    /**
     * A unique identifer for the identity.
     */
    id: string;
    /**
     * A public key.
     */
    publicKey: object;
    /**
     * A signed identity id and public key.
     */
    signatures: object;
    /**
     * The type of identity provider.
     */
    type: string;
    /**
     * A sign function to sign data using this identity.
     */
    sign: (identity: Identity, data: string) => Promise<string>
    /**
     * A verify function to verify data signed by this identity.
     */
    verify: (identity: Identity, data: string, signature: string) => Promise<boolean>
};

type OptionalKeys<T> = {
    [K in keyof T]?: T[K];
};

/**
 * @typedef {Object} module:Identities~Identity
 * @property {string} id A unique identifer for the identity.
 * @property {object} publicKey A public key.
 * @property {object} signatures A signed identity id and public key.
 * @property {string} type The type of identity provider.
 * @property {function} sign A sign function to sign data using this identity.
 * @property {function} verify A verify function to verify data signed by this identity.
 */
declare function Identity(params?: OptionalKeys<Identity>): Promise<Identity>;
/**
 * Evaluates whether two identities are equal.
 * @param {Identity} a First identity.
 * @param {Identity} b Second identity.
 * @return {boolean} True if identity a and b are equal, false otherwise.
 * @static
 * @private
 */
export function isEqual(a:Identity, b: Identity): boolean
/**
 * Verifies whether an identity is valid.
 * @param {Identity} identity The identity to verify.
 * @return {boolean} True if the identity is valid, false otherwise.
 * @static
 * @private
 */
export function isIdentity(identity: unknown): boolean;
export function decodeIdentity(bytes: Uint8Array): Promise<Identity>;
export { Identity as default }

