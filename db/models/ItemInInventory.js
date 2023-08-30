const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

class ItemInInventory extends Model {}

ItemInInventory.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    itemId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.Item,
            key: 'id'
        }
    },
    inventoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.ItemInventory,
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
    modelName: 'ItemInInventory'
});

module.exports = ItemInInventory;