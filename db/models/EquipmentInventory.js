const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

const EquipmentInInventory = require('./EquipmentInInventory');

class EquipmentInventory extends Model {

    static typeMaxes = {
        head: 1,
        bodyUnder: 1,
        bodyOver: 1,
        legs: 1,
        jewlery: 5,
        pocket: 4
    }

    async total() {
        return (await this.getEquipment()).length;
    }

    async add(equipment) {
        const through = await EquipmentInInventory.findOne({
            where: {
                inventoryId: this.id,
                equipmentId: equipment.id
            }
        });
        const ofSameType = (await this.getEquipment())
        .filter(item => item.type === equipment.type)
        .length;

        if (ofSameType < EquipmentInventory.typeMaxes[equipment.type]) {
            if (through) {
                if (this.total() < this.capacity) {
                    through.quantity++;
                    await through.save();
                }
            } else {
                await EquipmentInInventory.create({
                    equipmentId: equipment.id,
                    inventoryId: this.id,
                    quantity: 1
                });
            }
        }
    }

    async remove(equipment) {
        const through = await EquipmentInInventory.findOne({
            where: {
                inventoryId: this.id,
                equipmentId: equipment.id
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

EquipmentInventory.init({
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
    modelName: 'EquipmentInventory'
});

module.exports = EquipmentInventory;