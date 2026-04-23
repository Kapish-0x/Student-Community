import { compare } from "bcryptjs";
import { UserModel } from "../models/UserModel.js"; 
import jwt from "jsonwebtoken";

export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find User
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 2. Check Activity Status
        if (!user.isUserActive) {
            return res.status(403).json({ message: "Your account is currently inactive. Please contact support." });
        }

        // 3. Verify Password
        const isMatched = await compare(password, user.password);
        if (!isMatched) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 4. Create JWT (Keep payload lean - usually just ID or email/role)
        const token = jwt.sign(
            { email: user.email, role: user.role, username: user.username },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        // 5. Secure Cookie (Fixed syntax)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // only true in production
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 // 1 day in ms
        });

        // 6. Response
        const { password: _, ...userObj } = user.toObject(); // Cleaner way to remove password
        res.status(200).json({ message: "Login success", payload: userObj });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};