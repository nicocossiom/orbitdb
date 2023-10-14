import type { PeerId } from "@libp2p/interface-peer-id"
import EventEmitter from "events"
import { Entry } from "./log"

export declare module Sync{
    interface Sync {
        events: EventEmitter, 
        peers: Set<PeerId>
        add(entry: Entry): Promise<void>
        start(): Promise<void>
        stop(): Promise<void>
    }
    function Sync(params: any): Sync
}