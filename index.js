const express = require('express');
const app = express();
const PORT = 3000;
const UploadFilesRoute = require("./routes/uploadFiles");
const s3Routes = require("./routes/s3");

const errorHandler = require("./errorHandler");

// upload files
app.use("/api/v1/upload",UploadFilesRoute);
app.use("/api/v1/s3",s3Routes);
app.use(errorHandler);

app.listen(PORT, () => { console.log(`server runing`); });