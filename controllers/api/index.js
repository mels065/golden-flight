const express = require('express');

const customerRouter = require('./customer');
const ticketRouter = require('./ticket');

const apiRouter = express.Router();
apiRouter.use('/customer', customerRouter);
apiRouter.use('/ticket', ticketRouter);

module.exports = apiRouter;
