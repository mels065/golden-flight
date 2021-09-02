const customerRouter = require('express').Router();
const bcrypt = require('bcrypt');

// !* DELETE BELOW WHEN CUSTOMER MODEL IS CREATED *!

// Dummy data until we create the models.
class Customer {
    constructor(opts) {
        Customer.nextIndex++;
        this.id = Customer.nextIndex;
        this.first_name = opts.first_name;
        this.last_name = opts.last_name;
        this.email = opts.email;
        this.password = this.createPasswordHash(opts.password);
    }

    createPasswordHash(password) {
        return bcrypt.hashSync(password, 10);
    }

    async comparePasswords(password) {
        return await bcrypt.compare(password, this.password);
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
        const customer = await new Promise((resolve, reject) => {
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

        req.session.save(() => {
            req.session.customer_id = customer.id;
            req.session.logged_in = true;
            res.json(customer);
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

customerRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // This will be replaced by Customer.findOne({ where: { email: req.body.email } })
        const customer = await Promise.resolve(existingCustomers.find(customer => customer.email === email));
        console.log(customer);
        if (customer && (await customer.comparePasswords(password))) {
            req.session.user_id = customer.id;
            req.session.logged_in = true;
            res.json(customer);
        } else {
            res.status(400).json({ message: "Email or password do not match" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = customerRouter;
