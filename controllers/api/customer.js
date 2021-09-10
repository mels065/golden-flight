const { Customer } = require('../../models');

const customerRouter = require('express').Router();
const bcrypt = require('bcrypt');

customerRouter.post('/register', async (req, res) => {
    try {
        const customer = await Customer.create(req.body);

        req.session.save(() => {
            req.session.customer_id = customer.id;
            req.session.logged_in = true;
            res.json(customer);
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

customerRouter.post('/login', (req, res) => {
    Customer.findOne({
            where: {
                email: req.body.email
            }
        }).then(dbCustomerData => {
            if (!dbCustomerData) {
                res.status(400).json({ message: 'No user with that username!' });
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

                res.json({ customer: dbCustomerData, message: 'You are now logged in!' });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

customerRouter.put('/update', async (req, res) => {
    try {
      const customerData = await Customer.update(
        {
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          city: req.body.city,
          state: req.body.state,
          postalCode: req.body.postalCode,
          country: req.body.country,
        },
        {
          where: {
            id: req.session.customer_id,
          },
        }
      );
      if (!customerData) {
        res.status(404).json({ message: "No Customer found with that id!" });
        return;
      }
      res.status(200).json(customerData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


customerRouter.post('/logout', async (req, res) => {
    try {
        if (res.session.logged_in) {
            res.session.destroy();
            res.redirect('/');
        } else {
            res.status(400).json('No user was logged in');
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

module.exports = customerRouter;
