const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

const GrimoireInInventory = require('./GrimoireInInventory')

class GrimoireInventory extends Model {

    async total() {
        return (await this.getGrimoires()).length;
    }

    async add(grimoire) {
        const through = await GrimoireInInventory.findOne({
            where: {
                inventoryId: this.id,
                grimoireId: grimoire.id
            }
        });

        if (through) {
            if (this.total() < this.capacity) {
                through.quantity++;
                await through.save();
            }
        } else {
            await GrimoireInInventory.create({
                grimoireId: grimoire.id,
                inventoryId: this.id,
                quantity: 1
            });
        }
    }

    async remove(grimoire) {
        const through = await GrimoireInInventory.findOne({
            where: {
                inventoryId: this.id,
                grimoireId: grimoire.id
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

GrimoireInventory.init({
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
}, 
{
    sequelize,
    freezeTableName: true,
    modelName: 'GrimoireInventory'
});

module.exports = GrimoireInventory;