import { PeerId } from "@libp2p/interface-peer-id"
import { IPFS } from "ipfs-core-types"
import { AccessController } from "./access-controllers"
import { Identity } from "./identities"
import { Entry, Log } from "./oplog"
import { Sync } from "./sync"
export default Database
/**
 * Creates an instance of Database.
 * @function
 * @param {Object} params One or more parameters for configuring Database.
 * @param {IPFS} params.ipfs An IPFS instance.
 * @param {Identity} [params.identity] An Identity instance.
 * @param {string} [params.address] The address of the database.
 * @param {string} [params.name] The name of the database.
 * @param {module:AccessControllers} [params.access] An AccessController
 * instance.
 * @param {string} [params.directory] A location for storing Database-related
 * data. Defaults to ./orbitdb/[params.address].
 * @param {*} [params.meta={}] The database's metadata.
 * @param {module:Storage} [params.headsStorage] A compatible storage
 * instance for storing log heads. Defaults to ComposedStorage.
 * @param {module:Storage} [params.entryStorage] A compatible storage instance
 * for storing log entries. Defaults to ComposedStorage.
 * @param {module:Storage} [params.indexStorage] A compatible storage
 * instance for storing an index of log entries. Defaults to ComposedStorage.
 * @param {number} [params.referencesCount=16]  The maximum distance between
 * references to other entries.
 * @param {boolean} [params.syncAutomatically=false] If true, sync databases
 * automatically. Otherwise, false.
 * @param {function} [params.onUpdate] A function callback. Fired when an
 * entry is added to the oplog.
 * @return {module:Databases~Database} An instance of Database.
 * @instance
 */
declare function Database(params?:
  {
    ipfs: IPFS,
    identity: Identity,
    address: string,
    name: string,
    access: AccessController
    directory?: string,
    meta: unknown,
    headsStorage: Storage,
    entryStorage: Storage,
    indexStorage: Storage,
    referencesCount: number,
    syncAutomatically: boolean,
    onUpdate: (log: Log, entry: Entry) => Promise<void>
  }
): BaseDatabase

type DatabaseEvents = {
  "close": () => void
  "drop": () => void
  "join": (peer: PeerId, heads: Array<Entry>) => void
  "leave": (peer: PeerId) => void
  "update": (entry: Entry) => void
  "error": (error: Error) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EmittedEvents = Record<string | symbol, (...args: any) => any>;

interface TypedEventEmitter<Events extends EmittedEvents> {
  on<E extends keyof Events>(
    event: E, listener: Events[E]
  ): this;

  emit<E extends keyof Events>(
    event: E, ...args: Parameters<Events[E]>
  ): boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface TypedEventEmitter<Events extends EmittedEvents> extends EventEmitter { }

export interface BaseDatabase {

  /**
  * The [access controller]{@link module:AccessControllers} instance of the database.
  * @memberof module:Databases~Database
  * @instance
  */
  access: AccessController

  /**
  * The address of the database.
  * @†ype string
  * @memberof module:Databases~Database
  * @instance
  */
  address: string

  /**
  * The events that can be emitted by the database.
  */
  events: TypedEventEmitter<DatabaseEvents>

  /**
  * The underlying [operations log]{@link module:Log~Log} of the database.
  * @†ype {module:Log~Log}
  * @memberof module:Databases~Database
  * @instance
  */
  log: Log,

  /**
  * The name of the database.
  * @†ype string
  * @memberof module:Databases~Database
  * @instance
  */
  name: string,

  /**
  * Set of currently connected peers for this Database instance.
  * @†ype Set
  * @memberof module:Databases~Database
  * @instance
  */
  peers: Set<PeerId>

  /**
  * A [sync]{@link module:Sync~Sync} instance of the database.
  * @†ype {module:Sync~Sync}
  * @memberof module:Databases~Database
  * @instance
  */
  sync: Sync

  /**
  * Adds an operation to the oplog.
  * @function addOperation
  * @param {*} op Some operation to add to the oplog.
  * @return {string} The hash of the operation.
  * @memberof module:Databases~Database
  * @instance
  * @async
  */
  addOperation(op: { op: "PUT" | "DEL" | "ADD" }, key, value): Promise<string>

  /**
  * The string type identifier of the database.
  * @example "keyvalue", "eventlog", "documents"
  */
  type: string,

  /**
  * Closes the database, stopping sync and closing the oplog.
  * @memberof module:Databases~Database
  * @instance
  * @async
  */
  close(): Promise<void>

  /**
  * Drops the database, clearing the oplog.
  * @memberof module:Databases~Database
  * @instance
  * @async
  */
  drop(): Promise<void>
}
