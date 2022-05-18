import express from "express";

import {
    findStarknetDay,
    findYesterdayStarknetDay,
    checkStarknetDayExistingProperties,
} from "../utils";

import { ApiActions } from "../utils/api/ApiActions";

export const addYesterdayStarknetDay = async function(req: express.Request, res: express.Response) {
    const apiActions = new ApiActions(res);
    
    const starknetDay = await findYesterdayStarknetDay();
    const {
        starkneyDayExist,
        sortedContractsActivityExist,
        organizedAccountsActivityExist,
        onlySortedContractsActivityExist
    } = checkStarknetDayExistingProperties(starknetDay);
    
    if(!starkneyDayExist) {
        await apiActions.createStarknetDay();
    } else {

        if(!sortedContractsActivityExist && !organizedAccountsActivityExist) {
            await apiActions.updateAllStarknetDayFields(starknetDay);
        } else if (onlySortedContractsActivityExist) {
            await apiActions.updateStarknetDayWithAccounts(starknetDay);
        } else {
            apiActions.sendAlreadyQueriedResponse();
        }
    }
}

export const getStarknetDay = async function(req: express.Request, res: express.Response) {
    const apiActions = new ApiActions(res);
    try {
        const starknetDay = await apiActions.findStarknetDay(req.params.date);

        apiActions.sendGetSuccessful({
            starknetDay
        });

    } catch(error) {
        apiActions.sendError(error);
    }
}

export const deleteStarknetDay = async function(req: express.Request, res: express.Response) {
    const apiActions = new ApiActions(res);
    try {
       await apiActions.deleteStarknetDay(req.params.date);

        apiActions.sendDeleteSuccessfull();

    } catch(error) {
        apiActions.sendError(error);
    }
    
}

export const getBlocksPerDate = async function(req: express.Request, res: express.Response) {
    const apiActions = new ApiActions(res);
    try {
        const starknetDay = await apiActions.findStarknetDay(req.params.date);

        apiActions.sendGetSuccessful({
            blocks: starknetDay.blocks
        });

    } catch(error) {
        apiActions.sendError(error);
    }
}

export const addBlocksPerDate = async function(req: express.Request, res: express.Response) {
        const apiActions = new ApiActions(res);
        const starknetDay = await findStarknetDay(req.params.date);

        if(!starknetDay) {
            await apiActions.createStarknetDayWithBlocks();
        } else {
            apiActions.sendAlreadyQueriedResponse();
        }
}

export const getSortedContractsActivityPerDate = async function(req: express.Request, res: express.Response) {
    const apiActions = new ApiActions(res);
    try {
        const starknetDay = await apiActions.findStarknetDay(req.params.date);

        apiActions.sendGetSuccessful({
            sortedContractsActivity: starknetDay.sortedContractsActivity
        });

    } catch(error) {
        apiActions.sendError(error);
    }
}

export const addSortedContractsActivityPerDate = async function(req: express.Request, res: express.Response) {
    const apiActions = new ApiActions(res);
    const starknetDay = await findStarknetDay(req.params.date);
    const {
        starkneyDayExist,
        sortedContractsActivityExist,
    } = checkStarknetDayExistingProperties(starknetDay);

    if(!starkneyDayExist) {
        await apiActions.createStarknetDayWithSortedContractsActivity();
    } else {
        if(!sortedContractsActivityExist) {
            await apiActions.updateStarknetDayWithContractsActivity(starknetDay);
        } else {
            apiActions.sendAlreadyQueriedResponse();
        }
    }
}

export const getOrganizedAccountsActivityPerDate = async function(req: express.Request, res: express.Response) {
    const apiActions = new ApiActions(res);
    try {
        const starknetDay = await apiActions.findStarknetDay(req.params.date);

        apiActions.sendGetSuccessful({ 
            organizedAccountsActivity: starknetDay.organizedAccountsActivity
        });

    } catch(error) {
        apiActions.sendError(error);
    }
}