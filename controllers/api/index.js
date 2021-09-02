const express = require('express');

const customerRouter = require('./customer');

const apiRouter = express.Router();
apiRouter.use('/customer', customerRouter);

module.exports = apiRouter;
