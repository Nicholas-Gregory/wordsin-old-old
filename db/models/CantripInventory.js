const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connection');

class CantripInventory extends Model {

}

CantripInventory.init({
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
    capacity: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'CantripInventory'
});

module.exports = CantripInventory;