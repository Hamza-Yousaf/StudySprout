import mongoose from "mongoose";

export const farmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Farm = mongoose.model("Farm", farmSchema);

export default Farm;