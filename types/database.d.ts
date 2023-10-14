import { IPFS } from "ipfs-core-types"
import { Databases } from "./databases"
import { Identities } from "./identities"
import { Log } from "./log"
type DatabaseParams = {
    ipfs: IPFS, 
    identity: Identities.Identity, 
    address: string, 
    name: string, 
    access: AccessController
    directory?: string, 
    meta: any, 
    headsStorage: Storage, 
    entryStorage: Storage, 
    indexStorage: Storage, 
    referencesCount: number, 
    syncAutomatically: boolean, 
    onUpdate: (log: Log.Log, entry: Log.Entry) => Promise<void>
}
export declare module Database{
    function Database(params: any): Databases.BaseDatabase
}