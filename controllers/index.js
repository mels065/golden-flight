const express = require('express');

const apiRouter = require('./api');

const router = express.Router();

router.use('/api', apiRouter);

router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;
