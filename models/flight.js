const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Flight extends Model {}

Flight.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        departingDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        departingCity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        arrivingCity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        takeOffTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        landingTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       
        airliner_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Airliner',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamp: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Flight',
    }
);

module.exports = Flight;