import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

export const Todo = mongoose.model("Tood", todoSchema);