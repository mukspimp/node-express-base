const User = require('../models').User;

module.exports = {
    getAllUsers(req, res) {
        try {
            return User.findAll()
                .then(users => {
                    console.log(users);
                    res.sqlError = null;
                    res.users = users;
                })
                .catch(error => {
                    res.sqlError = error;
                });
        } catch (error) {
            console.log("DB Error");
            res.sqlError = error;
        }
    },
    addUser(req, res) {
        try {            
            return User.create({
                id: req.body.id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
              })
            .then(user => {
                console.log(user);
                res.sqlError = null; 
                res.users = user;          
            })
            .catch(error => {
                res.sqlError = error;
            });        
        } catch (error) {            
            res.sqlError = true;
            res.sqlErrorMsg = error.message;
        }
    },
    getUser(req, res) {
        try {

        } catch (error) {            
            res.sqlError = true;
            res.sqlErrorMsg = error.message;
        }
    },
    findOrCreate(req,res) {
        try {            
            return User.create({
                id: req.body.id,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                email: req.user.email,
                password: req.user.password,
                googleId: req.user.googleId
              })
            .then(user => {
                console.log(user);
                res.sqlError = null; 
                res.users = user;          
            })
            .catch(error => {
                res.sqlError = error;
            });        
        } catch (error) {            
            res.sqlError = true;
            res.sqlErrorMsg = error.message;
        }
    }
};