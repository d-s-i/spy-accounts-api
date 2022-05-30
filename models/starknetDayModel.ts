import mongoose from "mongoose";
import { BlockModel } from "./raw/blockModel";
import { SortedContractActivityModel } from "./raw/sortedContractActivityModel";
import { OrganizedAccountsActivityModel } from "./organized/organizedAccountsActivityModel";

const starknetDaySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, "A StarkNet day must have a date"]
    },
    blocks: {
        type: mongoose.Schema.Types.Map,
        of: {
            type: BlockModel.schema
        },
        // required: [true, "A StarkNet day must have an array of blocks"]
    },
    sortedContractsActivity: {
        type: mongoose.Schema.Types.Map,
        of: {
            type: SortedContractActivityModel.schema
        }
    },
    organizedAccountsActivity: {
        type: mongoose.Schema.Types.Map,
        of: {
            type: OrganizedAccountsActivityModel.schema
        }
    }
});

export const StarknetDayModel = mongoose.model("StarknetDayModel", starknetDaySchema);