
import fs from "fs";
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import AppError from "../errors/AppError";

                cloudinary.config({ 
                    cloud_name: 'doi78dfjf', 
                    api_key: '232271254725749', 
                    api_secret: '3nquADCWo0dmp-Q6Y4x6bbpUHMw' // Click 'View API Keys' above to copy your API secret
                });





export const sendImageToCludeNary = async (path: string, name: string) => {
  try {
    // 1️⃣ Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(path, {
      public_id: name,
    });

    // 2️⃣ Local file delete
    fs.unlink(path, (err) => {
      if (err) {
        console.log("Local file delete error:", err);
      } else {
        console.log("Local file deleted:", path);
      }
    });

    return uploadResult;

  } catch (error) {
   

    // 3️⃣ Error হলে file delete করবো যাতে ফোল্ডার ভরে না যায়
    fs.unlink(path, () => {});

     throw new AppError("Cloudinary Error:", 402);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd()+ '/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

export const upload = multer({ storage: storage })