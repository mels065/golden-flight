const customerRouter = require('express').Router();

// Dummy data until we create the models
const existingCustomers = [
    {
        id: 1,
        first_name: 'Alice',
        last_name: 'Wonderland',
        email: 'alice@wonderland.gov'
    },
    {
        id: 2,
        first_name: 'Dave',
        last_name: 'Matthews',
        email: 'davematthews@gmail.com'
    },
    {
        id: 3,
        first_name: 'Eddard',
        last_name: 'Stark',
        email: 'nedstark@winterfell.gov'
    }
];

let nextIndex = 3;

customerRouter.post('/register', async (req, res) => {
    try {
        // Replace promise with Customer.create
        const customer = await new Promise(async (resolve, reject) => {
            // All the code within these curly brackets can be deleted when the model is used.
            // It's just being used to replicate the behavior of registering a customer.
            if (await Promise.resolve(existingCustomers.some(customer => customer.email === req.body.email))) {
                reject(new Error('User with email already exists'));
            } else {
                nextIndex += 1;
                const customer = {
                    id: nextIndex,
                    ...req.body
                };
                existingCustomers.push(customer);
                resolve(customer);
            }
        })
        .catch((err) => {
            throw err;
        });

        req.session.save(() => {
            req.session.customer_id = customer.id;
            req.session.logged_in = true;
            res.json(customer);
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = customerRouter;
