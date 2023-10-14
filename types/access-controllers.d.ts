import { Log } from "./log"
import { Storage } from "./storage"
export declare module AccessControllers{
    interface AccessController{
        type: string, 
        address: string, 
        write: Array<string>, 
        canAppend(entry: Log.Entry): Promise<boolean>

    }
    function IPFSAccessController(options?: { write: string[], storage?: Storage.Storage }):
        AccessController
    function OrbitDBAccessController(options?: { write?: string[] }): AccessController
    function removeAccessController(type: string): void
    function useAccessController(type: string): void
}