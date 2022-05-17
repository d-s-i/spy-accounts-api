import mongoose from "mongoose";
import { RawTransactionsModel } from "../raw/rawTransactionsModel";
import { OrganizedTransactionsModel } from "./organizedTransactionsModel";

const organizedActiveAccountsSchema = new mongoose.Schema({
    accountAddress: {
        type: String,
        required: [true, "An active account must have an address"]
    },
    transactionCount: {
        type: Number,
        required: [true, "An organized active account must have a transaction count"]
    },
    accountType: {
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

export const OrganizedActiveAccountsModel = mongoose.model("OrganizedActiveAccountsModel", organizedActiveAccountsSchema);