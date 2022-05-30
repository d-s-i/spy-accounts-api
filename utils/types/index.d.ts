
import { QueryWithHelpers, EnforceDocument } from "mongoose";
import { InvokeFunctionTransaction } from "starknet/types";
import { BigNumber } from "ethers";
import { ContractDataTree, OrganizedTransaction } from "../AccountAnalyzer/types";

export type AnyMongooseQuery = QueryWithHelpers<
    EnforceDocument<any, { toObject: () => object }> | null, EnforceDocument<any, { toObject: () => object }>, any, any
>;

export interface MongooseContractDataTree {
    [key: string]: { 
        transactionCount: number, 
        type: string,
        rawTransactions?: InvokeFunctionTransaction[],
        organizedTransactions?: {
            transactionHash: string,
            organizedFunctionCalls: {
                name: string,
                to: BigNumber,
                calldata: {
                    name: string,
                    type: string,
                    value: string
                }[]
            }[]
        }[]
    }
}
