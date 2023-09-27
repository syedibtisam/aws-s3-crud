const router = require("express").Router();
const fileUploader = require("../controllers/uploadFiles");
const uuid = require("uuid").v4;
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${uuid()}-${file.originalname}`);
    },
});

const upload = multer({ storage });
// filter to uplaod image only - then add to multer object
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) cb(null, true);
    else cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
}

const onyImageUplaod = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1000000, // in bytes
        files: 2 //max files
    },
});
const maxFiles = 10;
router.post("/singlefile", upload.single("file"), fileUploader.singleFile);
router.post("/multiplefiles", upload.array('files', maxFiles), fileUploader.multipleFiles);
router.post("/multiplefields", upload.fields([{ name: "profile-pic", maxCount: 1 }, { name: "profile-cover", maxCount: 1 },]), fileUploader.multipleFields);
router.post("/onlyimage", onyImageUplaod.single("file"), fileUploader.singleFile);


// AWS S3 Services
const memorayStorage = multer.memoryStorage();
const s3Upload = multer({ memorayStorage });
router.post("/s3/singlefile", s3Upload.single("file"), fileUploader.s3SingleFile);
router.post("/s3/multiplefiles", s3Upload.array("files"), fileUploader.s3MultipleFiles);


module.exports = router;