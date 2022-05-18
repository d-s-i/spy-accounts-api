import mongoose from "mongoose";
import { BigNumberModel } from "../utils/BigNumberModel";

const organizedCalldataSchema = new mongoose.Schema({
    type: mongoose.Schema.Types.Mixed
});

export const OrganizedCalldataModel = mongoose.model("OrganizedCalldataModel", organizedCalldataSchema);