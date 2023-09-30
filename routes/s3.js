const router = require("express").Router();
const s3CRUD = require("../controllers/s3Services/crud");

// AWS S3 CRUD
router.post("/bucket",s3CRUD.createBucket);
router.delete("/bucket",s3CRUD.deleteBucket);
router.get("/allobjects",s3CRUD.readAllObjectsInBucket);
router.get("/readobject",s3CRUD.readObjectInBucket);
router.delete("/object",s3CRUD.deleteObjectInBucket);
router.delete("/allobjects",s3CRUD.deleteAllObjectsInBucket);

module.exports = router;