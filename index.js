const express = require('express');
const app = express();
const PORT = 3000;
const fileUploadRoute = require("./routes/filesUpload");
const errorHandler = require("./errorHandler");

// upload files
app.use("/api/v1/upload",fileUploadRoute);

app.use(errorHandler);

app.listen(PORT, () => { console.log("server runing"); });