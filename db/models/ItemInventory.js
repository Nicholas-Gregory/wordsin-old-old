const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connection');

const ItemInInventory = require('./ItemInInventory');

class ItemInventory extends Model {

    async total() {
        return (await this.getItems()).length;
    }

    async add(item) {
        const through = await ItemInInventory.findOne({
            where: {
                inventoryId: this.id,
                itemId: item.id
            }
        });

        if (through) {
            if (this.total() < this.capacity) {
                through.quantity++;
                await through.save();
            }
        } else {
            await ItemInInventory.create({
                itemId: item.id,
                inventoryId: this.id,
                quantity: 1
            });
        }
    }

    async remove(item) {
        const through = await ItemInInventory.findOne({
            where: {
                inventoryId: this.id,
                itemId: item.id
            }
        });

        if (through) {
            if (through.quantity === 1) {
                await through.destroy();
            } else {
                through.quantity--;
                through.save();
            }
        }
    }
}

ItemInventory.init({
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
        defaultValue: 10,
        validate: {
            min: 1
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'ItemInventory'
});

module.exports = ItemInventory;