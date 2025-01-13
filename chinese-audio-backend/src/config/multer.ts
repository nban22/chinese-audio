import multer from "multer";
import AppError from "../utils/appError";
import { ERROR_CODES } from "../constants/errorCodes";

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const acceptableFieldNames = ['audio', 'audios', 'avatar', 'image'];
        if (!acceptableFieldNames.includes(file.fieldname)) {
            cb(null, false);
            return cb(new AppError(ERROR_CODES.GENERAL.INVALID_FIELDNAME));
        }
                
        if (file.mimetype === "audio/mpeg" || file.mimetype === "audio/wav") {
            cb(null, true);
        } else {
            cb(null, false);            
            return cb(new AppError(ERROR_CODES.AUDIO.UNSUPPORTED_FORMAT));
        }
    },
})

export default upload;