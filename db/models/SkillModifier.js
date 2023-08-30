const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

class SkillModifier extends Model {}

SkillModifier.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    characterId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.Character,
            key: 'id'
        }
    },
    modifierId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.Modifier
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'SkillModifier'
});

module.exports = SkillModifier;