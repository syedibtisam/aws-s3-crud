const { S3Client, PutObjectCommand, ListBucketsCommand } = require("@aws-sdk/client-s3");
const uuid = require("uuid").v4;
/**
 * 1. Create a bucket
 * 2. Delete a bucket
 * 3. Read all objects in a bucket
 * 4. Read a specific object in a bucket
 * 4. Delete a specific object in a bucket
 * 5. Delete all objects in a bucket
 */
async function createBucket(req,res){
    return res.status(200).json({"msg":"createBucket"});
}
async function deleteBucket(req,res){
    return res.status(200).json({"msg":"deleteBucket"});

}
async function readAllObjectsInBucket(req,res){
    return res.status(200).json({"msg":"readAllObjectsInBucket"});

}
async function readObjectInBucket(req,res){
    return res.status(200).json({"msg":"readObjectInBucket"});

}
async function deleteObjectInBucket(req,res){
    return res.status(200).json({"msg":"deleteObjectInBucket"});

}
async function deleteAllObjectsInBucket(req,res){
    return res.status(200).json({"msg":"deleteAllObjectsInBucket"});

}
async function s3SingleFileUploadv3(file) {
    const s3client = new S3Client();
    const param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${uuid()}-${file.originalname}`,
        Body: file.buffer,
    };
    return await s3client.send(new PutObjectCommand(param));
}

async function s3MultipleFilesUploadv3(files) {
    const s3client = new S3Client();
    const params = files.map((file) => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `uploads/${uuid()}-${file.originalname}`,
            Body: file.buffer,
        };
    });

    return await Promise.all(
        params.map((param) => s3client.send(new PutObjectCommand(param)))
    );
};
async function listBuckets() {
    try {
        const s3client = new S3Client();
        const input = {};
        const command = new ListBucketsCommand(input);
        return await s3client.send(command);
    } catch (error) {
        return { "error": error };
    }

}
module.exports = {
    s3SingleFileUploadv3,
    s3MultipleFilesUploadv3,
    listBuckets,
    createBucket,
    deleteBucket,
    readAllObjectsInBucket,
    readObjectInBucket,
    deleteObjectInBucket,
    deleteAllObjectsInBucket
}