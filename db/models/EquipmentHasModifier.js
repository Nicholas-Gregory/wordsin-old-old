const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

class EquipmentHasModifier extends Model {}

EquipmentHasModifier.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    equipmentId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.Equipment,
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
    modelName: 'EquipmentHasModifier'
});

module.exports = EquipmentHasModifier;