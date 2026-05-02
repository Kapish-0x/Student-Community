import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // Upload the file
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "unilink_posts"
        });
        // Success! Remove the locally saved temporary file
        fs.unlinkSync(localFilePath);
        return response.url;
    } catch (error) {
        // If upload fails, still remove the temp file from our server
        fs.unlinkSync(localFilePath);
        return null;
    }
};