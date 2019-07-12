declare namespace NodeJS {
    export interface Global {
        employeeData: {
            contractAddress: string
            abi: string
            instanceAbi: string
        },
        tagData: {
            contractAddress: string
            abi: string
            instanceAbi: string
        },
        workingOrderData: {
            contractAddress: string
            abi: string
            instanceAbi: string
        },
        workStationData: {
            contractAddress: string
            abi: string
            instanceAbi: string
        },
        workStationEmployeeData: {
            contractAddress: string
            abi: string
            instanceAbi: string
        }
    }
}