import mongoose from "mongoose";

const userLoginSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  loginDate: {
    type: String,
    required: true,
  },
  loginCount: {
    type: Number,
    default: 1,
  },
});

userLoginSchema.index({ userId: 1, loginDate: 1 }, { unique: true });

const UserLogin = mongoose.model("UserLogin", userLoginSchema);
export default UserLogin;
