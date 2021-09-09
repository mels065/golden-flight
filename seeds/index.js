const sequelize = require('../config/connection');
const { Airliner, Customer, Flight, Ticket } = require('../models');

const customerSeedData = require('./customerData.json');
const airlinerSeedData = require('./airlinerData.json');
const flightSeedData = require('./flightData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true});

    const customers = await Customer.bulkCreate(customerSeedData, {
        individualHooks: true,
        returning: true,
    });

    const airliners = await Airliner.bulkCreate(airlinerSeedData, {
        returning: true
    });

    const flights = await Flight.bulkCreate(flightSeedData, {
        returning: true,
    });

    for (const { id } of customers) {
        const newticket = await Ticket.create({
            roundtrip: true,
	        baggage: true,
            customer_id: id,
            flight_id: flights[Math.floor(Math.random() * flights.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();
