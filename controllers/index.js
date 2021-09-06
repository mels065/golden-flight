const express = require('express');

const apiRouter = require('./api');

const router = express.Router();

router.use('/api', apiRouter);

router.get('/', (req, res) => {

    res.render('login');
});

router.get('/search', (req, res) => {

    console.log(req.session);

    res.render('search');
});

router.get('/results', (req, res) => {

    console.log(req.session);

    res.render('results');
});

module.exports = router;
