const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class flight extends Model {}

flight.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allownull: false,
            primarykey: true,
            autoincrement: true,
        },
        ArrivingDate: {
            type: DataTypes.DATE,
            allownull: false,
        },
        DepartingDate: {
            type: DataTypes.DATE,
            allownull: false,
        }, 
        Ticket_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ticket',
                Key: 'id',
            },
        },
        Origin_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'airport',
                key: 'id',
            },
        },
        Destination_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'airport',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamp: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'flight',
    }
);

module.exports = flight;