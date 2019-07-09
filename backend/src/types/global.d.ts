declare namespace NodeJS {
    export interface Global {
        employeeData: {
            contractAddress: string
            abi: string
        },
        tagData: {
            contractAddress: string
            abi: string
        },
        workingOrderData: {
            contractAddress: string
            abi: string
        },
        workStationData: {
            contractAddress: string
            abi: string
        },
        workStationEmployeeData: {
            contractAddress: string
            abi: string
        }
    }
}