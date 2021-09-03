const ticketRouter = require('express').Router();

const withAuth = require('../../utils/with-auth');

/* DELETE BELOW */
class Ticket {
    constructor(opts) {
        this.flight_id = opts.flight_id;
        this.customer_id = opts.customer_id;
        this.date_ticketed = new Date();
    }
}
Ticket.nextIndex = 0

const bookedTickets = [
    new Ticket({
        flight_id: 5,
        customer_id: 1
    }),
    new Ticket({
        flight_id: 3,
        customer_id: 2
    }),
    new Ticket({
        flight_id: 1,
        customer_id: 3
    }),
    new Ticket({
        flight_id: 2,
        customer_id: 4
    }),
    new Ticket({
        flight_id: 4,
        customer_id: 5
    })
];

const existingCustomers = [
    'Joe Schmoe',
    'Homer Simpson',
    'Fred Flintstone',
    'Patrick Star',
    'Gordon Ramsay',
    'Mickey Mouse'
];

const existingFlights = [
    'Toronto, ON',
    'New York, NY',
    'Los Angeles, CA',
    'London, England',
    'Tokyo Japan',
    'Berlin, Germany'
];

/* DELETE ABOVE */

ticketRouter.post('/book', withAuth, async (req, res) => {
    try {
        const ticket = await Promise.resolve(
            new Ticket({
                ...req.body,
                customer_id: req.session.customer_id
            })
        );
        bookedTickets.push(ticket);
        res.json(ticket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = ticketRouter;
