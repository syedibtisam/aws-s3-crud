const { s3SingleFileUploadv3 } = require("./s3Services/uploadFiles");

// Disk storage
function singleFile(req, res) {
    res.json({ "status": "success" });
}
function multipleFiles(req, res) {
    res.json({ "status": "success" });
}
function multipleFields(req, res) {
    res.json({ "status": "success" });
}
async function s3SingleFile(req, res) {
    console.log("ff");
    console.log(req.file);
    try {
        const results = await s3SingleFileUploadv3(req.file);
        console.log(results);
        return res.json({ status: "success" });
      } catch (err) {
        console.log(err);
      }
}
function s3MultipleFile(req, res) {
    res.json({ "status": "success" });
}
module.exports = {
    singleFile,
    multipleFields,
    multipleFiles,
    s3SingleFile,
    s3MultipleFile
}