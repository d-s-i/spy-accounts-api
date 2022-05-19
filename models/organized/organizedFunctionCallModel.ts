import mongoose from "mongoose";
import { OrganizedCalldataModel } from "./organizedCalldataModel";

// const organizedFunctionCallSchema = new mongoose.Schema({
//     name: String,
//     type: String,
//     value: OrganizedCalldataModel.schema
// });
const organizedFunctionCallSchema = new mongoose.Schema({
    name: String,
    type: String,
    value: String
});

export const OrganizedFunctionCallModel = mongoose.model("organizedFunctionCallModel", organizedFunctionCallSchema);