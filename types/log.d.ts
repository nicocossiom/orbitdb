import { IPFS } from "ipfs-core-types"
import { Identity } from "."

export declare module Log{
    module Clock{
        function Clock(id: string, time: number): Clock
        type Clock = {
            id: string, 
            time: number
        }
        function compareClocks(a: Clock, b: Clock): number
        function tickClock(clock: Clock): Clock
    }

    type Entry = {
        id: string,
        payload: any,
        next: Array<string>,
        refs: Array<string>,
        clock: Clock.Clock,
        v: number,
        key: string
        identity: string,
        sig: string
    }

    function Log(
        ipfs: IPFS,
        identity: Identity,
        options: {
            logId: string, 
            access: any, 
            entries: Array<Entry>, 
            heads: Array<Entry>, 
            clock: Clock.Clock, 
            sortFn: (a: Entry, b: Entry) => number,
        }
    ): Log.Log
    
    type LogIteratorOptions =
        {
            amount?: number,
            gt?: string,
            gte?: string,
            le?: string,
            lte?: string
        }
    interface Log{
        
        append(data: any, options?: {referencesCount: number}): Promise<Entry>
        clear(): Promise<void>
        clock(): Promise<Clock.Clock>
        close(): Promise<void>
        get(hash: string): Promise<Entry>
        heads(): Array<Entry>
        isLog(obj: unknown): boolean
        iterator(options: LogIteratorOptions): AsyncIterator<Entry>
        join(other: Log): Promise<void>
        joinEntry(entry): Promise<void>
        traverse(rootEntries: Array<Entry>, shouldStopFn: () => boolean, useRefs: boolean): AsyncIterator<Entry>
        values(): Array<Entry>

        
    }
}