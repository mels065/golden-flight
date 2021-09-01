const customerRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { create } = require('express-handlebars');

// !* DELETE BELOW WHEN CUSTOMER MODEL IS CREATED *!

// Dummy data until we create the models.
class Customer {
    constructor(opts) {
        Customer.nextIndex++;
        this.id = Customer.nextIndex;
        this.first_name = opts.first_name;
        this.last_name = opts.last_name;
        this.email = opts.email;
        this.createPasswordHash(opts.password);
    }

    async createPasswordHash(password) {
        this.password = await bcrypt.hash(password, 10);
    }

    async comparePasswords(password) {
        return bcrypt.compare(password, this.password);
    }

    get() {
        const serializedData = {
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email
        }

        return serializedData;
    }
}
Customer.nextIndex = 0;

const existingCustomers = [
    new Customer({
        first_name: 'Alice',
        last_name: 'Wonderland',
        email: 'alice@wonderland.gov',
        password: 'followthewhiterabbit29'
    }),
    new Customer({
        first_name: 'Dave',
        last_name: 'Matthews',
        email: 'davematthews@gmail.com',
        password: 'password123'
    }),
    new Customer({
        first_name: 'Eddard',
        last_name: 'Stark',
        email: 'nedstark@winterfell.gov',
        password: 'winteriscoming21'
    })
];

// !* DELETE ABOVE WHEN CUSTOMER MODEL IS CREATED *!

customerRouter.post('/register', async (req, res) => {
    try {
        // Replace promise with Customer.create
        const customerData = await new Promise((resolve, reject) => {
            // All the code within these curly brackets can be deleted when the model is used.
            // It's just being used to replicate the behavior of registering a customer.
            if (existingCustomers.some(customer => customer.email === req.body.email)) {
                reject(new Error('User with email already exists'));
            } else {
                const customerData = new Customer(req.body);
                existingCustomers.push(customerData);
                resolve(customerData);
            }
        })
        .catch((err) => {
            throw err;
        });

        const customer = customerData.get();
        console.log(existingCustomers.map(customer => customer.get()));
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
