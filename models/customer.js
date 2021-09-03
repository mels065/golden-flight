const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class customer extends Model {}

customer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allownull: false,
            primarykey: true,
            autoIncrement: true,
        },
        UserName: {
            type: DataTypes.STRING,
            allownull: false,
        },
        Password: {
            type: DataTypes.STRING,
            allownull: false,
            validate: {
                len: [8],
            },
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
        Address1: {
            type: DataTypes.STRING,
            allownull: false,
        },
        Address2: {
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
        Postalcode: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
        Country: {
            type: DataTypes.STRING,
            allownull: false,
        },
    },
    {
        sequelize,
        timestamp: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'customer',
    }
);

module.exports = customer;