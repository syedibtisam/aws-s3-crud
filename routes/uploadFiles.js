const router = require("express").Router();
const s3Operations = require("../controllers/uploadFiles");
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
// server storage
router.post("/singlefile", upload.single("file"), s3Operations.singleFile);
router.post("/multiplefiles", upload.array('files', maxFiles), s3Operations.multipleFiles);
router.post("/multiplefields", upload.fields([{ name: "profile-pic", maxCount: 1 }, { name: "profile-cover", maxCount: 1 },]), s3Operations.multipleFields);
router.post("/onlyimage", onyImageUplaod.single("file"), s3Operations.singleFile);

// storing images after changes

// setting up the multer
const memorayStorageLocal = multer.memoryStorage();
const localUpload = multer({ memorayStorageLocal });
router.post("/singlefileresize", localUpload.single("file"), s3Operations.singleFileResize);

// AWS S3 Services
const memorayStorage = multer.memoryStorage();
const s3Upload = multer({ memorayStorage });
router.post("/s3/singlefile", s3Upload.single("file"), s3Operations.s3SingleFile);
router.post("/s3/multiplefiles", s3Upload.array("files"), s3Operations.s3MultipleFiles);
router.get("/s3/getallbuckets",s3Operations.s3ListBuckets);


module.exports = router;