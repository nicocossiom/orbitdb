import { PeerId } from "@libp2p/interface-peer-id"
import { EventEmitter } from "events"
import { IPFS } from "ipfs-core-types"
import { Entry, Log } from "."


/**
 * @module Sync
 * @description
 * The Sync Protocol for OrbitDB synchronizes the database operations {@link module:Log} between multiple peers.
 *
 * The Sync Protocol sends and receives heads between multiple peers,
 * both when opening a database and when a database is updated, ie.
 * new entries are appended to the log.
 *
 * When Sync is started, a peer subscribes to a pubsub topic of the log's id.
 * Upon subscribing to the topic, peers already connected to the topic receive
 * the subscription message and "dial" the subscribing peer using a libp2p
 * custom protocol. Once connected to the subscribing peer on a direct
 * peer-to-peer connection, the dialing peer and the subscribing peer exchange * the heads of the Log each peer currently has. Once completed, the peers have * the same "local state".
 *
 * Once the initial sync has completed, peers notify one another of updates to
 * the log, ie. updates to the database, using the initially opened pubsub
 * topic subscription.
 * A peer with new heads broadcasts changes to other peers by publishing the
 * updated heads
 * to the pubsub topic. Peers subscribed to the same topic will then receive
 * the update and
 * will update their log's state, the heads, accordingly.
 *
 * The Sync Protocol is eventually consistent. It guarantees that once all
 * messages have been sent and received, peers will observe the same log state
 * and values. The Sync Protocol does not guarantee the order in which messages
 * are received or even that a message is recieved at all, nor any timing on
 * when messages are received.
 *
 * Note that the Sync Protocol does not retrieve the full log when
 * synchronizing the heads. Rather only the "latest entries" in the log, the
 * heads, are exchanged. In order to retrieve the full log and each entry, the
 * user would call the log.traverse() or log.iterator() functions, which go
 * through the log and retrieve each missing log entry from IPFS.
 *
 * @example
 * // Using defaults
 * const sync = await Sync({ ipfs, log, onSynced: (peerId, heads) => ... })
 *
 * @example
 * // Using all parameters
 * const sync = await Sync({ ipfs, log, events, onSynced: (peerId, heads) => ..., start: false })
 * sync.events.on('join', (peerId, heads) => ...)
 * sync.events.on('leave', (peerId) => ...)
 * sync.events.on('error', (err) => ...)
 * await sync.start()
 */
/**
 * Creates a Sync instance for sychronizing logs between multiple peers.
 *
 * @function
 * @param {Object} params One or more parameters for configuring Sync.
 * @param {IPFS} params.ipfs An IPFS instance.
 * @param {Log} params.log The log instance to sync.
 * @param {EventEmitter} [params.events] An event emitter to use. Events
 * emitted are 'join', 'leave' and 'error'. If the parameter is not provided,
 * an EventEmitter will be created.
 * @param {onSynced} [params.onSynced] A callback function that is called after
 * the peer has received heads from another peer.
 * @param {Boolean} [params.start] True if sync should start automatically,
 * false otherwise. Defaults to true.
 * @return {module:Sync~Sync} sync An instance of the Sync Protocol.
 * @memberof module:Sync
 * @instance
 */
declare function Sync({ ipfs, log, events, onSynced, start, timeout }: {
    ipfs: IPFS;
    log: Log;
    events?: EventEmitter;
    onSynced?: any;
    start?: boolean;
}): Sync;

export interface Sync {
    events: EventEmitter, 
    peers: Set<PeerId>
    add(entry: Entry): Promise<void>
    start(): Promise<void>
    stop(): Promise<void>
}

export { Sync as default }

