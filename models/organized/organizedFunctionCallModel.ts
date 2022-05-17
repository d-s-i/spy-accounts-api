import mongoose from "mongoose";
import { BigNumberModel } from "../utils/BigNumberModel";

const organizedFunctionCallSchema = new mongoose.Schema({
    type: mongoose.Schema.Types.Map,
    of: {
        type: mongoose.Schema.Types.Mixed
    }
});

export const OrganizedFunctionCallModel = mongoose.model("OrganizedFunctionCallModel", organizedFunctionCallSchema);