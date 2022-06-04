import express from "express";

import {
    checkStarknetDayExistingProperties,
    formatDate
} from "../utils";

import { ApiActions } from "../utils/api/ApiActions";

///////////////////////////
// getters
export const getYesterdayStarknetDay = async function(req: express.Request, res: express.Response) {
    const apiActions = new ApiActions(res);
    const starknetDay = await apiActions.findStarknetDay(formatDate(new Date()));
    apiActions.sendGetSuccessful({ starknetDay });
}

export const getStarknetDay = async function(req: express.Request, res: express.Response) {
    const apiActions = new ApiActions(res);
    const starknetDay = await apiActions.findStarknetDay(req.params.date);

    apiActions.sendGetSuccessful({
        starknetDay
    });
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

///////////////////////////
// posters
export const addYesterdayStarknetDay = async function(req: express.Request, res: express.Response) {
    const apiActions = new ApiActions(res);

    const starknetDay = await apiActions.findStarknetDay(Date.now());
    const {
        starkneyDayExist,
        sortedContractsActivityExist,
        organizedAccountsActivityExist,
        onlySortedContractsActivityExist
    } = checkStarknetDayExistingProperties(starknetDay);
    
    if(!starkneyDayExist) {
        const responseData = await apiActions.createStarknetDay();
        if(responseData) apiActions.sendCreationSuccessful(responseData);
    } else {

        if(!sortedContractsActivityExist && !organizedAccountsActivityExist) {
            const responseData = await apiActions.updateAllStarknetDayFields(starknetDay);
            apiActions.sendUpdateSuccessful(responseData);
        } else if (onlySortedContractsActivityExist) {
            const responseData = await apiActions.updateStarknetDayWithAccounts(starknetDay);
            apiActions.sendUpdateSuccessful(responseData);
        } else {
            apiActions.sendAlreadyAddedResponse();
        }
    }

}

export const addBlocksPerDate = async function(req: express.Request, res: express.Response) {
    const apiActions = new ApiActions(res);
    const starknetDay = await apiActions.findStarknetDay(req.params.date);

    if(!starknetDay) {
        const responseData = await apiActions.createStarknetDayWithBlocks();
        apiActions.sendCreationSuccessful(responseData);
    } else {
        apiActions.sendAlreadyAddedResponse();
    }
}

export const addSortedContractsActivityPerDate = async function(req: express.Request, res: express.Response) {
    const apiActions = new ApiActions(res);
    const starknetDay = await apiActions.findStarknetDay(req.params.date);
    const {
        starkneyDayExist,
        sortedContractsActivityExist,
    } = checkStarknetDayExistingProperties(starknetDay);

    if(!starkneyDayExist) {
        const responseData = await apiActions.createStarknetDayWithSortedContractsActivity();
        apiActions.sendCreationSuccessful(responseData);
    } else {
        if(!sortedContractsActivityExist) {
            const responseData = await apiActions.updateStarknetDayWithContractsActivity(starknetDay);
            apiActions.sendUpdateSuccessful(responseData);
        } else {
            apiActions.sendAlreadyAddedResponse();
        }
    }
}

///////////////////////////
// deleters
export const deleteStarknetDay = async function(req: express.Request, res: express.Response) {
    const apiActions = new ApiActions(res);
    try {
        await apiActions.deleteStarknetDay(req.params.date);
        apiActions.sendDeleteSuccessfull();
    } catch(error) {
        apiActions.sendError(error);
    }
}

export const deleteYesterdayStarknetDay = async function(req: express.Request, res: express.Response) {
    const apiActions = new ApiActions(res);
    try {
        await apiActions.deleteStarknetDay(formatDate(new Date()));
        apiActions.sendDeleteSuccessfull();
        // const starknetDay = await apiActions.findStarknetDay(Date.now());
    } catch(error) {
        console.log(error);
        apiActions.sendError(error);
    }
}

export const deleteOrganizedAccounts = async function(req: express.Request, res: express.Response) {
    const apiActions = new ApiActions(res);

    const responseData = await apiActions.deleteField(req.params.date, "organizedAccountsActivity");
    apiActions.sendUpdateSuccessful(responseData);
}