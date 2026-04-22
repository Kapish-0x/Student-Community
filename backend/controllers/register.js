import { UserModel } from "../models/UserModel.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const allowedRoles = ["USER", "CR"];

        // 1. Role Validation
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        // 2. Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already registered" });
        }

        // 3. Create User Doc
        const newUserDoc = new UserModel({
            username,
            email,
            password,
            role
        });

        await newUserDoc.save();

        res.status(201).json({ message: "User registered successfully" });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};