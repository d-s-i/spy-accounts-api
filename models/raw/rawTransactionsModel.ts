import mongoose from "mongoose";

const rawTransactionsSchema = new mongoose.Schema({
        contract_address: {
            type: String,
            required: [true, "A raw transaction must have a contract address"]
        },
        entry_point_selector: String,
        entry_point_type: String,
        calldata: {
            type: [String],
            required: [true, "A raw transaction must have a calldata"]
        },
        signature: {
            type: [String],
            required: [true, "A raw transaction must have a signature"]
        },
        transaction_hash: {
            type: String,
            required: [true, "A raw transaction must have a transaction hash"]
        },
        max_fee: String,
        type: {
            type: String,
            required: [true, "A raw transaction must have a type"]
        }
});

export const RawTransactionsModel = mongoose.model("RawTransactionsModel", rawTransactionsSchema);