const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

class Item extends Model {
    
    async associateEffect(effect) {
        this.effectId = effect.id;
        await this.save();
    }
}

Item.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
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
    modelName: 'Item'
});

module.exports = Item;