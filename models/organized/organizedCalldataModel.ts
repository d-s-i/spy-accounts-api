import mongoose from "mongoose";
import { BigNumberModel } from "../utils/BigNumberModel";
import { OrganizedFunctionCallModel } from "./organizedFunctionCallModel";

const organizedCalldataSchema = new mongoose.Schema({
    name: String,
    type: String,
    value: [OrganizedFunctionCallModel.schema]
});

export const OrganizedCalldataModel = mongoose.model("OrganizedCalldataModel", organizedCalldataSchema);