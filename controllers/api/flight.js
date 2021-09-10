const { Flight } = require('../../models');

const flightRouter = require('express').Router();

flightRouter.get('/search', (req, res) => {
    Flight.findAll({
            where: {
                departingDate: req.body.departingDate,
                departingCity: req.body.departingCity,
                arrivingCity: req.body.arrivingCity
            }
        }).then(dbFlightData => {
            if (!dbFlightData) {
                res.status(400).json({ message: 'No flights with those parameters!' });
                return;
            }
            const validPassword = dbCustomerData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }
            req.session.save(() => {

                req.session.customer_id = dbCustomerData.id;
                req.session.email = dbCustomerData.email;
                req.session.logged_in = true;

                res.json({ customer: dbFlightData, message: 'You are now logged in!' });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = flightRouter;