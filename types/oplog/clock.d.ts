/**
 * @namespace module:Log~Clock
 * @memberof module:Log
 * @description
 * The lamport clock.
 * @private
 */


type Clock = {
    id: string, 
    time: number
}
        
/**
 * Compares two clocks by time and then, time is the same, by id.
 *
 * compareClocks should never return zero (0). If it does, a and b refer to the
 * same clock.
 * @param {module:Clock} a The first clock.
 * @param {module:Clock} b The second clock.
 * @return {number} Returns a negative integer if clock a is less than clock b
 * otherwise a positive integer is returned.
 * @memberof module:Log~Clock
 */
export function compareClocks(a: Clock, b: Clock): number;
/**
 * Creates an instance of Clock.
 * @function
 * @param {string} id A unique identifier.
 * @param {number} [time=0] A natural number (including 0).
 * @memberof module:Log~Clock
 * @instance
 */
declare function Clock(id: string, time?: number): Clock;
/**
 * Advances a clock's time by 1, returning a new instance of Clock.
 * @param {module:Clock} clock The clock to advance.
 * @return {module:Clock} A new instance of clock with time advanced by 1.
 * @memberof module:Log~Clock
 */
export function tickClock(clock: Clock): Clock;
export { Clock as default }
