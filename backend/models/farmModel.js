import mongoose from "mongoose";

const farmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: True
    },
}, {
    timestamps: true
});

const Farm = mongoose.model("Farm", farmSchema);

export default Farm;