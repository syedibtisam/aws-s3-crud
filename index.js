const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const PORT = 3000;

// uploads single file
app.post("/upload", upload.single("file"), (req, res) => {
    res.json({ "status": "success" });
});

// uploads multiple files (max to 10)
const maxFiles = 10;
app.post('/uploads', upload.array('files', maxFiles), function (req, res, next) {
    res.json({ "status": "success" });
})

// multiple fields upload
app.post("/multiplefields", upload.fields(
    [
        { name: "profile-pic", maxCount: 1 },
        { name: "profile-cover", maxCount: 1 },
    ]
)
    , (req,res) => {
        res.json({ "status": "success" });
     }
);
app.listen(PORT, () => { console.log("server runing"); });