export declare module Address{
    interface OrbitDBAddress {
        protocol: string
        hash: string
        address: string
        toString(): string
    }
    function isValidAddrees(address: string): boolean
    function parseAddress(parseAddress: string): OrbitDBAddress
    function OrbitDBAddress(address:string):OrbitDBAddress
}