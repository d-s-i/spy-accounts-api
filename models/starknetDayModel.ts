import mongoose from "mongoose";
import { BlockModel } from "./raw/blockModel";
import { ActiveAccountsModel } from "./raw/activeAccountsModel";
import { OrganizedActiveAccountsModel } from "./organized/organizedActiveAccountsModel";

const starknetDaySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, "A StarkNet day must have a date"]
    },
    blocks: {
        type: [BlockModel.schema],
        required: [true, "A StarkNet day must have an array of blocks"]
    },
    activeAccounts: {
        type: [ActiveAccountsModel.schema],
    },
    organizedActiveAccounts: {
        type: [OrganizedActiveAccountsModel.schema],
    }
});

export const StarknetDayModel = mongoose.model("StarknetDayModel", starknetDaySchema);