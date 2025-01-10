import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import cors from "cors";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port: ", PORT);
});