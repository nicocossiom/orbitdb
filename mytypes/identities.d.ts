import { IPFS } from "ipfs-core-types"
import { KeyStore } from "./keystore"
import { Storage } from "./storage"

export declare module Identities{
    type Identity = {
        id: string, 
        publicKey: any, 
        signatures: any,
        type: string, 
        sign: (identity: Identity, data: string) => Promise<string>
        verify: (identity: Identity, data: string, signature: string) => Promise<boolean>
    }

    interface Identities {
        createIdentity(options?: {provider?: () => Promise<any>}): Promise<Identity>
    }
    function Identities(params?: {
        keystore?: KeyStore.KeyStore, 
        path?: string, 
        storage?: Storage.Storage, 
        ipfs?: IPFS
    }) : Identities
}