const express = require('express');

const apiRouter = require('./api');

const router = express.Router();

const withAuth = require('../utils/with-auth');

router.use('/api', apiRouter);

router.get('/', (req, res) => {

    res.render('login');
});


router.get('/search', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const customerData = await Customer.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
      });
  
      const customer = customerData.get({ plain: true });
  
      res.render('search', {
        ...customer,
        logged_in: true
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
