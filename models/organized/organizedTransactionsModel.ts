import mongoose from "mongoose";
import { BigNumberModel } from "../utils/BigNumberModel";
import { OrganizedCalldataModel } from "./OrganizedCalldataModel";

const organizedTransactionsSchema = new mongoose.Schema({
    name: String,
    to: BigNumberModel.schema,
    calldata: [OrganizedCalldataModel.schema]
});

export const OrganizedTransactionsModel = mongoose.model("OrganizedTransactionsModel", organizedTransactionsSchema);