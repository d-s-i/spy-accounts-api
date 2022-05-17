import { BigNumber } from "ethers";
import { InvokeFunctionTransaction } from "starknet/types";
import { FunctionCall } from "starknet-analyzer/src/types/organizedStarknet";

export interface ContractDataTree {
    [key: string]: ContractData
}

export interface ContractData { 
    transactionCount: number, 
    type: string,
    rawTransactions: InvokeFunctionTransaction[],
    organizedTransactions?: FunctionCall[]
} 

export interface RangeMilestones {
    milestoneOne: number, 
    milestoneTwo: number, 
    milestoneThree: number, 
    milestoneFour: number 
}