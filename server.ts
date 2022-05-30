import app from "./app";
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
    console.log(`App listening on port`, server.address());
});