module.exports = function authenticationMiddleware() {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.send('403', {
            error: "Unauthorised Request"
        });
    }
};