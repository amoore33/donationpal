const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
require('models/Campaign');
const Campaign = mongoose.model('campaigns');
require('models/Donation');
const Donation = mongoose.model('donations');

router.get('/', (req, res) => {
  res.send('Root API route');
});

// GET all campaigns
router.get('/campaigns', async (req, res) => {
  const filter = {};
  const campaigns = await Campaign.find(filter);
  res.json(campaigns);
});

// GET campaign by id
router.get('/campaigns/:id', async (req, res) => {
  let campaign = await Campaign.findById(req.params.id);
  let donations = await Donation.find({campaign_id: req.params.id});
  campaign = campaign.toObject();
  campaign.donations = donations;
  res.json(campaign);
});

module.exports = router;