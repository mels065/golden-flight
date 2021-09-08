const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Customer extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.Password);
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
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
        
    },
    {
        hooks: {
            beforeCreate: async (newcustomerData) => {
              newcustomerData.password = await bcrypt.hash(newcustomerData.password, 10);
              return newcustomerData;
            },
            beforeUpdate: async (updatedcustomerData) => {
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