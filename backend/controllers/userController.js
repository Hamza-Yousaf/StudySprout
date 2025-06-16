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