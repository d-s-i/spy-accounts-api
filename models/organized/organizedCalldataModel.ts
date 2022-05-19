import mongoose from "mongoose";
import { BigNumberModel } from "../utils/BigNumberModel";

const organizedCalldataSchema = new mongoose.Schema({
    type: String
});

export const OrganizedCalldataModel = mongoose.model("OrganizedCalldataModel", organizedCalldataSchema);