const router = require("express").Router();
const s3CRUD = require("../controllers/s3");

const multer = require('multer');
const memorayStorage = multer.memoryStorage();
const s3Upload = multer({ memorayStorage });

// AWS S3 CRUD
router.post("/object", s3Upload.single("file"), s3CRUD.uploadObject);
router.post("/objects", s3Upload.single("files"), s3CRUD.uploadObjects);
router.get("/allobjects", s3CRUD.readAllObjectsInBucket);
router.get("/readobject", s3CRUD.readObjectInBucket);
router.delete("/object", s3CRUD.deleteObjectInBucket);

module.exports = router;