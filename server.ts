import app from "./app";
import { AddressInfo }  from "node:net";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const DB = process.env.DB!.replace("<PASSWORD>", process.env.DB_PASS!);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(connection => {
    console.log("DB connection successful! :D");
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    const { port } = server.address() as AddressInfo;
    console.log("PORT: ", PORT, "process.env.PORT", process.env.PORT);
    console.log(`App listening on port ${port}` );
});