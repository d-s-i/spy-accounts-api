import { defaultProvider } from "starknet";

import { AccountAnalyzer } from "../utils/AccountAnalyzer/AccountAnalyzer";
import { BlocksTree, ContractDataTree } from "../utils/AccountAnalyzer/types";
import { RPCProvider } from "./RPCProvider/RPCProvider";

const URL = "http://127.0.0.1:9545";
const provider = new RPCProvider(URL);

export const fetchBlocksAndContractsAndAccounts = async function() {
    const accountAnalyzer = new AccountAnalyzer(provider);
    const [startBlockNumber, latestBlockNumber] = await accountAnalyzer.getYesterdayBlockRange();
    const sortedContractsActivity = (
        await accountAnalyzer.getTopAccountsFromBlockNumbers(startBlockNumber, latestBlockNumber)
    ).sortedContractsActivity;

    const organizedAccountsActivity = (
        await accountAnalyzer.organizeTransactionsForAccounts(15, sortedContractsActivity)
    ).organizedAccountsActivity;

    return { 
        blocks: accountAnalyzer.blocks, 
        sortedContractsActivity,
        organizedAccountsActivity
    };
}

const getRangeFromBlockTree = function(blocks: BlocksTree) {
    const start = parseFloat(Object.keys(blocks)[0]);
    const end = parseFloat(Object.keys(blocks)[Object.keys(blocks).length - 1]);
    return { start, end };
}

export const fetchContractsActivityAndBlocks = async function() {
    const accountAnalyzer = new AccountAnalyzer(provider);
    const [startBlockNumber, latestBlockNumber] = await accountAnalyzer.getYesterdayBlockRange();

    const sortedContractsActivity = (await accountAnalyzer.getTopAccountsFromBlockNumbers(
        startBlockNumber,
        latestBlockNumber
    )).sortedContractsActivity;

    return { blocks: accountAnalyzer.blocks, sortedContractsActivity };
}

export const fetchContractsAndAccountsActivityFromBlocks = async function(blocks: BlocksTree) {

    const { start, end } = getRangeFromBlockTree(blocks);
    
    const accountAnalyzer = new AccountAnalyzer(defaultProvider, blocks);

    const sortedContractsActivity = (
        await accountAnalyzer.getTopAccountsFromBlockNumbers(start, end)
    ).sortedContractsActivity;
    const organizedAccountsActivity = (
        await accountAnalyzer.organizeTransactionsForAccounts(15, sortedContractsActivity)
    ).organizedAccountsActivity;

    return {
        sortedContractsActivity,
        organizedAccountsActivity
    };
}

export const fetchAccountsActivityFromContractsActivity = async function(
    blocks: BlocksTree,
    sortedAccountsActivity: ContractDataTree
) {
    const accountAnalyzer = new AccountAnalyzer(defaultProvider, blocks);
    
    const organizedAccountsActivity = (
        await accountAnalyzer.organizeTransactionsForAccounts(15, sortedAccountsActivity)
    ).organizedAccountsActivity;

    return organizedAccountsActivity;
}

export const fetchContractsActivityFromBlocks = async function(blocks: BlocksTree) {
    const accountAnalyzer = new AccountAnalyzer(defaultProvider, blocks);
    const { start, end } = getRangeFromBlockTree(blocks);
    const sortedContractsActivity = (
        await accountAnalyzer.getTopAccountsFromBlockNumbers(start, end)
    ).sortedContractsActivity;

    return sortedContractsActivity;
}