import mongoose from "mongoose";

const organizedArgumentSchema = new mongoose.Schema({
    name: String,
    type: String,
    value: String
});

export const OrganizedArgumentModel = mongoose.model("organizedArgumentModel", organizedArgumentSchema);