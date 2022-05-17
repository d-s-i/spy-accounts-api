import express from "express";
import {
    notImplemented
} from "../utils";
import { 
    addYesterdayStarknetDay,
    getStarknetDay
} from "../controllers/starknetDayController";

const starknetDayRouter = express.Router();

starknetDayRouter.route("/yesterday").get(notImplemented).post(addYesterdayStarknetDay);
starknetDayRouter.route("/:date").get(getStarknetDay);

export default starknetDayRouter;