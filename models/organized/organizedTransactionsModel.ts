import mongoose from "mongoose";
import { BigNumberModel } from "../utils/BigNumberModel";
import { OrganizedFunctionCallModel } from "./organizedFunctionCallModel";

const organizedTransactionsSchema = new mongoose.Schema({
    name: String,
    to: BigNumberModel.schema,
    calldata: [OrganizedFunctionCallModel.schema]
    // calldata: String
});

export const OrganizedTransactionsModel = mongoose.model("OrganizedTransactionsModel", organizedTransactionsSchema);