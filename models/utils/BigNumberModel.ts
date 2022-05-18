import mongoose from "mongoose";

const bigNumberSchema = new mongoose.Schema({
    type: String,
    hex: String,
    _hex: String,
    _isBigNumber: Boolean
});

export const BigNumberModel = mongoose.model("BigNumber", bigNumberSchema);