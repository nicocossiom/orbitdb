import { PeerId } from "@libp2p/interface-peer-id"
import { IPFS } from "ipfs-core-types"
import { Identities } from "."
import { AccessController } from "./access-controllers"
import OrbitDBAddress from "./address"
import { Identity } from "./identities"
import KeyStore from "./key-store"
import { Storage as OrbitStorage } from "./storage"
/**
 * Creates an instance of OrbitDB.
 * @function createOrbitDB
 * @param {Object} params One or more parameters for configuring OrbitDB.
 * @param {IPFS} params.ipfs An IPFS instance.
 * @param {string} [params.id] The id of the identity to use for this OrbitDB instance.
 * @param {module:Identity|Object} [params.identity] An identity instance or an object containing an Identity Provider instance and any additional params required to create the identity using the specified provider.
 * @param {Function} [params.identity.provider] An initialized identity provider.
 * @param {module:Identities} [params.identities] An Identities system instance.
 * @param {string} [params.directory] A location for storing OrbitDB data.
 * @return {module:OrbitDB~OrbitDB} An instance of OrbitDB.
 * @throws "IPFS instance is required argument" if no IPFS instance is provided.
 * @instance
 */
declare function OrbitDB(
    params: CreateOrbitDBParams
): OrbitDB;
export { OrbitDBAddress, OrbitDB as default }



type CreateOrbitDBParams = {
    ipfs: IPFS
    id?: string, 
    identity?: Identity
    identities?: Identities
    directory?: string
}

export interface OrbitDB {
    open<T>(
        address: string,
        params: {
            type?: Databases.DatabaseTypes,
            meta?: any,
            sync?: boolean,
            Database: T,
            AccessController?: AccessController,
            headsStorage?: OrbitStorage,
            indexStorage?: OrbitStorage,
            entryStorage?: OrbitStorage,
            referencesCount?: number
        }
    ): Promise<T>;
    stop(): Promise<void>
    id: string,
    ipfs: IPFS,
    directory: string,
    keystore: KeyStore,
    identity: Identity,
    peerId: PeerId
}

export function createOrbitDB(params: CreateOrbitDBParams): Promise<OrbitDB>

