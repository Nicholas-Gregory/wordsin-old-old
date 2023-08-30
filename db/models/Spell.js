const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

class Spell extends Model {

    async associateEffect(effect) {
        this.effectId = effect.id;
        await this.save();
    }
}

Spell.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    cost: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.Affect,
            key: 'id'
        }
    },
    effectId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.Effect,
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'Spell'
});

module.exports = Spell;