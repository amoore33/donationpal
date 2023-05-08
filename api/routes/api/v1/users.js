const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const UserModel = require('models/User');
require('models/Donation');
const Donation = mongoose.model('donations');
require('models/Campaign');
const Campaign = mongoose.model('campaigns');

router.get('/', async (req, res) => {
    res.send('Root users route');
})

router.get('/:id', async (req, res) => {
    let user = await UserModel.findById(req.params.id);
    let donations = await Donation.find({user_id: req.params.id});
    for (let i = 0; i < donations.length; i++) {
        donations[i] = donations[i].toObject();
        donations[i].campaign = await Campaign.findById(donations[i].campaign_id);
    }
    user = user.toObject();
    user.donations = donations;
    res.json(user);
});

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