import mongoose from "mongoose";
import { OrganizedCalldataModel } from "./organizedCalldataModel";

const organizedFunctionCallSchema = new mongoose.Schema({
    name: String,
    type: String,
    value: OrganizedCalldataModel.schema
});

export const OrganizedFunctionCallModel = mongoose.model("organizedFunctionCallModel", organizedFunctionCallSchema);