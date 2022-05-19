import express from "express";
import { StarknetDayModel } from "../../models/starknetDayModel";

import { defaultProvider } from "starknet";

import { AccountAnalyzer } from "../AccountAnalyzer/AccountAnalyzer";
import { mongooseMapToPOJO, stringifyValueField } from "../index";

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
    
    async createStarknetDay() {
        try {
            const {
                blocks, 
                sortedContractsActivity,
                organizedAccountsActivity: _organizedAccountsActivity
            } = await fetchBlocksAndContractsAndAccounts();

            const organizedAccountsActivity = stringifyValueField(_organizedAccountsActivity);
            
            const starknetDay = await StarknetDayModel.create({ 
                date: Date.now(), 
                blocks,
                sortedContractsActivity,
                organizedAccountsActivity: organizedAccountsActivity
            });
    
            // super.sendCreationSuccessful({ starknetDay });
            return { starknetDay };
        } catch(error) {
            this.sendError(error);
            
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
    
            return { starknetDay };
            // super.sendCreationSuccessful({ starknetDay });
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

            // super.sendCreationSuccessful({ starknetDay });
            return { starknetDay };
        } catch(error) {
            super.sendError(error);
        }
    }

    async updateAllStarknetDayFields(starknetDay: AnyMongooseQuery) {
        try {
            const blocks = mongooseMapToPOJO(starknetDay.blocks);
            
            const {
                sortedContractsActivity,
                organizedAccountsActivity: _organizedAccountsActivity
            } = await fetchContractsAndAccountsActivityFromBlocks(blocks);
    
            const organizedAccountsActivity = stringifyValueField(_organizedAccountsActivity);
            
            const newStarknetDay = await StarknetDayModel.findByIdAndUpdate(
                starknetDay._id, 
                { 
                    sortedContractsActivity,
                    organizedAccountsActivity: organizedAccountsActivity
                },
                { new: true }
            );
    
            return { newStarknetDay };
            // super.sendUpdateSuccessful({ newStarknetDay });
        } catch(error) {
            super.sendError(error);
        }
    }

    async updateStarknetDayWithAccounts(starknetDay: AnyMongooseQuery) {
        try {
            const blocks = mongooseMapToPOJO(starknetDay.blocks);
            const sortedContractsActivity = mongooseMapToPOJO(starknetDay.sortedContractsActivity);
    
            const _organizedAccountsActivity = await fetchAccountsActivityFromContractsActivity(blocks, sortedContractsActivity);
            const organizedAccountsActivity = stringifyValueField(_organizedAccountsActivity);

            const newStarknetDay = await StarknetDayModel.findByIdAndUpdate(
                starknetDay._id, 
                { organizedAccountsActivity },
                { new: true }
            );
    
            return { newStarknetDay }
            // super.sendUpdateSuccessful({ newStarknetDay });
        } catch(error) {
            console.log(error)
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
            
            // super.sendUpdateSuccessful({ newStarknetDay });
            return { newStarknetDay }
        } catch(error) {
            super.sendError(error);
        }
    }

    async deleteStarknetDay(date: string) {
        const starknetDay = await this.findStarknetDay(date);
        await StarknetDayModel.findByIdAndDelete(starknetDay._id);
    }

    async deleteField(date: string, field: string) {
        try {
            const _starknetDay = await this.findStarknetDay(date);

            const newStarknetDay = await StarknetDayModel.findByIdAndUpdate(
                _starknetDay._id, 
                { $unset: { [field]: 1 } },
                { new: true }
            );

            return { newStarknetDay };
        } catch(error) {
            super.sendError(error);
        }
    }
}