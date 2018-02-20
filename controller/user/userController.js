const userServices = require('./userServices.js');
const passport = require('passport');

exports.userList = async(req, res) => {
    console.log(req.body);
    console.log("Login controller");   
    // TODO: Check roles middleware if needed 
    var result = await userServices.listUsers(req, res);
    if (result) {
        res.send('200', res.users);
    } else {
        res.send('400', {
            error: res.sqlError.message
        });
    }   
};

exports.register = async(req, res) => {
    console.log(req.body);
    // TODO: validate params 
    // Insert user
    var result = await userServices.addUser(req, res);
    if (result) {
        res.send('200', res.users);
    } else {
        res.send('400', {
            error: res.sqlErrorMsg
        });
    }
};

exports.loginView = async(req, res) => {   
    res.render('../views/login.ejs', {
        message: ''
    });
};

exports.home = async(req, res) => {
    if (req.isAuthenticated()) {
        res.render('../views/home.ejs', {
            message: 'Home page after login...!!! hurryyy..!!'
        });
    } else {
        res.send('403', {
            error: "Unauthorised Request"
        });
    }
};

exports.login = async(req, res) => {
    console.log(req.body);
    // TODO: validate params 
    
    passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {            
            return res.redirect('/api/login');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            console.log(user.username);
            //TODO:  generate auth token and send 
            return res.redirect('/api/home/');
        });
    })(req, res);  
};

exports.loginWithGoogle = async (req, res) => {
    //TODO:  generate auth token and send 
    return res.redirect('/api/home/');
};
