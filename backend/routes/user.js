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
    const { username, password, firstName, lastName } = signupBody.parse(req.body);
    const user = new User({ username, password, firstName, lastName });
    await user.save();
    res.send({ message: "User created" });
});


export default userRouter;