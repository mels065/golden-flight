const sequelize = require('../config/connection');
const { Airliner, customer, flight, ticket } = require('../models');

const customerSeedData = require('./customerData.json');
const airlinerSeedData = require('./airlinerData.json');
const flightSeedData = require('./flightData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true});

    const customers = await customer.bulkCreate(customerSeedData, {
        individualHooks: true,
        returning: true,
    });

    const airliners = await Airliner.bulkCreate(airlinerSeedData, {
        returning: true
    });

    const flights = await flight.bulkCreate(flightSeedData, {
        returning: true,
    });

    for (const { id } of customers) {
        const newticket = await ticket.create({
            customer_id: id,
            flight_id: flights[Math.floor(Math.random() * flights)].id,
        });
    }

    process.exit(0);
};

seedDatabase();