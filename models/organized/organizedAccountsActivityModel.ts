import mongoose from "mongoose";
import { RawTransactionsModel } from "../raw/rawTransactionsModel";
import { OrganizedTransactionsModel } from "./organizedTransactionsModel";

const organizedAccountsActivitySchema = new mongoose.Schema({
    transactionCount: {
        type: Number,
        required: [true, "An organized active account must have a transaction count"]
    },
    type: {
        type: String,
        required: [true, "An organized active account must have an account type"]
    },
    rawTransactions: {
        type: [RawTransactionsModel.schema],
        required: [true, "An organized active account must have an array of raw transactions"]
    },
    organizedTransactions: {
        type: [OrganizedTransactionsModel.schema],
        required: [true, "An organized active account must have an array of organized transactions"]
    }
});

export const OrganizedAccountsActivityModel = mongoose.model("OrganizedAccountsActivityModel", organizedAccountsActivitySchema);