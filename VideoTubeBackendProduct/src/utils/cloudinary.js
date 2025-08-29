// crating cloudinary utilities

import {v2 as cloudinary} from "cloudinary"
import fs from "node:fs";


cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(localFilePath) => {
     try {
          if(!localFilePath){
               throw new Error("Local file path is missing...")
          }
          // upload file on cloudinary
          const response = await cloudinary.uploader.upload(localFilePath,{
               resource_type:"auto"
          })
          // file has been uploaded successfully
          console.log("File uploaded Successfully on Cloudinary",response.secure_url);

          // Removing local file after uploading
          fs.unlinkSync(localFilePath);
          return response;

     } catch (err) {
          console.log("Failed to upload file",err.message);

          // safely removing local file if exists
          if(fs.existsSync(localFilePath)){
               fs.unlinkSync(localFilePath)
          }
          return null;
     }
}

export {uploadOnCloudinary}