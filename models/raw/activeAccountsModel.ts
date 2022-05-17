import mongoose from "mongoose";
import { RawTransactionsModel } from "./rawTransactionsModel";

const activeAccountsSchema = new mongoose.Schema({
    accountAddress: {
        type: String,
        required: [true, "An active account must have an address"]
    },
    transactionCount: {
        type: Number,
        required: [true, "An active account must have a transaction count"]
    },
    accountType: {
        type: String,
        required: [true, "An active account must have an account type"]
    },
    rawTransactions: {
        type: [RawTransactionsModel.schema],
        required: [true, "An active account must have an array of raw transactions"]
    }
});

export const ActiveAccountsModel = mongoose.model("ActiveAccountsModel", activeAccountsSchema);
