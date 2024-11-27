import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === "audio/mpeg" || file.mimetype === "audio/wav") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .mp3 and .wav format allowed!"));
        }
    },
})

export default upload;