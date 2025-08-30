// utils/cloudinary.js
import cloudinary from "cloudinary";
import fs from "node:fs";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("Local file path is missing...");
    }

    const response = await cloudinary.v2.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded Successfully on Cloudinary:", response.secure_url);

    fs.unlinkSync(localFilePath); // delete after upload
    return response;
  } catch (err) {
    console.error("Failed to upload file", err.message);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

export { uploadOnCloudinary };
