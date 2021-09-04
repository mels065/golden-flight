const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class ticket extends Model {}

ticket.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allownull: false,
            primarykey: true,
            autoincrement: true,
        },
        OrderDate: {
            type: DataTypes.DATE,
            allownull: false,
            defaultValue: DataTypes.NOW,
        },
        Baggage: {
            type: DataTypes.BOOLEAN,
            allownull: false,
        },
        Status: {
            type: DataTypes.BOOLEAN,
            allownull: false,
        },
        Customer_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'customer',
                Key: 'id',
            },
        },
        Flight_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'flight',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamp: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'ticket',
    }
);

module.exports = ticket;