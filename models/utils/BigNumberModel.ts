import mongoose from "mongoose";

const bigNumberSchema = new mongoose.Schema({
    type: {
        type: String,
        // required: [true, "A big number must have a type"]
    },
    hex: {
        type: String,
        // required: [true, "A big number must have a hex value"]
    },
    _hex: {
        type: String
    },
    _isBigNumber: Boolean
});

export const BigNumberModel = mongoose.model("BigNumber", bigNumberSchema);