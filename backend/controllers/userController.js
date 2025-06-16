import User from '../models/userModel.js';

export const createUser = async (req, res) => {
    const user = req.body;

    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json({ success: true, message: "Successfully created a new user"});
    } catch (error) {
        console.error("Error in creating a user", error.message);
        res.status(500).json({ success: false, message: "(Server Error) in creating a user"});
    }
};