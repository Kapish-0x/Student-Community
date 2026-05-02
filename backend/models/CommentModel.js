import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "post",
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true,
        maxLength: 500
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "user" }]
}, { timestamps: true });

export const CommentModel = model("comment", commentSchema);