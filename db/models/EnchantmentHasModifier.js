const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

class EnchantmentHasModifier extends Model {}

EnchantmentHasModifier.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    enchantmentId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.Enchantment,
            key: 'id'
        }
    },
    modifierId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.Modifier,
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'EnchantmentHasModifier'
});

module.exports = EnchantmentHasModifier;