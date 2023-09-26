const router = require("express").Router();
const fileUploader = require("../controllers/filesUpload");
const uuid = require("uuid").v4;
const multer = require('multer');

// Example - 1 
// Simple specifying folder to upload files without any filtering or nameing convention
// const upload = multer({ dest: 'uploads/' })

// Example - 2
// When need Naming convention
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${uuid()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post("/singlefile", upload.single("file"), fileUploader.singleFile);

const maxFiles = 10;
router.post("/multiplefiles", upload.array('files', maxFiles), fileUploader.multipleFiles);

router.post("/multiplefields", upload.fields(
    [
        { name: "profile-pic", maxCount: 1 },
        { name: "profile-cover", maxCount: 1 },
    ]
), fileUploader.multipleFields);

// Only image can be uploaded
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) cb(null, true);
    else cb(new Error("File should be Image"), false);
}
const onyImageUplaod = multer({ storage, fileFilter });

router.post("/onlyimage",onyImageUplaod.single("file"), fileUploader.singleFile);

module.exports = router;