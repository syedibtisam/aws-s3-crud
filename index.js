const express = require('express');
const app = express();
const PORT = 3000;
const routesErrorHandler = require("./errorHandler");
const UploadFilesRoute = require("./routes/uploadFiles");
const s3Routes = require("./routes/s3");

// Parse JSON Data
app.use(express.json());

// upload files
app.use("/api/v1/uploadlocal",UploadFilesRoute);
app.use("/api/v1/s3",s3Routes);

app.use(routesErrorHandler);

app.listen(PORT, () => { console.log(`server runing`); });