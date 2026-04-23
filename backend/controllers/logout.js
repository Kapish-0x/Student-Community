import { UserModel } from "../models/UserModel.js";
export const LogoutUser = (req, res) => {
    try {
        // Clear the cookie named 'token'
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error during logout" });
    }
};