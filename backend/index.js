import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import userRouter from "./routes/user.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use("/api/v1", router);
app.use("/api/v1/user", userRouter);

const PORT = process.env.PORT || 5000;


app.listen(5000, () => {
    connectDB();
    console.log("Server is running on port: ", PORT);
});