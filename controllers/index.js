const express = require('express');

const apiRouter = require('./api');

const router = express.Router();

const withAuth = require('../utils/with-auth');



router.use('/api', apiRouter);

router.get('/', (req, res) => {

    res.render('login');
});


router.get('/home', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const customerData = await customer.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
      });
  
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
      const flightData = await flight.findAll({
        where: {
          departingAP: req.body.departingAP,
          arrivingAP: req.body.arrivingAP,
          departureDate: req.body.departureDate,
          
        },
        include: [{ model: airport }],
      });
  
      const flight = flightData.get({ plain: true });
  
      res.render('search', {
        ...flight
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/results', (req, res) => {

    console.log(req.session);

    res.render('results');
});

module.exports = router;
