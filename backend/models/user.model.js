import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
        lowercase: true,
        maxLength: 20
    }, 
    password: {
        type: String,
        required: true,
        minLength: 4
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 20
    },
});

const User = mongoose.model("User", userSchema);

export default User;