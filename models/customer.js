const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Customer extends Model {
    async checkPassword(loginPw) {
        return await bcrypt.compare(loginPw, this.password);
    }
}

Customer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        postalCode: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        
    },
    {
        hooks: {
            async beforeCreate(newcustomerData) {
              newcustomerData.password = await bcrypt.hash(newcustomerData.password, 10);
              return newcustomerData;
            },
            async beforeUpdate(updatedcustomerData) {
              updatedcustomerData.password = await bcrypt.hash(updatedcustomerData.password, 10);
              return updatedcustomerData;
            },
        },
        sequelize,
        timestamp: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Customer',
    }
);

module.exports = Customer;