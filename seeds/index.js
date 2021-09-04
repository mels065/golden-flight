const sequelize = require('../config/connection');
const { airport, customer, flight, passangers, ticket } = require('../models');

const customerSeedData = require('./customerData.json');
const airportSeedData = require('./airportData.json');
const flightSeedData = require('./flightData.json');
const passangersSeedData = require('./passangersData.json');
const ticketSeedData = require('./ticketData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true});

    const customers = await customer.bulkCreate(customerSeedData, {
        individualHooks: true,
        returning: true,
    });

    const flights = await flight.bulkCreate(flightSeedData, {
        returning: true,
    });

    for (const { id } of customers) {
        const newticket = await ticket.create({
            Customer_id: id,
            Flight_id: id,
        });
    }

    for (const { id } of customers) {
        const newpassanger = await passangers.create({
            Customer_id: id,
        });
    }
    
    for (const {id} of flights) {
        const newairport = await airport.create({
            Flight_id: id,
        });
    }

    for (const Flight of flightSeedData) {
        const newflight = await flight.create({
            ...Flight,
            Customer_id: customers[Math.floor(Math.random() * customers.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();