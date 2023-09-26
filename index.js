const express = require('express');
const app = express();
const PORT = 3000;
const UploadFilesRoute = require("./routes/uploadFiles");
const errorHandler = require("./errorHandler");

// upload files
app.use("/api/v1/upload",UploadFilesRoute);

app.use(errorHandler);

app.listen(PORT, () => { console.log(`server runing`); });