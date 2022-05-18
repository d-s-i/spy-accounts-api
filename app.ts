import express from "express";
import starknetDayRouter from "./routes/starknetDayRouter";
import starknetDayRouterPerDate from "./routes/starknetDayRouterPerDate";

const app = express();
app.use(express.json());

app.use("/api/v1/starknetDay", starknetDayRouter);
app.use("/api/v1/starknetDay/:date", starknetDayRouterPerDate);

export default app;