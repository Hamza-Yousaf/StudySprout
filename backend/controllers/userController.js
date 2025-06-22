import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secret = process.env.SECRET;

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, secret, { expiresIn: "7d" });
};

export const createUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const user = req.body;
  const password = user.password;
  const email = user.email;

  const alreadyExists = await User.findOne({ email }).lean();

  if (alreadyExists) {
    return res.status(409).json({
      success: false,
      message: "Email is already linked to an account",
    });
  }

  const newUser = new User(user);

  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    newUser.password = hashedPassword;

    await newUser.save();

    const token = createToken(newUser._id);

    res
      .status(201)
      .json({
        success: true,
        message: "Successfully created a new user",
        token: token,
      });
  } catch (error) {
    console.error("Error in creating a user", error);
    res
      .status(500)
      .json({ success: false, message: "(Server Error) in creating a user" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "User not found" });
  }

  try {
    await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "User successfully deleted" });
  } catch (error) {
    console.error("Error in deleting user", error.message);
    res
      .status(500)
      .json({ success: false, message: "(Server Error) in deleting a user" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "User not found" });
  }

  try {
    await User.findByIdAndUpdate(id, user, { new: true });
    res
      .status(200)
      .json({ success: true, message: "User successfully updated" });
  } catch (error) {
    console.error("Error in updating user", error.message);
    res
      .status(500)
      .json({ success: false, message: "(Server Error) in updating a user" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  try {
    const user = await User.findById(id).lean();
    console.log(user);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error in fetching user", error.message);
    res
      .status(500)
      .json({ success: false, message: "(Server Error) in fetching a user" });
  }
};
