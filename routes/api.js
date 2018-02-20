const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controller/user/userController.js');

router.use((req, res, next) => {
    console.log("Req- " + Date('dd-m-YYYY hh:mm:ss') + " : " + req.originalUrl);
    req.dateTime = Date('dd-m-YYYY hh:mm:ss');
    next();
});

// Authentication middleware
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send('403', {
            error: "Unauthorised Request"
        });
    }
};

router.get('/', (req, res) => {
    res.send("Home Page..");
});

router.post('/register', userController.register);
router.get('/users', isAuthenticated, userController.userList);

router.get('/login', userController.loginView);
router.post('/login', userController.login);

router.get('/home', userController.home);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), userController.loginWithGoogle);


module.exports = router;