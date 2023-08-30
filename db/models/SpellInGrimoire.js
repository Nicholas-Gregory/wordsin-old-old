const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

class SpellInGrimoire extends Model {}

SpellInGrimoire.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    spellId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.Spell,
            key: 'id'
        }
    },
    grimoireId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.Grimoire,
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'SpellInGrimoire'
});

module.exports = SpellInGrimoire;