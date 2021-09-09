const moment = require('moment');
const { Ticket } = require('../../models');

const ticketRouter = require('express').Router();

const withAuth = require('../../utils/with-auth');

/* DELETE BELOW */
// class Ticket {
//     constructor(opts) {
//         Ticket.nextIndex++;
//         this.id = Ticket.nextIndex;
//         this.flight_id = opts.flight_id;
//         this.customer_id = opts.customer_id;
//         this.date_ticketed = new Date();
//     }
// }
// Ticket.nextIndex = 0

// let bookedTickets = [
//     new Ticket({
//         flight_id: 5,
//         customer_id: 1
//     }),
//     new Ticket({
//         flight_id: 3,
//         customer_id: 2
//     }),
//     new Ticket({
//         flight_id: 1,
//         customer_id: 3
//     }),
//     new Ticket({
//         flight_id: 2,
//         customer_id: 4
//     }),
//     new Ticket({
//         flight_id: 4,
//         customer_id: 5
//     })
// ];

// const existingCustomers = [
//     { id: 1 },
//     { id: 2 },
//     { id: 3 },
//     { id: 4 },
//     { id: 5 },
//     { id: 6 }
// ];

// const today = moment();
// const existingFlights = [
//     {
//         id: 1,
//         departingTime: today.add(1, 'day').hour(12).minute(20),
//         arrivalTime: today.add(1, 'day').hour(14).minute(10),
//         departingAiportId: 1,
//         arrivingAirportId: 3
//     },
//     {
//         id: 2,
//         departingTime: today.add(1, 'day').hour(12).minute(20),
//         arrivalTime: today.add(1, 'day').hour(14).minute(10),
//         departingAiportId: 2,
//         arrivingAirportId: 5
//     },
//     {
//         id: 3,
//         departingTime: today.add(1, 'day').hour(12).minute(20),
//         arrivalTime: today.add(1, 'day').hour(14).minute(10),
//         departingAiportId: 3,
//         arrivingAirportId: 2
//     },
//     {
//         id: 4,
//         departingTime: today.add(1, 'day').hour(12).minute(20),
//         arrivalTime: today.add(1, 'day').hour(14).minute(10),
//         departingAiportId: 4,
//         arrivingAirportId: 1
//     },
//     {
//         id: 5,
//         departingTime: today.add(1, 'day').hour(12).minute(20),
//         arrivalTime: today.add(1, 'day').hour(14).minute(10),
//         departingAiportId: 1,
//         arrivingAirportId: 3
//     },
//     {
//         id: 6,
//         departingTime: today.add(2, 'day').hour(14).minute(0),
//         arrivalTime: today.add(2, 'day').hour(15).minute(50),
//         departingAiportId: 2,
//         arrivingAirportId: 5
//     },
// ];

// const airports = [
//     { id: 1 },
//     { id: 2 },
//     { id: 3 },
//     { id: 4 },
//     { id: 5 },
// ]

/* DELETE ABOVE */

ticketRouter.post('/book', withAuth, async (req, res) => {
    try {
        const ticket = await Ticket.create({
            ...req.body,
            customer_id: req.session.customer_id
        });
        res.json(ticket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

ticketRouter.put('/update-flight/:id', withAuth, async (req, res) => {
    try {
        // ID is for ticket
        const { id } = req.params;
        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            res.status(404).json({ message: 'Ticket does not exist' });
        } else if (ticket.customer_id !== req.session.customer_id) {
            res.status(401).json({ message: 'Unauthorized action' });
        } else {
            const { flight_id } = req.body;
            await Ticket.update(
                {
                    flight_id
                },
                {
                    where: { id }
                }
            )
            res.json({ message: 'Ticket has successfully been updated with new flight' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

ticketRouter.delete('/cancel/:id', withAuth, async (req, res) => {
    // ID is for ticket
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id)

    if (!ticket) {
        res.status(404).json({ message: 'Ticket does not exist, so cannot be cancelled' });
    } else if (ticket.customer_id !== req.session.customer_id) {
        res.status(401).json({ message: 'Unauthorized action' });
    } else {
        await Ticket.destroy({ where: { id } });
        res.json({ message: 'Flight has been cancelled, so ticket has become invalid' });
    }
});

module.exports = ticketRouter;
