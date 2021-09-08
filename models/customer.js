const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Customer extends Model {
    async checkPassword(loginPw) {
        console.log(loginPw);
        console.log(this);
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
            unique: true
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