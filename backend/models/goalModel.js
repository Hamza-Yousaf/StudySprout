import mongoose, { mongo } from "mongoose";

const goalSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
