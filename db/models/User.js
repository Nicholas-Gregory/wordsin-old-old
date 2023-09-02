const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');
const bcrypt = require('bcrypt');

class User extends Model {
    
    comparePasswordHash(clearText) {
        return bcrypt.compareSync(clearText, this.password);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        },
        set(value) {
            this.setDataValue('password', bcrypt.hashSync(value, 10));
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'User'
});

module.exports = User;