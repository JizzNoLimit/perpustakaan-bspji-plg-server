const multer = require('multer')
const path = require('path')


const uploadCover = multer({
    storage: multer.diskStorage({
        destination: "./public/uploads/cover",
        filename: (req, file, callback) => {
            callback(null, Date.now() + "-" + file.originalname.toLowerCase());
        },
    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter(req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        if (
            ext !== ".png" &&
            ext !== ".jpg" &&
            ext !== ".jpeg" &&
            ext !== ".webp"
        ) {
            cb(new Error("Error: Unacceptable file format"), false);
        } else {
            cb(null, true);
        }
    },
});

module.exports = uploadCover