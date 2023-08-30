const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

class EquipmentHasEnchantment extends Model{}

EquipmentHasEnchantment.init({
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
    equipmentId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.Enchantment,
            key: 'id'
        }
    }
}, 
{
    sequelize,
    freezeTableName: true,
    modelName: 'EquipmentHasEnchantment'
});

module.exports = EquipmentHasEnchantment;