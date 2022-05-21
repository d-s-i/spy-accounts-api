import { FunctionCall } from "starknet-analyzer/src/types/organizedStarknet";
import { ContractDataTree, OrganizedTransaction } from "./AccountAnalyzer/types";

import { AnyMongooseQuery, MongooseContractDataTree } from "./types";

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
    let organizedAccountsActivity: MongooseContractDataTree = {};

    for(const acc in _organizedAccountsActivity) {
        const _organizedTransactions = _organizedAccountsActivity[acc].organizedTransactions?.map(otx => {
            const functionCalls = otx.organizedFunctionCalls.map((fnCalls) => {
                const _calldata = fnCalls.calldata.map((fnCall) => {
                    return {
                        name: fnCall.name,
                        type: fnCall.type,
                        value: JSON.stringify(fnCall.value).toString()
                    }
                });
                return {
                    name: fnCalls.name,
                    to: fnCalls.to,
                    calldata: _calldata
                };
            });

            return {
                transactionHash: otx.transactionHash,
                organizedFunctionCalls: functionCalls
            };
        });
        console.log(acc, _organizedTransactions);
        organizedAccountsActivity[acc] = {
            transactionCount: _organizedAccountsActivity[acc].transactionCount,
            type: _organizedAccountsActivity[acc].type,
            rawTransactions: _organizedAccountsActivity[acc].rawTransactions,
            organizedTransactions: _organizedTransactions
        };
    }

    return organizedAccountsActivity;
}

export const formatDate = function(_date: Date) {
    return `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()}`;
}