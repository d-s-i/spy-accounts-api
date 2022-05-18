import express from "express";
import { StarknetDayModel } from "../models/starknetDayModel";

import { defaultProvider } from "starknet";

import { AccountAnalyzer } from "../utils/AccountAnalyzer/AccountAnalyzer";
import { AnyMongooseQuery } from "./types";
import { BlocksTree, ContractDataTree } from "../utils/AccountAnalyzer/types";

export const mongooseMapToPOJO = function(
    _map: AnyMongooseQuery
) {
    return _map.toObject({ flattenMaps: true });
}

export const findStarknetDay = async function(timestamp: number | string | Date) {
    try {
        const starknetDay = await StarknetDayModel.findOne({ 
            date: { 
                $gte: new Date(timestamp).setHours(0,0,0), 
                $lt: new Date(timestamp).setHours(23,59,59) 
            } 
        });
        return starknetDay;
    } catch(error) {
        return undefined;
    }
}

export const findYesterdayStarknetDay = async function() {
    return findStarknetDay(Date.now());
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

export const sendAlreadyQueriedResponse = function(res: express.Response) {
    res.status(208).json({
        status: "already-queried",
        message: "Document already present in the database at this date"
    });
}