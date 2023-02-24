import mongoose from "mongoose";
import activitySchema from "./activityModel.js";

const issueSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    labels: {
        type: [String],
        default: [],
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Project",
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    activity: {
        type: [activitySchema],
        default: [],
    },
    isFixed: {
        type: Boolean,
        default: true,
    },
});
