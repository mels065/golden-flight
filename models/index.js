const Customer = require('./Customer');
const Ticket = require('./Ticket');
const Airliner = require('./Airliner');
const Flight = require('./Flight');

Customer.hasMany(Ticket, {
    onDelete: 'CASCADE'
});

Ticket.belongsTo(Customer);

Flight.hasMany(Ticket, {
    onDelete: 'CASCADE'
});

Ticket.belongsTo(Flight, {
    foreignKey: 'flight_id'
});


Flight.belongsTo(Airliner, {
    foreignKey: 'airliner_id',
    onDelete: 'CASCADE'
});

Airliner.hasMany(Flight, {
    onDelete: 'CASCADE'
})


module.exports = { Customer, Ticket, Flight, Airliner };