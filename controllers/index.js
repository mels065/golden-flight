const express = require('express');
const apiRouter = require('./api');
const router = express.Router();
const withAuth = require('../utils/with-auth');

const { Customer, Ticket, Flight, Airliner } = require('../models');

router.use('/api', apiRouter);

router.get('/', (req, res) => {

    res.render('login');
});


router.get('/home', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      console.log('in');
      const customerData = await Customer.findByPk(req.session.customer_id, {
        
        attributes: { exclude: ['password'] },
      });
      console.log(customerData);
      const customer = customerData.get({ plain: true });
  
      res.render('home', {
        ...customer,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/search', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const customerData = await Customer.findByPk(req.session.customer_id, {
        
        attributes: { exclude: ['password'] },
      });
      console.log(customerData);
      const customer = customerData.get({ plain: true });
  
      res.render('search', {
        ...customer,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get('/results', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const flightData = await flight.findAll({
        where: {
          departingAP: req.body.departingAP,
          arrivingAP: req.body.arrivingAP,
          departureDate: req.body.departureDate,
          
        },
        include: [{ model: airport }],
      });
  
      const flight = flightData.get({ plain: true });
  
      res.render('results', {
        ...flight
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
