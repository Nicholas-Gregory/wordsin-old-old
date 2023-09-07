const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

const EffectWord = require('./EffectWord');
const Keyword = require('./Keyword');

class Effect extends Model {
    
    async addKeyword(keyword) {
        await EffectWord.create({
            effectId: this.id,
            keywordId: keyword.id
        });
    }

    async addKeywordByWord(word) {
        await this.addKeyword(await Keyword.findOne({
            where: { word }
        }));
    }
}

Effect.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    ceil: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    time: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'Effect'
});

module.exports = Effect;