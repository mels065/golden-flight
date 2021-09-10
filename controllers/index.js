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
      const {departingDate, departingCity, arrivingCity} = req.query;
      const flightData = await Flight.findAll({
        where: {
          departingDate, departingCity, arrivingCity
          },
          include: [{model: Airliner}]
      });
  
      const flights = flightData.map(flight => flight.get({ plain: true }));
      
        console.log(flights);
      res.render('results', {
        flights
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  });

  router.get('/flight/:id', withAuth, async (req, res) => {
    try {
    
      const flightData = await Flight.findOne({
        where: {
          id: req.params.id
          },
          include: [{model: Airliner}]
      });
  
      const flight = flightData.get({ plain: true });
     
        console.log(flight);
      res.render('ticket', flight);
    } catch (err) {
      res.status(500).json(err.message);
    }
  });

  router.get('/ticket', withAuth, async (req, res) => {
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

  
  router.get('/mytickets', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      console.log('in');
      const ticketData =  await Ticket.findAll({
        where: {
          customer_id: req.session.customer_id
        },
        include: [{model: Customer}, {model: Flight, include: [
          {model: Airliner}
        ]}]
      });
      console.log(ticketData);
      const tickets = ticketData.map(ticket => ticket.get({ plain: true }));
      console.log(tickets);
  
      res.render('mytickets', { 
        tickets }
       
      );
    } catch (err) {
      res.status(500).json(err);
    }
  }); 

 /* router.get('/mytickets', (req, res) => {

    res.render('mytickets');
});
*/


module.exports = router;

