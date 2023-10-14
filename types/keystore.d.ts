import { Secp256k1PublicKey } from "@libp2p/crypto/src/keys/secp256k1-class"
import { PrivateKey } from "@libp2p/interface/src/keys"

export declare namespace KeyStore{
    type KeyPair = {
        publicKey: Uint8Array
        privateKey: Uint8Array
    }
    interface KeyStore {
        addKey(id: string, key: KeyPair): Promise<void>
        clear(): Promise<void>
        close(): Promise<void>
        createKey(id: string): Promise<PrivateKey>
        getKey(id:string): Promise<Secp256k1PublicKey>
        getPublic(keys: Secp256k1PublicKey, options?: {
            format?: "hex" | "buffer"
        }): Promise<string | Uint8Array>
        hasKey(id: string): Promise<boolean>
    }
}