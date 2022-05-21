import mongoose from "mongoose";
import { BigNumberModel } from "../utils/BigNumberModel";
import { OrganizedArgumentModel } from "./organizedArgumentModel";

const organizedFunctionCallSchema = new mongoose.Schema({
    name: String,
    to: BigNumberModel.schema,
    calldata: [OrganizedArgumentModel.schema]
    // FunctionCall: String
});

export const OrganizedFunctionCallModel = mongoose.model("OrganizedFunctionCallModel", organizedFunctionCallSchema);