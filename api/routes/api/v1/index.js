const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
require('models/Campaign');
const Campaign = mongoose.model('campaigns');
require('models/Donation');
const Donation = mongoose.model('donations');
const UserModel = require('models/User');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// get client or API URL
const getURL = app => 
  (process.env.NODE_ENV === 'production')?
  (app === 'client' ? process.env.PROD_CLIENT_URL : process.env.PROD_API_URL):
  (app === 'client' ? process.env.DEV_CLIENT_URL : process.env.DEV_API_URL);

router.get('/', (req, res) => {
  res.send('Root API route');
});

// GET all campaigns
router.get('/campaigns', async (req, res) => {
  const campaigns = await Campaign.find({});
  for (let i = 0; i < campaigns.length; i++) {
    let donations = await Donation.find({campaign_id: campaigns[i]._id});
    let donations_sum = 0;
    for (let j = 0; j < donations.length; j++) {
      donations[j] = donations[j].toObject();
      donations_sum += donations[j].amount;
    }
    campaigns[i] = campaigns[i].toObject();
    campaigns[i].donations = donations;
    campaigns[i].donations_sum = donations_sum;
  }
  res.json(campaigns);
});

// GET campaign by id
router.get('/campaigns/:id', async (req, res) => {
  let campaign = await Campaign.findById(req.params.id);
  let donations = await Donation.find({campaign_id: req.params.id});
  let donations_sum = 0;
  for (let i = 0; i < donations.length; i++) {
    donations[i] = donations[i].toObject();
    donations[i].user = await UserModel.findById(donations[i].user_id);
    donations_sum += donations[i].amount;
  }
  campaign = campaign.toObject();
  campaign.donations = donations;
  campaign.donations_sum = donations_sum;
  res.json(campaign);
});

// POST donation from user to Stripe checkout
router.post('/donations/create_checkout', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: req.body.campaign_name
          },
          unit_amount: req.body.donation_amount
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: `${getURL('api')}/donations/donation_success?success=true&session_id={CHECKOUT_SESSION_ID}&campaign_id=${req.body.campaign_id}`,
    cancel_url: `${getURL('client')}`,
    metadata: {
      campaign_id: req.body.campaign_id,
      user_id: req.body.user_id
    }
  });
  res.redirect(303, session.url);
});

// GET user back to page stating donation success
router.get('/donations/donation_success', async (req, res) => {
  // retrieve checkout session
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  // todo: add donation record to database
  const donation_amount = session.amount_total / 100;
  await Donation.create({
    campaign_id: session.metadata.campaign_id,
    user_id: session.metadata.user_id,
    amount: donation_amount,
    date: new Date(),
    payment_id: session.payment_intent
  }, err => {
    console.log(err);
  });
  // construct URL to front end and redirect user
  const clientURL = `${getURL('client')}/donation_success?campaign_id=${session.metadata.campaign_id}&donation_amount=${donation_amount}`;
  res.redirect(303, clientURL);
});

module.exports = router;