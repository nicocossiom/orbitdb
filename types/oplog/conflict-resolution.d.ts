import { Entry } from "./entry"

export declare namespace ConflictResolution {
    export { SortByClocks }
    export { SortByClockId }
    export { LastWriteWins }
    export { NoZeroes }
}

type ConflictResolutionFn<T> = (a: T, b: T) => 1 | -1
type SortByFn<T> = (a:T, b: T, resolveConflict: ConflictResolutionFn<T>) => 1 | -1

/**
 * Sort two entries by their clock time.
 * @param {Entry} a First entry to compare
 * @param {Entry} b Second entry to compare
 * @param {function(a, b)} resolveConflict A function to call if entries are
 * concurrent (happened at the same time). The function should take in two
 * entries and return 1 if the first entry should be chosen and -1 if the
 * second entry should be chosen.
 * @return {number} 1 if a is greater, -1 if b is greater
 * @private
 */
declare const SortByClocks: SortByFn<Entry>
/**
 * Sort two entries by their clock id.
 * @param {Entry} a First entry to compare
 * @param {Entry} b Second entry to compare
 * @param {function(a, b)} resolveConflict A function to call if the clocks ids
 * are the same. The function should take in two entries and return 1 if the
 * first entry should be chosen and -1 if the second entry should be chosen.
 * @return {number} 1 if a is greater, -1 if b is greater
 * @private
 */
declare const SortByClockId: SortByFn<Entry>
/**
 * Sort two entries as Last-Write-Wins (LWW).
 * Last Write Wins is a conflict resolution strategy for sorting elements
 * where the element with a greater clock (latest) is chosen as the winner.
 *
 * @param {Entry} a First entry
 * @param {Entry} b Second entry
 * @return {number} 1 if a is latest, -1 if b is latest
 * @private
 */
declare const LastWriteWins: ConflictResolutionFn<Entry>
/**
 * A wrapper function to throw an error if the results of a passed function
 * return zero
 * @param {function(a, b)} [tiebreaker] The tiebreaker function to validate.
 * @return {function(a, b)} 1 if a is greater, -1 if b is greater
 * @throws {Error} if func ever returns 0
 * @private
 */
declare function NoZeroes( tiebreaker: (a: Entry, b: Entry) => number ): ConflictResolutionFn<Entry>;
