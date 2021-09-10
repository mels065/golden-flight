const moment = require('moment');
const PDFDocument = require('pdfkit');

const { Ticket, Customer, Flight } = require('../../models');

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

// Used to generate a PDF of the ticket iternary
ticketRouter.get('/download-itinerary/:id', withAuth, async (req, res) => {
    try {
        // ID is for ticket
        const { id } = req.params;
        const ticket = await Ticket.findByPk(id, { include: [
            { model: Customer },
            { model: Flight }
        ] });

        if (!ticket) {
            res.status(404).json({ message: 'Ticket does not exist' });
        } else if (ticket.customer_id !== req.session.customer_id) {
            res.status(401).json({ message: 'Unauthorized action' });
        } else {
            // Used this as an example: https://stackoverflow.com/a/58090515/4648099
            const doc = new PDFDocument({ bufferPages: true });
            let buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                let pdfData = Buffer.concat(buffers)
                res.writeHead(
                    200,
                    {
                        'Content-Length': Buffer.byteLength(pdfData),
                        'Content-Type': 'application/pdf',
                        'Content-Disposition': `attachment;filename=itinerary-${ticket.id}.pdf`
                    }
                )
                    .end(pdfData);
            });

            doc
                .fontSize(40)
                .text('Golden Flights Itinerary\n', { 
                    align: 'center'
                })
            doc
                .fontSize(20)
                .text(`Trip for ${ticket.Customer.email} from ${ticket.Flight.departingCity} to ${ticket.Flight.arrivingCity}\n\n`);
            doc
                .fontSize(18)
                .text(`Order Date: ${moment(ticket.order_date).format('MM/DD/YYYY')}`);
            doc.text(`Price: ${ticket.Flight.price}`);
            doc.text(`Departing Date: ${ticket.Flight.departingDate}`);
            doc.text(`Take Off Time: ${ticket.Flight.takeOffTime}`);
            doc.text(`Landing Time: ${ticket.Flight.landingTime}`);
            doc.text(`Roundtrip?: ${ticket.roundtrip ? 'Yes' : 'No'}`);
            doc.text(`Baggage?: ${ticket.baggage ? 'Yes' : 'No'}`);
            doc.end();
            doc
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
