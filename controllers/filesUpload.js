function singleFile(req,res){
    res.json({ "status": "success" });

}

function multipleFiles(req,res){
    res.json({ "status": "success" });

}

function multipleFields(req,res){
    res.json({ "status": "success" });

}

module.exports = {
    singleFile,
    multipleFields,
    multipleFiles
}