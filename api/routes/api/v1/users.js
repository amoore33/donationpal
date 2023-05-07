const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    res.send('Root users route');
})

router.post(
    '/login',
    passport.authenticate('login', {session: false, failWithError: true}),
    (req, res) => {
        console.log(req.user);
        const payload = {id: req.user._id, email: req.user.email}
        const token = jwt.sign({payload}, process.env.TOP_SECRET_KEY, {expiresIn: '1m'});
        let loginObject = {
            _id: req.user._id,
            email: req.user.email,
            accessToken: token
        };
        console.log(loginObject);
        return res.status(200).json(loginObject);
    },
    (err, req, res) => {
        let errorResponse = {
            "error": {
                "name": "LoginError"
            },
            "message": "User not found",
            "statusCode": 401,
            "data": [],
            "success": false
        }
        return res.status(401).json(errorResponse);
    }
);

module.exports = router;