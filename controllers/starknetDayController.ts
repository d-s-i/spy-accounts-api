import express from "express";
import { StarknetDayModel } from "../models/starknetDayModel";

import { defaultProvider } from "starknet";

import { sendError } from "../utils";
import { AccountAnalyzer } from "../utils/AccountAnalyzer/AccountAnalyzer";
import { ContractData } from "../utils/types";
import { GetBlockResponse } from "starknet-analyzer/src/types/rawStarknet";

export const addYesterdayStarknetDay = async function(req: express.Request, res: express.Response) {
    try {
        let starknetDay;
        try {
            starknetDay = await StarknetDayModel.findOne({ 
                date: { 
                    $gte: new Date(Date.now()).setHours(0,0,0), 
                    $lt: new Date(Date.now()).setHours(23,59,59) 
                } 
            });
        } catch(error) {}

        if(!starknetDay) {
            console.log("No starknetDay found, fetching block");
            const date = Date.now();

            const accountAnalyzer = new AccountAnalyzer(defaultProvider);
            const [startBlockNumber, latestBlockNumber] = await accountAnalyzer.getYesterdayBlockRange();
            const sortedAccountsActivity = (
                await accountAnalyzer.getTopAccountsFromBlockNumbers(startBlockNumber, startBlockNumber + 1)
            ).sortedContractActivity;
            console.log("Done fetching transactions, now organizing accounts");

            const organizedSortedAccountsActivity = (
                await accountAnalyzer.organizeTransactionsForAccounts(15, sortedAccountsActivity)
            ).organizedContractActivity;

            let blocksArray: GetBlockResponse[] = [];
            for(const key in accountAnalyzer.blocks) {
                blocksArray.push(accountAnalyzer.blocks[key]);
            }

            let sortedAccountActivityArray: (ContractData & { accountAddress: string, accountType: string })[] = [];
            for(const key in sortedAccountsActivity) {
                sortedAccountActivityArray.push({ ...sortedAccountsActivity[key], accountType: sortedAccountsActivity[key].type, accountAddress: key });
            }

            let organizedSortedAccountsActivityArray: (ContractData & { accountAddress: string, accountType: string })[] = [];
            for(const key in organizedSortedAccountsActivity) {
                organizedSortedAccountsActivityArray.push({
                    ...organizedSortedAccountsActivity[key],
                    accountType: sortedAccountsActivity[key].type,
                    accountAddress: key 
                });
            }

            console.log("organizedSortedAccountsActivityArray", organizedSortedAccountsActivityArray.forEach(acc => {
                acc.organizedTransactions?.forEach(tx => {
                    console.log(tx.calldata);
                });
            }));
            console.log("creating new starknetDay");
            
            const starknetDay = await StarknetDayModel.create({ 
                date, 
                blocks: blocksArray,
                activeAccounts: sortedAccountActivityArray,
                organizedActiveAccounts: organizedSortedAccountsActivityArray
            });

            res.status(201).json({
                status: "success",
                data: { starknetDay }
            });
            console.log("done");
        } else {
            res.status(208).json({
                status: "already-queried",
                message: "Document already present in the database at this date"
            });
        }
    } catch(error: any) {
        console.log(error);
        sendError(res, error.toString());
    }
}

export const getStarknetDay = async function(req: express.Request, res: express.Response) {
    try {
        const starknetDay = await StarknetDayModel.findOne({ 
            date: { 
                $gte: new Date(req.params.date).setHours(0,0,0), 
                $lt: new Date(req.params.date).setHours(23,59,59) 
            } 
        });

        res.status(200).json({
            status: "success",
            data: { starknetDay }
        });

    } catch(error: any) {
        sendError(res, error.toString());
    }
}