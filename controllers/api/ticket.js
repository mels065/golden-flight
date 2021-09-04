const ticketRouter = require('express').Router();

const withAuth = require('../../utils/with-auth');

/* DELETE BELOW */
class Ticket {
    constructor(opts) {
        Ticket.nextIndex++;
        this.id = Ticket.nextIndex;
        this.flight_id = opts.flight_id;
        this.customer_id = opts.customer_id;
        this.date_ticketed = new Date();
    }
}
Ticket.nextIndex = 0

let bookedTickets = [
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
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 }
];

const existingFlights = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 }
];

/* DELETE ABOVE */

ticketRouter.post('/book', withAuth, async (req, res) => {
    try {
        // Replace with Ticket.create
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

ticketRouter.put('/update-flight/:id', withAuth, async (req, res) => {
    try {
        // ID is for ticket
        const { id } = req.params;
        // Replace with Ticket.findByPk
        const ticket = await Promise.resolve(bookedTickets.find(ticket => ticket.id == id));
        if (!ticket) {
            res.status(404).json({ message: 'Ticket does not exist' });
        } else if (ticket.customer_id !== req.session.customer_id) {
            res.status(401).json({ message: 'Unauthorized action' });
        } else {
            const { flight_id } = req.body;
            // Replace with Ticket.update
            ticket.flight_id = flight_id
            res.json({ message: 'Ticket has successfully been updated with new flight' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

ticketRouter.delete('/cancel/:id', withAuth, async (req, res) => {
    // ID is for ticket
    const { id } = req.params;
    // Replace with Ticket.findByPk
    const ticket = bookedTickets.find(ticket => ticket.id == id);

    if (!ticket) {
        res.status(404).json({ message: 'Ticket does not exist, so cannot be cancelled' });
    } else if (ticket.customer_id !== req.session.customer_id) {
        res.status(401).json({ message: 'Unauthorized action' });
    } else {
        // Replace below with Ticket.destroy
        const index = bookedTickets.findIndex(ticket => ticket.id === id);
        bookedTickets = await Promise.resolve([
            ...bookedTickets.slice(0, index),
            ...bookedTickets.slice(index + 1)
        ]);
        // Replace above with Ticket.destroy
        res.json({ message: 'Flight has been cancelled, so ticket has become invalid' });
    }
});

module.exports = ticketRouter;
