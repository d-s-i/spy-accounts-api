import express from "express";

import { ApiResponses } from "../utils/api/ApiResponses";
import { 
    addYesterdayStarknetDay,
    getStarknetDay,
    deleteStarknetDay,
    getBlocksPerDate,
    getSortedContractsActivityPerDate,
    addBlocksPerDate,
    addSortedContractsActivityPerDate,
    getOrganizedAccountsActivityPerDate,
    deleteOrganizedAccounts,
    deleteYesterdayStarknetDay,
    getYesterdayStarknetDay
} from "../controllers/starknetDayController";

const starknetDayRouter = express.Router();

starknetDayRouter.route("/yesterday")
    .get(getYesterdayStarknetDay)
    .post(addYesterdayStarknetDay)
    .delete(deleteYesterdayStarknetDay);

starknetDayRouter.route("/:date")
    .get(getStarknetDay)
    .delete(deleteStarknetDay);

starknetDayRouter.route("/:date/blocks")
    .get(getBlocksPerDate)
    .post(addBlocksPerDate);

starknetDayRouter.route("/:date/sortedContractsActivity")
    .get(getSortedContractsActivityPerDate)
    .post(addSortedContractsActivityPerDate);
    
starknetDayRouter.route("/:date/organizedAccountsActivity")
    .get(getOrganizedAccountsActivityPerDate)
    .post(deleteOrganizedAccounts);

export default starknetDayRouter;