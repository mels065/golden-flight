const express = require('express');

const apiRouter = require('./api');

const router = express.Router();

router.use('/api', apiRouter);

router.get('/', (req, res) => {

    res.render('login');
});

router.post('/home', (req, res) => {

    console.log(req.session);

    res.render('home');
});

module.exports = router;
