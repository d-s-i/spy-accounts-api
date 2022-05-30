import { RequestManager, HTTPTransport, Client } from "@open-rpc/client-js";
import { BigNumberish } from "starknet/utils/number";
import { getSelectorFromName } from "starknet/utils/hash";

export class RPCProvider {

    private _transport: HTTPTransport;
    private _client: Client;

    constructor(url: string) {
        this._transport = new HTTPTransport(url);
        this._client = new Client(new RequestManager([this._transport]));
    }

    async getLatestBlockNumber() {
        return this.request("starknet_blockNumber", []);
    }
    
    async getBlock(blockNumber: number | string) {
        const _block = await this.request("starknet_getBlockByNumber", [+blockNumber]);

        let transactions = [];
        let transaction_receipts = [];
        for(const txHash of _block.transactions) {
            const tx = await this.getTransaction(txHash);
            const receipt = await this.getTransactionReceipt(txHash);
            transactions.push(tx);
            transaction_receipts.push(receipt);
        }
        return {
            ..._block,
            transactions,
            transaction_receipts
        }
    }

    async getTransactionReceipt(txHash: BigNumberish) {
        const receipt = await this.request("starknet_getTransactionReceipt", [txHash]);
        return receipt;
    }

    async getTransaction(txHash: BigNumberish) {
        const transaction = await this.request("starknet_getTransactionByHash", [txHash]);
        transaction.transaction_hash = transaction.txn_hash;
        delete transaction.txn_hash;
        return transaction;
    };

    async getCode(contractAddress: string) {
        const { bytecode, abi: _abi } = await this.request("starknet_getCode", [contractAddress]);
        return { bytecode, abi: JSON.parse(_abi) };
    }

    async callContract({
        contractAddress,
        entrypoint,
        calldata
    }: { contractAddress: string, entrypoint: string, calldata?: any }, _blockHash?: string) {
        let blockHash = _blockHash;
        if(!blockHash) {
            const lastBlockNumber = await this.getLatestBlockNumber();
            blockHash = (await this.getBlock(lastBlockNumber)).block_hash;
        }
        const _res = await this.request("starknet_call", [{
            contract_address: contractAddress,
            entry_point_selector: getSelectorFromName(entrypoint),
            calldata: calldata || []
        }, blockHash]);
        return { result: _res };
    }

    async request(method: string, params: any[]) {
        const result = await this._client.request({
            method: method, 
            params: params
        });
        return result;
    }
    
}