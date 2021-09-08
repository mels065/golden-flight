const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Ticket extends Model {}

Ticket.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoincrement: true,
        },
        roundtrip: {
            type: DataTypes.BOOLEAN,
            allownull: false,
        },
        orderDate: {
            type: DataTypes.DATE,
            allownull: false,
            defaultValue: DataTypes.NOW,
        },
        baggage: {
            type: DataTypes.BOOLEAN,
            allownull: false,
        },
        customer_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Customer',
                Key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamp: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Ticket',
    }
);

module.exports = Ticket;