import { ContractDataTree } from "./AccountAnalyzer/types";
import { AnyMongooseQuery } from "./types";
import { InvokeFunctionTransaction } from "starknet/types";
import { BigNumber } from "ethers";

export const mongooseMapToPOJO = function(
    _map: AnyMongooseQuery
) {
    return _map.toObject({ flattenMaps: true });
}

export const checkStarknetDayExistingProperties = function(starknetDay: AnyMongooseQuery) {
    const starkneyDayExist = starknetDay ? true : false;
    const sortedContractsActivityExist = (starknetDay && starknetDay.sortedContractsActivity) ? true : false;
    const organizedAccountsActivityExist = (starknetDay && starknetDay.organizedAccountsActivity) ? true : false;
    const onlySortedContractsActivityExist = sortedContractsActivityExist && !organizedAccountsActivityExist;

    return {
        starkneyDayExist,
        sortedContractsActivityExist,
        organizedAccountsActivityExist,
        onlySortedContractsActivityExist
    };
}

export const stringifyValueField = function(_organizedAccountsActivity: Required<ContractDataTree>) {
    let organizedAccountsActivity: {
        [key: string]: { 
            transactionCount: number, 
            type: string,
            rawTransactions: InvokeFunctionTransaction[],
            organizedTransactions?: {
                name: string,
                to: BigNumber,
                calldata: {
                    name: string,
                    type: string,
                    value: string
                }
            }[]
        }
    } = {};

    for(const acc in _organizedAccountsActivity) {
        const _organizedTransactions = _organizedAccountsActivity[acc].organizedTransactions?.map(otx => {
            const _calldata = otx.calldata.map((calldata: any) => {
                return {
                    name: calldata.name,
                    type: calldata.type,
                    value: JSON.stringify(calldata.value).toString()
                }
            })
            return {
                name: otx.name,
                to: otx.to,
                calldata: _calldata
            }
        });
        organizedAccountsActivity[acc] = {
            transactionCount: _organizedAccountsActivity[acc].transactionCount,
            type: _organizedAccountsActivity[acc].type,
            rawTransactions: _organizedAccountsActivity[acc].rawTransactions,
            organizedTransactions: _organizedTransactions
        };
    }

    return organizedAccountsActivity;
}