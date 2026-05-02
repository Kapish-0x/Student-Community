import { Schema , model } from "mongoose";

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    content: {
        type: String,
        required: [true , "What's on your mind?"],
        trim: true,
        maxLength: 1500
    },
    category: {
        type: String,
        enum: ["GENERAL", "SPORTS", "EVENTS", "CLUBS", "ACADEMIC", "HACKATHON"],
        default: "GENERAL"
    },
    department: {
        type: String //auto filled from the profile 
    },
    isHiringTeams: {
        type: Boolean,
        default: false
    },
    reports: [{type: Schema.Types.ObjectId , ref: "users"}],
    isBlocked: {
        type: Boolean,
        default: false
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "user" }], // Don't forget likes for the post too!
    comments: [{ type: Schema.Types.ObjectId, ref: "comment" }]
}, {timestamps: true});

export const PostModel = model("post" , postSchema);