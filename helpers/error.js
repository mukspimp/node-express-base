exports.logError = (err, req, res, next) => {
    // Add error in log file
    console.error(err.stack)
    next(err);
};

exports.clientErrorHandler = (err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send({
            error: 'Something failed!'
        })
    } else {
        next(err)
    }
};

exports.errorHandler = (err, req, res, next) => {
    res.status(500)
    res.send({
        error: err
    });
};