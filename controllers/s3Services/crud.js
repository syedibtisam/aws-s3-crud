const {
    S3Client,
    PutObjectCommand,
    ListBucketsCommand,
    ListObjectsCommand,
    GetObjectCommand,
    DeleteObjectCommand
} = require("@aws-sdk/client-s3");

const uuid = require("uuid").v4;
const asyncHandler = require('express-async-handler');

/**
 * Required Permissions on bucket: Listbucket
 * Ref: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/ListObjectsCommand/
 */
const readAllObjectsInBucket = asyncHandler(async (req, res) => {
    const s3client = new S3Client();
    const input = {
        Bucket: process.env.AWS_BUCKET_NAME
        // "MaxKeys": "2"
    };
    const command = new ListObjectsCommand(input);
    const response = await s3client.send(command);
    return res.status(200).json(
        {
            "Request": "readAllObjectsInBucket",
            "status": "Accpeted",
            "data": response
        }
    );

});
/**
 * Required Permission on Bucket: Read
 * Ref: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/GetObjectCommand/
 */
const readObjectInBucket = asyncHandler(async (req, res) => {
    const s3client = new S3Client();
    const input = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.body.objectkey,
    };
    const command = new GetObjectCommand(input);
    const response = await s3client.send(command);
    return res.status(200).json(
        {
            "Request": "readObjectInBucket",
            "status": "Accpeted",
            "data": response
        }
    );
});
const deleteObjectInBucket = asyncHandler(async (req, res) => {
    const s3client = new S3Client();
    const input = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.body.objectkey,
      };
      const command = new DeleteObjectCommand(input);
      const response = await s3client.send(command);
      return res.status(200).json(
        {
            "Request": "deleteObjectInBucket",
            "status": "Accpeted",
            "data": response
        }
    );

});
/**
 * Required Permission on bucket: Write
 * Ref: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/PutObjectCommand/
 */
const uploadObject = asyncHandler(async (req, res) => {
    const s3client = new S3Client();
    const param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${uuid()}-${req.file.originalname}`,
        Body: req.file.buffer,
    };
    const command = new PutObjectCommand(param);
    const response = await s3client.send(command);
    return res.status(200).json(
        {
            "Request": "uploadObject",
            "status": "Accpeted",
            "data": response
        }
    );
});


///////////////////////////////////////////////////////
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
    readAllObjectsInBucket,
    readObjectInBucket,
    deleteObjectInBucket,
    uploadObject
}