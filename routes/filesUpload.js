const router = require("express").Router();
const fileUploader = require("../controllers/filesUpload");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

router.post("/singlefile", upload.single("file"), fileUploader.singleFile);

const maxFiles = 10;
router.post("/multiplefiles", upload.array('files', maxFiles), fileUploader.multipleFiles);

router.post("/multiplefields", upload.fields(
    [
        { name: "profile-pic", maxCount: 1 },
        { name: "profile-cover", maxCount: 1 },
    ]
), fileUploader.multipleFields);

module.exports = router;