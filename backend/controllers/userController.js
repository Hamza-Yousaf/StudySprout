import mongoose from 'mongoose';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const user = req.body;
    const password = user.password;

    const newUser = new User(user);

    try {
        const hashedPassword = await bcrypt.hash(password, salt);
        newUser.password = hashedPassword;

        await newUser.save();
        res.status(201).json({ success: true, message: "Successfully created a new user"});
    } catch (error) {
        console.error("Error in creating a user", error.message);
        res.status(500).json({ success: false, message: "(Server Error) in creating a user"});
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success: false, message: "User not found"})
    }

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User successfully deleted"});
    } catch (error) {
        console.error("Error in delete user", error.message);
        res.status(500).json({ success: false, message: "(Server Error) in deleting a user"});
    }
}