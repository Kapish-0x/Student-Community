import { ProfileModel } from "../models/ProfileModel.js";

export const createOrUpdateProfile = async (req,res) => {
    try {
        const {department , year , bio , skill , socialLinks , isOpenForTeams } = req.body;
        const userId = req.user.id;
        const profile = await ProfileModel.findOneAndUpdate(
            {user : userId},
            {
                user:  userId,
                department,
                year,
                bio,
                skill,
                socialLinks,
                isOpenForTeams
            },
            {new : true , upsert : true , runValidators : true}
        );
        res.status(200).json({ message: "Profile saved successfully", payload: profile });
    } catch (err) {
        res.status(500).json({ message: "Error saving profile", error: err.message });
    }
};

export const getMyProfile = async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id }).populate("user", ["username", "profileImageUrl", "email"]);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found. Please complete onboarding." });
    }
    res.status(200).json({ payload: profile });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};