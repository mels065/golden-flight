const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class airport extends Model {}

airport.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allownull: false,
            primarykey: true,
            autoincrement: true,
        },
        AirportCode: {
            type: DataTypes.STRING,
            allownull: false,
        },
        AP_City: {
            type: DataTypes.STRING,
            allownull: false,
        },
        AP_Country: {
            type: DataTypes.STRING,
            allownull: false,
        },
    },
    {
        sequelize,
        timestamp: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'airport',
    }
);

module.exports = airport;