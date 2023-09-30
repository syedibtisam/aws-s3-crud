function routesErrorHandler(err, req, res, next) {
    if (err) {
        res.status(500).json(
            { 
                "Message": "Request Failed",
                "Error": err.message 
            }
        );
    }
}
module.exports = routesErrorHandler;