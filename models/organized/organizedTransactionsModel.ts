import mongoose from "mongoose";
import { BigNumberModel } from "../utils/BigNumberModel";
import { OrganizedFunctionCallModel } from "./organizedFunctionCallModel";

const organizedTransactionsSchema = new mongoose.Schema({
    name: String,
    to: BigNumberModel.schema,
    calldata: [OrganizedFunctionCallModel.schema]
});

export const OrganizedTransactionsModel = mongoose.model("OrganizedTransactionsModel", organizedTransactionsSchema);