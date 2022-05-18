import express from "express";
import { 
    getStarknetDay,
    deleteStarknetDay,
    getBlocksPerDate,
    getSortedContractsActivityPerDate,
    addBlocksPerDate,
    addSortedContractsActivityPerDate,
    getOrganizedAccountsActivityPerDate
} from "../controllers/starknetDayController";

const starknetDayRouterPerDate = express.Router();

starknetDayRouterPerDate.route("/").get(getStarknetDay).delete(deleteStarknetDay);
starknetDayRouterPerDate.route("/blocks").get(getBlocksPerDate).post(addBlocksPerDate);
starknetDayRouterPerDate.route("/sortedContractActivity").get(getSortedContractsActivityPerDate).post(addSortedContractsActivityPerDate);
starknetDayRouterPerDate.route("/organizedAccountsActivity").get(getOrganizedAccountsActivityPerDate);

export default starknetDayRouterPerDate;