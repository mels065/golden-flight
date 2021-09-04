const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class passangers extends Model {}

passangers.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allownull: false,
            primarykey: true,
            autoincrement: true,
        },
        FirstName: {
            type: DataTypes.STRING,
            allownull: false,
        },
        LastName: {
            type: DataTypes.STRING,
            allownull: false,
        },
        Phone: {
            type: DataTypes.INTEGER,
            allownull: false,
            validate: {
                len: [9],
            },
        },
        Address: {
            type: DataTypes.STRING,
            allownull: false,
        },
        City: {
            type: DataTypes.STRING,
            allownull: false,
        },
        State: {
            type: DataTypes.STRING,
            allownull: false,
        },
        Country: {
            type: DataTypes.STRING,
            allownull: false,
        },
        Customer_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'customer',
                Key: 'id',
            },
        },
        Ticket_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ticket',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamp: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'passangers',
    }
);

module.exports = passangers;