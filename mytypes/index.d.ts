export { IPFSAccessController, OrbitDBAccessController, useAccessController } from "./access-controllers"
export { isValidAddress, parseAddress } from "./address"
export { default as Database } from "./database.js"
export { Documents, Events, KeyValue, KeyValueIndexed, useDatabaseType } from "./databases"
export { Identities, PublicKeyIdentityProvider, isIdentity, useIdentityProvider } from "./identities"
export { default as KeyStore } from "./key-store"
export { DefaultAccessController, Entry, Log } from "./oplog"
export { default as createOrbitDB } from "./orbitdb"
export { ComposedStorage, IPFSBlockStorage, LRUStorage, LevelStorage, MemoryStorage } from "./storage"
export { AccessControllers, Databases, Identities, Storage }




import { IPFS } from "ipfs-core-types"
import { AccessControllers } from "./access-controllers"
import { Databases } from "./databases"
import { Identities } from "./identities"
import { Storage } from "./storage"

type CreateOrbitDBParams = {
    ipfs: IPFS
    id?: string, 
    identity?: Identities.Identity
    identities?: Identities.Identities
    directory?: string
}

interface OrbitDB {
  open<T>(
    address: string,
    params: {
      type?: Databases.DatabaseTypes,
      meta?: any,
      sync?: boolean,
      Database: T,
      AccessController?: AccessControllers.AccessController,
      headsStorage?: Storage.Storage,
      indexStorage?: Storage.Storage,
      entryStorage?: Storage.Storage,
      referencesCount?: number
    }
  ): Promise<T>;
  stop(): Promise<void>
}

export function createOrbitDB(params: CreateOrbitDBParams): Promise<OrbitDB>

