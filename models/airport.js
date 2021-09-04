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
        Airport: {
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
        modelName: 'airport',
    }
);

module.exports = airport;