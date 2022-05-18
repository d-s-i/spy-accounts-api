import { OnChainHelper } from "./OnChainHelper";
import { TransactionCallOrganizer } from "starknet-analyzer/lib/organizers/TransactionCallOrganizer";
import { FunctionCall } from "starknet-analyzer/src/types/organizedStarknet";
import { ContractData, ContractDataTree, BlocksTree } from "./types.d";

import { Provider } from "starknet";

export class AccountAnalyzer extends OnChainHelper {

    private _sortedContractsActivity: ContractDataTree;
    private _organizedAccountsActivity: ContractDataTree;
    
    constructor(provider: Provider, blocks?: BlocksTree) {
        super(provider, blocks);
        this._sortedContractsActivity = {};
        this._organizedAccountsActivity = {};
    }
    
    async getTopAccountsFromBlockNumbers(startBlockNumber: number, endBlockNumber: number) {
        
        console.log(`\nStarting at ${startBlockNumber} and ending at ${endBlockNumber} (${endBlockNumber - startBlockNumber} blocks total)`);

        const allTransactions = await super._getAllTransactionsWithinBlockRange(startBlockNumber, endBlockNumber);
            
        const contractsActivity = super._getContractActivity(allTransactions);
    
        this._sortedContractsActivity = this._sortContractsPerActivity(contractsActivity);
    
        console.log("Done getting top accounts.");
        return this;
    }

    async organizeTransactionsForAccounts(amount: number, _sortedAccountsActivity?: ContractDataTree) {
        const sortedContractsActivity = this._getSortedContractsActivity(_sortedAccountsActivity); 
        let organizedSortedAccountsActivity: Required<ContractDataTree> = {};
        
        const transactionCallOrganizer = new TransactionCallOrganizer(this.provider);
    
        let i = 0;
        for(const key in sortedContractsActivity) {
            if(sortedContractsActivity[key].type === "GENERAL_CONTRACT") continue;
            if(i >= amount) break;
            const organizedTxs = await this.organizeTransactionsForAccount(sortedContractsActivity[key], transactionCallOrganizer);
            organizedSortedAccountsActivity[key] = { ...sortedContractsActivity[key], organizedTransactions: organizedTxs };
            i++;
        }
    
        this._organizedAccountsActivity = organizedSortedAccountsActivity;
        return this;
    }

    async organizeTransactionsForAccount(account: ContractData, _transactionCallOrganizer?: TransactionCallOrganizer) {
        const transactionCallOrganizer = _transactionCallOrganizer ? _transactionCallOrganizer : new TransactionCallOrganizer(this.provider);
        let organizedTx: FunctionCall[] = [];
        for(const tx of account.rawTransactions) {
            const _organizedTx = await transactionCallOrganizer.getCalldataPerCallFromTx(tx);
            if(_organizedTx) {
                organizedTx.push(..._organizedTx);
            }
        }
        return organizedTx;
    }
    
    displayAccountData(
        _organizedTxPerAccount: Required<ContractDataTree>, 
        amount: number
    ) {

        let organizedTxPerAccount: Required<ContractDataTree> = {};
        for(const key in _organizedTxPerAccount) {
            if(_organizedTxPerAccount[key].organizedTransactions) {
                organizedTxPerAccount[key] = _organizedTxPerAccount[key];
            }
        }
        
        let i = 0;
        for(const key in organizedTxPerAccount) {
            if(i >= amount) break;

            console.log("\n---------------------------------------------");
            console.log(`${key} - ${_organizedTxPerAccount[key].transactionCount} transactions - ${_organizedTxPerAccount[key].type}`);
            let functionCalls: { [accountAddress: string]: { [fnName: string]: { amount: number, addresses: string[] } } } = {};
            for(const tx of organizedTxPerAccount[key].organizedTransactions!) {
                if(!functionCalls[key] || !functionCalls[key][tx.name]) {
                    if(!functionCalls[key]) {
                        functionCalls[key] = {};
                    }
                    functionCalls[key] = { ...functionCalls[key], [tx.name]: { amount: 1, addresses: [tx.to.toHexString()] } };
                } else {
                    const addresses = functionCalls[key][tx.name].addresses.includes(tx.to.toHexString()) ? functionCalls[key][tx.name].addresses : [...functionCalls[key][tx.name].addresses, tx.to.toHexString()];
                    functionCalls[key][tx.name] = { amount: functionCalls[key][tx.name].amount + 1, addresses };
                }
            }
            console.log(functionCalls[key]);
            i++;
        } 
    }
    
    _sortContractsPerActivity(contractInteractions: ContractDataTree) {
        const sortedContractsArray = Object.entries(contractInteractions).sort(([, amountA], [, amountB]) => {
            return amountB.transactionCount - amountA.transactionCount;
        });
        let sortedContractsObject: ContractDataTree = {};
        for(const [addr, object] of sortedContractsArray) {
            sortedContractsObject[addr] = object;
        }
    
        return sortedContractsObject;
    }

    _getSortedContractsActivity(_sortedContractsActivity?: ContractDataTree) {
        return _sortedContractsActivity ? _sortedContractsActivity : this.sortedContractsActivity; 
    }

    get sortedContractsActivity() {
        return this._sortedContractsActivity;
    }

    get organizedAccountsActivity() {
        return this._organizedAccountsActivity;
    }
    
}