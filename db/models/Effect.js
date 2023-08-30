const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

const EffectWord = require('./EffectWord');

class Effect extends Model {
    
    async addKeyword(keyword) {
        await EffectWord.create({
            effectId: this.id,
            keywordId: keyword.id
        });
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
        validate: {
            min: 1
        }
    },
    time: {
        type: DataTypes.INTEGER,
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