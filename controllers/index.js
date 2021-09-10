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
      
      // console.log(flights);
      res.render('results', {
        flights
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  });



  router.get('/flights', withAuth, (req, res) => {
    Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;
