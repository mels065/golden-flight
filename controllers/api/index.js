const express = require('express');

const customerRouter = require('./customer');
const ticketRouter = require('./ticket');
const flightRouter = require('./flight');

const apiRouter = express.Router();
apiRouter.use('/customer', customerRouter);
apiRouter.use('/ticket', ticketRouter);
apiRouter.use('/flight', flightRouter);

module.exports = apiRouter;
