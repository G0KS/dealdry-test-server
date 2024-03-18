const multer = require("multer");

const storage = multer.diskStorage({
   destination: (req, file, callback) => {
      callback(null, "./Uploads");
   },
   filename: (req, file, callback) => {
      let filename = `Profile-${Date.now()}-${file.originalname}`;
      callback(null, filename);
   },
});

const fileFilter = (req, file, callback) => {
   if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg"
   ) {
      callback(null, true);
   } else {
      callback(null, false);
      return callback(new Error("Only .png,.jpeg,.jpg files are allowed"));
   }
};

const multerConfig = multer({
   storage,
   fileFilter,
});

module.exports = multerConfig;
