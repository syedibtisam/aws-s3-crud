const router = require("express").Router();
const s3CRUD = require("../controllers/s3Services/crud");

const multer = require('multer');
const memorayStorage = multer.memoryStorage();
const s3Upload = multer({ memorayStorage });

function userErrorHandler(err, req, res, next) {
    if (err) {
        res.status(500).json({ "Message": "Request Failed", "Error": err.message });
    }
}

// AWS S3 CRUD
router.post("/object", s3Upload.single("file"), s3CRUD.uploadObject);
router.get("/allobjects", s3CRUD.readAllObjectsInBucket);
router.get("/readobject", s3CRUD.readObjectInBucket);
router.delete("/object", s3CRUD.deleteObjectInBucket);
router.use(userErrorHandler);
module.exports = router;