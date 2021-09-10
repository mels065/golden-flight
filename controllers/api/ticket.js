const moment = require('moment');
const { Ticket } = require('../../models');

const ticketRouter = require('express').Router();

const withAuth = require('../../utils/with-auth');

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