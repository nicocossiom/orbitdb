import { PeerId } from "@libp2p/interface-peer-id"
import { IPFS } from "ipfs-core-types"
import { Databases, Identities, KeyStore } from "."
import { AccessController } from "./access-controllers"
import OrbitDBAddress from "./address"
import { Documents } from "./databases/documents"
import { Events } from "./databases/events"
import { KeyValue } from "./databases/keyvalue"
import { Identity } from "./identities"
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
declare function OrbitDB(params: CreateOrbitDBParams): OrbitDB

type CreateOrbitDBParams = {
    /** An IPFS instance. */
    ipfs: IPFS
    /** The id of the identity to use for this OrbitDB instance. */
    id?: string,
    /** 
     * An identity instance or an object containing an Identity Provider
     * instance and any additional params required to create the identity using the specified provider.
     */
    identity?: Identity
    /** An Identities system instance. */
    identities?: Identities
    /** A location for storing OrbitDB data. */
    directory?: string
}

export interface OrbitDB {
    DatabaseTypes: string[]
    /**
     * Open a database or create one if it does not already exist.
     * ## Creating a new Database or opening an existing one by name
     * By default, OrbitDB will create a database of type {@link Events}. This typings package
     * forces the use of the Database type parameter to be specified. In order to use refer to 
     * the functions: {@link Documents} - {@link Events} - {@link KeyValue} which can be imported as below.
     * ```
     * import { Events, Documents, KeyValue } from 'orbit-db'
     * const mydb = await orbitdb.open('mydb', {Database: Events<string>()})
     * ```
     * This results on mydb being of type:
     * ```
     * const mydb : Events<string>
     * ```
     * ### type parameter
     * This makes the params parameter `type` obsolete. It can still be used 
     * but type restraints will be enforced. Hence using 
     * ```
     * const mydb = await orbitdb.open('mydb', {type: 'documents', Database: Events<string>()})
     * ```
     * > Type '"documents"' is not assignable to type '"events"'.
     * >I was expecting a type matching "events", but instead you passed "documents".
     * >(property) type?: "events" | undefined
     * The type must be listed in {@link DatabaseTypes} or an error is thrown.
     * 
     * ## Open an existing database by address
     * To open an existing database, pass its address to the `open` function:
     * ```
     * const existingDB = await orbitdb.open(dbAddress)
     * const mydb: Documents<unknown, unknown> | KeyValue<unknown, unknown> | Events<unknown>
     * ```
     * When using this options parameters `type` and `Database` are not available.
     * TypeScript doesn't know the type of database being opened. To specify it use the generic type parameter:
     * ```
     * const existingDB = await orbitdb.open<Events<string>>(dbAddress)
     * const existingDB : Events<string>
     * ```
     * The address of a newly created database can be retrieved using `db.address`.
     * 
     * @param address The address of an existing database to open, or the name of a new database.
     * @param params One or more database configuration parameters.
     * @return A database instance.
     * @throws "Unsupported database type" if the type specified is not in the list
     * of known databaseTypes.
     */
    open<T extends Documents<unknown, unknown> | KeyValue<unknown, unknown> | Events<unknown>>(
        address: string,
        params: {
            // if Database is specified then if this field will error if it doesn't match the type of Database
            type?: DatabaseType<T>,
            meta?: unknown,
            sync?: boolean,
            Database: T,
            AccessController?: AccessController,
            headsStorage?: OrbitStorage,
            indexStorage?: OrbitStorage,
            entryStorage?: OrbitStorage,
            referencesCount?: number
        }
    ): Promise<typeof params.Database>

    open<T extends Documents<unknown, unknown> | KeyValue<unknown, unknown> | Events<unknown>>(
        address: string,
        params?: {
            meta?: unknown,
            sync?: boolean,
            headsStorage?: OrbitStorage,
            indexStorage?: OrbitStorage,
            entryStorage?: OrbitStorage,
            referencesCount?: number
        }): Promise<T>
    /**
     * Stops OrbitDB, closing the underlying keystore and manifest store.
     */
    stop(): Promise<void>

    /**
     * The id of the identity to use for this OrbitDB instance.
     */
    id: string
    /**
     * The IPFS instance or API used by this OrbitDB instance.
     */
    ipfs: IPFS
    /**
     * A location for storing OrbitDB data.
     */
    directory: string

    /**
     * An object containing all the databases opened by this OrbitDB instance.
     * Key is the database address, value is the database instance.
     */
    databases: { [key: string]: Databases }

    keystore: KeyStore
    /**
     * An identity instance or an object containing an Identity Provider
     * instance and any additional params required to create the identity using the specified provider.
     */
    identity: Identity,
    /**
     * The PeerID of the current OrbitDB instance.
     */
    peerId: PeerId
}

/**
 * A type representing the literal string values of the database types. To enforce the type field
 */
type DatabaseType<T> =
    T extends Documents<unknown, unknown> ? "document" :
    T extends KeyValue<unknown, unknown> ? "keyvalue" :
    T extends Events<unknown> ? "events" :
    never


/**
 * Creates an instance of OrbitDB.
 * @function createOrbitDB
 * @param {CreateOrbitDBParams} params One or more parameters for configuring OrbitDB.
 * @return {OrbitDB} An instance of OrbitDB.
 * @throws "IPFS instance is required argument" if no IPFS instance is provided.
 * @instance
 */
declare function createOrbitDB(params: CreateOrbitDBParams): Promise<OrbitDB>

export { OrbitDB, OrbitDBAddress, createOrbitDB }

