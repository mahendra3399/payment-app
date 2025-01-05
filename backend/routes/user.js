import express from "express";
import zod from "zod";
import { User } from "../models/user.model.js";
import { JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(4),
    firstName: zod.string().min(1).max(20),
    lastName: zod.string().min(1).max(20),
})

userRouter.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ error: "Invalid request body" });
    }
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
    }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;
    const token = jwt.sign({ userId}, JWT_SECRET);
    res.status(201).json({ 
        message: "User created successfully",
        token,
     });
});


export default userRouter;