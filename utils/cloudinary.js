const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploads = (file, folder) => {
  return cloudinary.uploader.upload(
    file,
    {
      resource_type: "auto",
      folder: folder,
      unique_filename: true,
    }
  );
};
