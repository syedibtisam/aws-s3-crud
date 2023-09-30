// Disk storage
function singleFile(req, res) {
  return res.status(200).json(
    {
      "Request": "Store One file locally on server",
      "status": "Accpeted, stored in destination folder",
    }
  );
}
function multipleFiles(req, res) {
  return res.status(200).json(
    {
      "Request": "Store multiple files locally on server",
      "status": "Accpeted, stored in destination folder",
    }
  );
}
function multipleFields(req, res) {
  return res.status(200).json(
    {
      "Request": "Store multiple files locally on server",
      "status": "Accpeted, stored in destination folder",
    }
  );
}
// async function 

module.exports = {
  singleFile,
  multipleFields,
  multipleFiles,
}