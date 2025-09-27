import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import UserLogin from "../models/userLoginModel.js";
import dayjs from "dayjs";

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

    res.status(201).json({
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.error("Error in creating a user", error);
    res
      .status(500)
      .json({ success: false, message: "(Server Error) in creating a user" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).lean();

  if (!user) {
    return res
      .status(500)
      .json({ success: false, message: "User does not exist" });
  }

  try {
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res
        .status(409)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = createToken(user._id);

    const today = dayjs().format("YYYY-MM-DD");
    await UserLogin.updateOne(
      { userId: user._id, loginDate: today },
      { $inc: { loginCount: 1 } },
      { upsert: true }
    );

    res.status(200).json({ user: user, token: token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error when trying to login" });
  }
};

export const getUserLogins = async (req, res) => {
  const { id } = req.params;

  try {
    const logins = await UserLogin.find({ userId: id })
      .sort({ loginDate: 1 })
      .lean();

    res.status(200).json({ success: true, data: logins });
  } catch (error) {
    console.error("Error in fetching logins", error.message);
    res
      .status(500)
      .json({ success: false, message: "(Server Error) in fetching logins" });
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
