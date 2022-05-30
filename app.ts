import express from "express";
import starknetDayRouter from "./routes/starknetDayRouter";

const app = express();
app.use(express.json());
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Origin", "https://vast-lowlands-69461.herokuapp.com");
    // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    next();
});

app.use("/api/v1/starknetDay", starknetDayRouter);

export default app;