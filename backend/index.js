import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import cors from "cors";

import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
app.get("*", (req, res) => {
res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port: ", PORT);
});