import express from "express";
import zod from "zod";
import  User  from "../models/user.model.js";
import  Account  from "../models/account.model.js";
import { JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken";
import  authMiddleware  from "../middleware.js";

const userRouter = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(4),
    firstName: zod.string().min(1).max(20),
    lastName: zod.string().min(1).max(20),
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(4)
})

const updateBody = zod.object({
    username: zod.string().email().optional(),
    password: zod.string().min(4).optional(),
    firstName: zod.string().min(1).max(20).optional(),
    lastName: zod.string().min(1).max(20).optional(),
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
    
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000,
    });

    const token = jwt.sign({ userId}, JWT_SECRET);
    
    res.status(201).json({ 
        message: "User created successfully",
        token,
     });
});

userRouter.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if(!success) {
        return res.status(400).json({ error: "Invalid request body"});
    }
    const user = User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if(!user) {
        return res.status(401).json({error: "Invalid username or password"});
    }
    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);
   
    res.status(200).json({
        message: "User signed in successfully",
        token,
    });
    return;
})

userRouter.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if(!success) {
        return res.status(411).json({ error: "Invalid request body"});
    }
    await User.updateOne({ _id: req.userId }, req.body);
    res.status(200).json({ message: "User updated successfully"});
})

userRouter.get("/bulk", async (req,res)=> {
    const filter = req.query.filter || "";
    
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

export default userRouter;