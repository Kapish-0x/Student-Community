import { Schema , model } from "mongoose";

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true,
        enum: ["CSE" , "IT" , "DS" , "AI" , "CS" , "AIML" , "MECH" , "CIVIL" , "ECE"],
        uppercase: true,
    },
    year: {
        type: Number,
        required: true,
        min: 1,
        max: 4
    },
    bio: {
        type: String,
        maxLength: 1000,
        default: "Student at Anurag University"
    },
    Skills: {
        type: [String],
        default:[],
    },
    socialLinks: {
        github: {type: String , default: ""},
        linkedin: {type: String, default: ""},
        portfolio: {type: String, default: ""}
    },
    isOpenForTeams: {
        type: Boolean,
        default: true,
    }

}
, {timestamps: true}
);

export const ProfileModel = model("profile" , profileSchema);