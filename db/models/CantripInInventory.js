const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connection');

class CantripInInventory extends Model {}

CantripInInventory.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    cantripId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.Cantrip,
            key: 'id'
        }
    },
    inventoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.CantripInventory,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'CantripInInventory'
});

module.exports = CantripInInventory;