import mongoose from "mongoose";
import { RawTransactionsModel } from "./rawTransactionsModel";

const sortedContractActivitySchema = new mongoose.Schema({
    transactionCount: {
        type: Number,
        required: [true, "An active account must have a transaction count"]
    },
    type: {
        type: String,
        required: [true, "An active account must have an account type"]
    },
    rawTransactions: {
        type: [RawTransactionsModel.schema],
        required: [true, "An active account must have an array of raw transactions"]
    }
});

export const SortedContractActivityModel = mongoose.model("SortedContractActivityModel", sortedContractActivitySchema);
