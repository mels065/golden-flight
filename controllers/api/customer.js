const { Customer } = require('../../models');

const customerRouter = require('express').Router();

customerRouter.post('/register', async (req, res) => {
    try {
        const customer = await Customer.create(
            req.body
        );

        req.session.save(() => {
            req.session.customer_id = customer.id;
            req.session.logged_in = true;
            res.json({
                id: customer.id,
                email: customer.email
            });
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

customerRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const customer = await Customer.findOne({
            where: { email }
        });
        
        if (customer && (await customer.checkPassword(password))) {
            req.session.save(() => {
                req.session.customer_id = customer.id;
                req.session.logged_in = true;
                res.json({
                    id: customer.id,
                    email: customer.email
                });
            });
        } else {
            res.status(400).json({ message: "Email or password do not match" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
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
