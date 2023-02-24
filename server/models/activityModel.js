import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        action: {
            type: String,
            required: true,
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamp: true }
);

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;
