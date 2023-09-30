const { s3SingleFileUploadv3, s3MultipleFilesUploadv3, listBuckets } = require("./s3");
const sharp = require("sharp");

// rezsing the image
function singleFileResize(req, res) {
  console.log(req.file);
  sharp(req.file.buffer)
    .resize(320, 240)
    .toFile(`destination/${req.file.originalname}`, (err, info) => { res.json({ "status": "success" }); });

}
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
async function s3MultipleFiles(req, res) {
  try {
    const results = await s3MultipleFilesUploadv3(req.files);
    console.log(results);
    return res.json({ status: "success" });
  } catch (err) {
    console.log(err);
    res.json({ "error": err });
  }
}
async function s3ListBuckets(req, res) {
  try {
    const results = await listBuckets();
    console.log(results);
    return res.json({ status: "success" });
  } catch (err) {
    console.log(err);
    res.json({ "error": err });
  }
}
// async function 

module.exports = {
  singleFile,
  multipleFields,
  multipleFiles,
  s3SingleFile,
  s3MultipleFiles,
  singleFileResize,
  s3ListBuckets
}