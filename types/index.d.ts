import { IPFS } from "ipfs-core-types"
import { AccessControllers } from "./access-controllers"
import { Databases } from "./databases"
import { Identities } from "./identities"
import { Storage } from "./storage"
type crateOrbitDBParams = {
    ipfs: IPFS
    id?: string, 
    identity?: Identities.Identity
    identities?: Identities.Identities
    directory?: string
}

interface OrbitDB {
    open<T extends Databases.DatabaseTypes, K, V>(address: string, params?: {
        type?: T,
        meta?: any, 
        sync?: boolean, 
        Database?: Databases.Database<T, K, V>, 
        AccessController?: AccessControllers.AccessController, 
        headsStorage?: Storage.Storage, 
        indexStorage?: Storage.Storage, 
        entryStorage?: Storage.Storage, 
        referencesCount?: number
    }): Promise<Databases.Database<T, K, V>>
    stop(): Promise<void>
}

export default function createOrbitDB(params: crateOrbitDBParams): Promise<OrbitDB>
export { AccessControllers, Databases, Identities, Storage }
