const { Customer } = require('../../models');

const customerRouter = require('express').Router();
const bcrypt = require('bcrypt');

// !* DELETE BELOW WHEN CUSTOMER MODEL IS CREATED *!

// Dummy data until we create the models.
// class Customer {
//     constructor(opts) {
//         Customer.nextIndex++;
//         this.id = Customer.nextIndex;
//         this.first_name = opts.first_name;
//         this.last_name = opts.last_name;
//         this.email = opts.email;
//         this.password = this.createPasswordHash(opts.password);
//     }

//     createPasswordHash(password) {
//         return bcrypt.hashSync(password, 10);
//     }

//     async comparePasswords(password) {
//         return await bcrypt.compare(password, this.password);
//     }

//     get() {
//         const serializedData = {
//             id: this.id,
//             first_name: this.first_name,
//             last_name: this.last_name,
//             email: this.email
//         }

//         return serializedData;
//     }
// }
// Customer.nextIndex = 0;

// const existingCustomers = [
//     new Customer({
//         first_name: 'Alice',
//         last_name: 'Wonderland',
//         email: 'alice@wonderland.gov',
//         password: 'followthewhiterabbit29'
//     }),
//     new Customer({
//         first_name: 'Dave',
//         last_name: 'Matthews',
//         email: 'davematthews@gmail.com',
//         password: 'password123'
//     }),
//     new Customer({
//         first_name: 'Eddard',
//         last_name: 'Stark',
//         email: 'nedstark@winterfell.gov',
//         password: 'winteriscoming21'
//     })
// ];

// !* DELETE ABOVE WHEN CUSTOMER MODEL IS CREATED *!

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

                req.session.user_id = dbCustomerData.id;
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
            id: req.session.user_id,
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
