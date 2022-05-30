import mongoose from "mongoose";
import { OrganizedFunctionCallModel } from "./organizedFunctionCallModel";

const organizedTransactionSchema = new mongoose.Schema({
    transactionHash: String,
    organizedFunctionCalls: [OrganizedFunctionCallModel.schema]
});

export const OrganizedTransactionModel = mongoose.model("OrganizedTransactionModel", organizedTransactionSchema);