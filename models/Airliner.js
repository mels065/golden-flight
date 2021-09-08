const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Airliner extends Model {}

Airliner.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       
    },
    {
        sequelize,
        timestamp: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Airliner',
    }
);

module.exports = Airliner;