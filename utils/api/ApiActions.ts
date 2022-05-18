import express from "express";
import { StarknetDayModel } from "../../models/starknetDayModel";

import { defaultProvider } from "starknet";

import { AccountAnalyzer } from "../AccountAnalyzer/AccountAnalyzer";
import { mongooseMapToPOJO } from "../index";

import {
    fetchBlocksAndContractsAndAccounts,
    fetchContractsActivityAndBlocks,
    fetchContractsAndAccountsActivityFromBlocks,
    fetchAccountsActivityFromContractsActivity,
    fetchContractsActivityFromBlocks
} from "../accountAnalyzersHelpers";
import { AnyMongooseQuery } from "../types";
import { ApiResponses } from "./ApiResponses";

export class ApiActions extends ApiResponses {

    
    constructor(res: express.Response) {
        super(res);
    }
    
    async findStarknetDay(timestamp: number | string | Date) {
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

    async deleteStarknetDay(date: string) {
        const starknetDay = await this.findStarknetDay(date);
        await StarknetDayModel.findByIdAndDelete(starknetDay._id);
    }
    
    async createStarknetDay() {
        try {
            const {
                blocks, 
                sortedContractsActivity,
                organizedAccountsActivity
            } = await fetchBlocksAndContractsAndAccounts();
            
            const starknetDay = await StarknetDayModel.create({ 
                date: Date.now(), 
                blocks,
                sortedContractsActivity,
                organizedAccountsActivity
            });
    
            super.sendCreationSuccessful({ starknetDay });
        } catch(error) {
            this.sendError(error);
        }
    }

    async updateAllStarknetDayFields(starknetDay: AnyMongooseQuery) {
        try {
            const blocks = mongooseMapToPOJO(starknetDay.blocks);
            
            const {
                sortedContractsActivity,
                organizedAccountsActivity
            } = await fetchContractsAndAccountsActivityFromBlocks(blocks);
    
            const newStarknetDay = await StarknetDayModel.findByIdAndUpdate(
                starknetDay._id, 
                { 
                    sortedContractsActivity,
                    organizedAccountsActivity
                },
                { new: true }
            );
    
            super.sendUpdateSuccessful({ newStarknetDay });
        } catch(error) {
            super.sendError(error);
        }
    }

    async updateStarknetDayWithAccounts(starknetDay: AnyMongooseQuery) {
        try {
            const blocks = mongooseMapToPOJO(starknetDay.blocks);
            const sortedContractsActivity = mongooseMapToPOJO(starknetDay.activeContracts);
    
            const organizedAccountsActivity = await fetchAccountsActivityFromContractsActivity(blocks, sortedContractsActivity);
    
            const newStarknetDay = await StarknetDayModel.findByIdAndUpdate(
                starknetDay._id, 
                { organizedAccountsActivity },
                { new: true }
            );
    
            super.sendUpdateSuccessful({ newStarknetDay });
        } catch(error) {
            super.sendError(error);
        }
    }

    async createStarknetDayWithBlocks() {
        try {
            const accountAnalyzer = new AccountAnalyzer(defaultProvider);
            const [startBlockNumber, latestBlockNumber] = await accountAnalyzer.getYesterdayBlockRange();
    
            await accountAnalyzer.getTopAccountsFromBlockNumbers(startBlockNumber, startBlockNumber + 1);
    
            const starknetDay = await StarknetDayModel.create({ 
                date: Date.now(), 
                blocks: accountAnalyzer.blocks
            });
    
            super.sendCreationSuccessful({ starknetDay });
        } catch(error) {
            super.sendError(error);
        }
    }

    async createStarknetDayWithSortedContractsActivity() {
        try {
            const { blocks, sortedContractsActivity } = await fetchContractsActivityAndBlocks();

            const starknetDay = await StarknetDayModel.create({ 
                date: Date.now(), 
                blocks,
                sortedContractsActivity
            });

            super.sendCreationSuccessful({ starknetDay });
        } catch(error) {
            super.sendError(error);
        }
    }

    async updateStarknetDayWithContractsActivity(starknetDay: AnyMongooseQuery) {
        try {
            const blocks = mongooseMapToPOJO(starknetDay.blocks);
            const sortedContractsActivity = await fetchContractsActivityFromBlocks(blocks);
    
            const newStarknetDay = await StarknetDayModel.findByIdAndUpdate(
                starknetDay._id, 
                { sortedContractsActivity },
                { new: true }
            );
            
            super.sendUpdateSuccessful({ newStarknetDay });
        } catch(error) {
            super.sendError(error);
        }
    }
}