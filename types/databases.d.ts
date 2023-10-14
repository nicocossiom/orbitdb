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

    type DatabaseTypes = "keyvalue" | "document" | "events" 
    
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
    type Pair<K, V> = { key: K, value: V }

    interface Document<K, V> extends BaseDatabase{ 
        all(): Promise<Array<Pair<K, V>>>
        del(key: K): Promise<string>
        get(key: K): Promise<V>
        iterator(filters?: { amount?: number }): AsyncGenerator<Pair<K, V>>
        put({ key: K, value: V }): Promise<string>
        query(findFn: (doc) => boolean): Array<Pair<K,V>>
    }

    interface Events<V> extends BaseDatabase{
        add(value: V): Promise<string>
        all(): Promise<Array<{ hash: string, value: V }>>
        get(hash: string): V
        iterator(filters?: Log.LogIteratorOptions): AsyncGenerator<{ hash: string, value: V }>
    }

    interface KeyValue<K, V> extends BaseDatabase {
        all(): Promise<Array<Pair<K, V>>>
        del(key: K): Promise<string>
        get(key: K): Promise<V>
        iterator(filters?: { amount?: number }): AsyncGenerator<Pair<K, V>>
        put(key: K, value: V): Promise<string>
    }

    function Documents<K,V>(options?: { indexBy: string }): Databases.Document<K, V>
    function Events<V>(options?: { indexBy: string }): Databases.Events<V>
    function KeyValue<K, V>(): Databases.KeyValue<K, V>

    type Database<T extends DatabaseTypes, K, V> =
    T extends "document" ? Document<K, V> :
    T extends "events" ? Events<V> :
    T extends "keyvalue" ? KeyValue<K, V> :
        // if K or V are not specified then return unknown type for K and V
    T extends "document" | "events" | "keyvalue"? Database<T, unknown, unknown>  :
    never;

}