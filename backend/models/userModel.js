import mongoose from "mongoose";
// import { farmSchema } from "./farmModel.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    totalXP: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
    // farm: farmSchema,
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);

export default User;