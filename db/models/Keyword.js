const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

class Keyword extends Model {

    compare(keyword) {
        return this.word === keyword.word;
    }
}

Keyword.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    word: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'Keyword'
});

module.exports = Keyword;