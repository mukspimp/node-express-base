const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const uuid = require('../../helpers/commonUtils');
const authenticationMiddleware = require('./middleware');

const userRepository = require('../../db/repositories').userRepository;
const User = require('../../db/models').User;


function findUser(id, callback) {
    User.find({
        where: {
            id: id,
        }
    }).then(user => {
        if (user !== null) {
            return callback(null, user);
        } else {
            return callback(null);
        }
    }).catch(error => {
        return callback(null);
    });
};

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    findUser(id, cb);
});

function initPassport() {
    passport.use(new LocalStrategy(
        (username, password, done) => {
            User.find({
                where: {
                    email: username,
                }
            }).then(user => {
                // User not found
                if (!user) {
                    console.log('User not found');
                    return done(null, false);
                }

                // Always use hashed passwords and fixed time comparison
                bcrypt.compare(password, user.password, (err, isValid) => {
                    if (err) {
                        return done(err, null);
                    }
                    if (!isValid) {
                        return done(null, false);
                    }
                    return done(null, user);
                });
            }).catch(error => {
                return done(error, null);
            });
        }
    ));

    passport.use(new GoogleStrategy({
            clientID: '96081372354sddgff17271-8ba0bjhtset34dfdfh5600.apps.googleusercontent.com',
            clientSecret: 'DEXjGwjDF46FGX2vDEXjGwjFIGJI8Hxf5D',
            callbackURL: "http://www.nodetestmukund.com:3001/api/auth/google/callback"
        },
        function (accessToken, refreshToken, profile, cb) {
            uuid.generateUUID().then(function (userId) {
                User.findOrCreate({
                    where: {
                        googleId: profile.id
                    },
                    defaults: {
                        id: userId,
                        firstName: profile.name.familyName,
                        lastName: profile.name.givenName,
                        email: '',
                        password: '',
                        googleId: profile.id
                    }
                }).spread((user, created) => {

                    return cb(null, user);
                }).catch(error => {
                    return cb(error, null);
                });
            });
        }
    ));

    passport.authenticationMiddleware = authenticationMiddleware;
}

module.exports = initPassport;