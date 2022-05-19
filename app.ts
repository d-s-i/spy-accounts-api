import express from "express";
import starknetDayRouter from "./routes/starknetDayRouter";

const app = express();
app.use(express.json());

app.use("/api/v1/starknetDay", starknetDayRouter);

export default app;