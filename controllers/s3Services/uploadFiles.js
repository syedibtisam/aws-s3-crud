const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
// const { Upload } = require ("@aws-sdk/lib-storage");

const uuid = require("uuid").v4;
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

module.exports = {
    s3SingleFileUploadv3,
    s3MultipleFilesUploadv3
}