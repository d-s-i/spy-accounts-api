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
    getOrganizedAccountsActivityPerDate
} from "../controllers/starknetDayController";

const starknetDayRouter = express.Router();

starknetDayRouter.route("/yesterday").get((req: any, res: express.Response) => {
    new ApiResponses(res).sendNotImplemented();
}).post(addYesterdayStarknetDay);

starknetDayRouter.route("/:date").get(getStarknetDay).delete(deleteStarknetDay);
starknetDayRouter.route("/:date/blocks").get(getBlocksPerDate).post(addBlocksPerDate);
starknetDayRouter.route("/:date/sortedContractsActivity").get(getSortedContractsActivityPerDate).post(addSortedContractsActivityPerDate);
starknetDayRouter.route("/:date/organizedAccountsActivity").get(getOrganizedAccountsActivityPerDate);

export default starknetDayRouter;