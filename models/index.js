const customer = require('./customer');
const ticket = require('./ticket');
const airport = require('./airport');
const flight = require('./flight');
const passangers = require('./passangers');

customer.hasMany(ticket, {
    foreignKey: 'Customer_id',
    onDelete: 'CASCADE'
});

ticket.belongsTo(customer, {
    foreignKey: 'Customer_id'
});

flight.hasMany(ticket, {
    foreignKey: 'Flight_id',
    onDelete: 'CASCADE'
});
git 
ticket.belongsTo(flight, {
    foreignKey: 'Flight_id'
});

customer.hasMany(flight, {
    foreignKey: 'Customer_id',
    onDelete: 'CASCADE'
});

flight.belongsTo(customer, {
    foreignKey: 'Customer_id'
});

flight.hasMany(airport, {
    foreignKey: 'Flight_id',
    onDelete: 'CASCADE'
});

airport.belongsTo(flight, {
    foreignKey: 'Flight_id'
});

customer.hasMany(passangers, {
    foreignKey: 'Customer_id',
    onDelete: 'CASCADE'
});

passangers.belongsTo(customer, {
    foreignKey: 'Customer_id'
});

ticket.hasMany(passangers, {
    foreignKey: 'Ticket_id',
    onDelete: 'CASCADE'
});

passangers.belongsTo(ticket, {
    foreignKey: 'Ticket_id'
});

module.exports = { customer, ticket, flight, airport, passangers };