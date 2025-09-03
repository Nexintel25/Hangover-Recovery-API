// utils/multerConfig.js
import multer from 'multer';

const fileFilter = (allowedMimetypes) => {
    return (req, file, cb) => {
        if (allowedMimetypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    };
};

const getMulterConfig = (allowedMimetypes) => {
    return multer({
        storage: multer.memoryStorage(),
        fileFilter: fileFilter(allowedMimetypes),
    });
};

export default getMulterConfig;
