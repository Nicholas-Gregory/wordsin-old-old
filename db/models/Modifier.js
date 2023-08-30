const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connection');

const Keyword = require('./Keyword');

class Modifier extends Model {

    async associateKeyword(keyword) {
        this.keywordId = keyword.id;
        await this.save();
    }

    async word() {
        return (await Keyword.findByPk(this.keywordId)).word;
    }
}

Modifier.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    keywordId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.Keyword,
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1
        }
    }
},
{
    sequelize,
    freezeTableName: true,
    modelName: 'Modifier'
});

module.exports = Modifier;