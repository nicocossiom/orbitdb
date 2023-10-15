import type { PeerId } from "@libp2p/interface-peer-id"
import EventEmitter from "events"
import { AccessControllers } from "./access-controllers"
import { Log } from "./log"
import { Sync } from "./sync"

type DatabaseEvents = { 
    "close": () => void
    "drop": () => void
    "join": (peer: PeerId, heads: Array<Log.Entry>) => void
    "leave": (peer: PeerId) => void
    "update": (entry: Log.Entry) => void
    "error": (error: Error) => void
}
type EmittedEvents = Record<string | symbol, (...args: any) => any>;

interface TypedEventEmitter<Events extends EmittedEvents> {
    on<E extends keyof Events>(
        event: E, listener: Events[E]
    ): this;

    emit<E extends keyof Events>(
        event: E, ...args: Parameters<Events[E]>
    ): boolean;
}

interface TypedEventEmitter<Events extends EmittedEvents> extends EventEmitter { }
export declare module Databases {

    // type DatabaseTypes = "keyvalue" | "document" | "events" 
    const enum DatabaseTypes {
        KeyValue = "keyvalue",
        Document = "documents",
        EventLog = "events"
    } 
    interface BaseDatabase{
        access: AccessControllers.AccessController
        address: string
        events: TypedEventEmitter<DatabaseEvents>
        log: Log.Log, 
        name: string, 
        peers: Set<PeerId>
        sync: Sync.Sync
        addOperation(op: { op: "PUT" | "DEL" | "ADD" }, key, value): Promise<string>
        close(): Promise<void>
        drop(): Promise<void>
    }
    type KVPair<K, V> = { key: K, value: V }

    type DocumentTypeKey = string | number | symbol
    type DocumentType<K extends DocumentTypeKey, V> = {
        [key in K]: V 
    }
    // this should be a type that declares a record with a key of type K and a value of type V but with a required _id field
    type DocumentTypeWithId<K extends DocumentTypeKey, V> = DocumentType<K, V> & { _id: string };

    interface Document<K extends DocumentTypeKey, V extends DocumentTypeWithId<K, V>> extends BaseDatabase{ 
        all(): Promise<Array<KVPair<K, V>>>
        del(key: K): Promise<K>
        get(key: K): Promise<V>
        iterator(filters?: { amount?: number }): AsyncGenerator<KVPair<K, V>>
        put(entry: { key: K, value: V }): Promise<K>
        query(findFn: (doc: DocumentType<K, V>) => boolean): Array<KVPair<K, V>>
    }

    interface Events<V> extends BaseDatabase{
        add(value: V): Promise<string>
        all(): Promise<Array<{ hash: string, value: V }>>
        get(hash: string): V
        iterator(filters?: Log.LogIteratorOptions): AsyncGenerator<{ hash: string, value: V }>
    }

    interface KeyValue<K, V> extends BaseDatabase {
        all(): Promise<Array<KVPair<K, V>>>
        del(key: K): Promise<string>
        get(key: K): Promise<V>
        iterator(filters?: { amount?: number }): AsyncGenerator<KVPair<K, V>>
        put(key: K, value: V): Promise<string>
    }

    function Documents<K extends DocumentTypeKey, V>(options?: { indexBy: string }): Databases.Document<K,V>
    function Events<V>(options?: { indexBy: string }): Databases.Events<V>
    function KeyValue<K, V>(): Databases.KeyValue<K, V>

    type Database<T extends DatabaseTypes, V, K> = (
        T extends DatabaseTypes.KeyValue ? KeyValue<K, V> :
        T extends DatabaseTypes.Document ? Document<K, V> :
        T extends DatabaseTypes.EventLog ? Events<V> : 
        // if T is not provided then database is eventlog
        never
    )
        
}