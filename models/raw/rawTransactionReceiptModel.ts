import mongoose from "mongoose";
import { ExecutionRessourcesModel } from "./executionRessourcesModel";

const rawTransactionReceiptSchema = new mongoose.Schema({
    transaction_index: {
        type: Number,
        // required: [true, "A transaction receipt must have a transaction index"]
    },
    transaction_hash: {
        type: String,
        // required: [true, "A transaction receipt must have a transaction hash"]
    },
    l2_to_l1_messages: Array,
    events: Array,
    execution_resources: {
        type: ExecutionRessourcesModel.schema,
        // required: [true, "A transaction receipt must have an execution ressources"]
    },
    actual_fee: {
        type: String,
        // required: [true, "A transaction receipt must have an actuall fee"]
    }
});

export const RawTransactionReceiptModel = mongoose.model("RawTransactionReceiptModel", rawTransactionReceiptSchema);

