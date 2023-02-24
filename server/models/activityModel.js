import mongoose from "mongoose";

const activitySchema = mongoose.Schema(
    {
        statement: {
            type: String,
            required: true,
        },
        editor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    { timestamps: true }
);
