import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp"); // Files will wait here for a split second
    },
    filename: function (req, file, cb) {
        // Keeps the original name but adds a timestamp to avoid duplicates
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

export const upload = multer({ storage });