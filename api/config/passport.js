// requires
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// helper functions
async function authenticateLogin(email, password, cb) {
    UserModel.findOne({email})
    .then(async (user) => {
        if (!user) return cb(null, false);
        const isValidPwd = await user.isValidPassword(password);
        if (isValidPwd) {
            return cb(null, user);
        }
        else {
            return cb(null, false);
        }
    })
    .catch((err) => cb(err));
}

async function getUserFromToken(token, cb) {
    try {
        return cb(null, token.payload);
    }
    catch (err) {
        cb(err);
    }
}

// passport middleware

// local strategy for login
passport.use('login', new localStrategy(
    {usernameField: 'email', passwordField: 'password'},
    authenticateLogin
));

// jwt strategy for reading token and granting access
passport.use(new jwtStrategy(
    {
        secretOrKey: process.env.TOP_SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    getUserFromToken
));