import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { PostModel } from "../models/PostModel.js";
import { ProfileModel } from "../models/ProfileModel.js";

export const createPost = async (req, res) => {
    try {
        const { content, category, postType, isHiringTeams } = req.body;
        
        // 1. Check if a file was actually uploaded
        let mediaUrl = "";
        if (req.file) {
            mediaUrl = await uploadOnCloudinary(req.file.path);
        }

        //2 Fetch the user's department from their profile
        const userProfile = await ProfileModel.findOne({ user: req.user.id });
        if (!userProfile) {
            return res.status(404).json({ message: "Complete your profile first!" });
        }

        // 3. Save the post
        const newPost = new PostModel({
            author: req.user.id,
            content,
            category,
            postType,
            isHiringTeams,
            department: userProfile.department, 
            mediaUrl 
        });

        await newPost.save();
        res.status(201).json({ success: true, payload: newPost });
    } catch (err) {
        res.status(500).json({ message: "Post creation failed", error: err.message });
    }
};