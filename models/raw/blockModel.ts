import mongoose from "mongoose";
import { RawTransactionsModel } from "./rawTransactionsModel";
import { RawTransactionReceiptModel } from "./rawTransactionReceiptModel";

const blockSchema = new mongoose.Schema({
    block_hash: {
        type: String,
        required: [true, "A block must have a block hash"]
    },
    parent_block_hash: {
        type: String,
        required: [true, "A block must have a parent block hash"]
    },
    block_number: {
        type: Number,
        required: [true, "A block must have a block number"]
    },
    state_root: {
        type: String,
        required: [true, "A block must have a state root"]
    },
    status: {
        type: String,
        // required: [true, "A block must have a statut"]
    },
    gas_price: {
        type: String,
        // required: [true, "A block must have a gas price"]
    },
    transactions: {
        type: [RawTransactionsModel.schema],
        required: [true, "A raw transaction must have transactions"]
    },
    timestamp: {
        type: Number,
        // required: [true, "A block must have a timestamp"]
    },
    sequencer_address: String,
    transaction_receipts: {
        type: [RawTransactionReceiptModel.schema],
        required: [true, "A raw transaction must have transactions receipts"]
    }
});

export const BlockModel = mongoose.model("BlockModel", blockSchema);