const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connection');

const ItemInventory = require('./ItemInventory');
const EquipmentInventory = require('./EquipmentInventory');
const GrimoireInventory = require('./GrimoireInventory');
const { roll } = require('../../lib/roll');

class Character extends Model {
    
    async initInventories() {
        await ItemInventory.create({
            characterId: this.id
        });
        await EquipmentInventory.create({
            characterId: this.id
        });
        await GrimoireInventory.create({
            characterId: this.id
        });
    }

    async addItemToInventory(item) {
        await (await this.getItemInventory()).add(item);
    }

    async addEquipmentToInventory(equipment) {
        await (await this.getEquipmentInventory()).add(equipment);
    }

    async addGrimoireToInventory(grimoire) {
        await (await this.getGrimoireInventory()).add(grimoire);
    }

    async equipment() {
        return await (await this.getEquipmentInventory()).getEquipment();
    }

    async equipmentModifiers() {
        const equipment = await this.equipment();        
        const result = [];

        for (let equip of equipment) {            
            result.push(...await equip.getModifiers());
            for (let enchantment of await equip.getEnchantments()) {
                result.push(...await enchantment.getModifiers());
            }
        }

        return result;
    }

    async allModifiers() {
        const equipmentModifiers = await this.equipmentModifiers();
        const skillModifiers = await this.getModifiers();

        return [...equipmentModifiers, ...skillModifiers];
    }

    async putInWorld(world) {
        this.worldId = world.id;
        await this.save();
    }

    async getResult(effect) {
        const modifiers = await this.allModifiers();
        const keywords = await effect.getKeywords();
        const effectKeywords = keywords.map(keyword => keyword.word);

        const activeModifiers = [];
        for (let modifier of modifiers) {
            if (effectKeywords.includes((await modifier.getKeyword()).word)) {
                activeModifiers.push(modifier);
            }
        }

        return {
            keywords: keywords,
            amount: roll(effect.ceil, ...activeModifiers.map(modifier => modifier.amount))
        };
    }

    async use(item) {
        const inventory = await this.getItemInventory();
        const effect = await item.getEffect();

        await inventory.remove(item);

        return await this.getResult(effect);
    }

    async cast(spell) {

    }
}

Character.init({
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
    quanta: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0
        }
    },
    level: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1
        }
    },
    worldId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.World,
            key: 'id'
        }
    }
},
{
    sequelize,
    freezeTableName: true,
    modelName: 'Character'
});

module.exports = Character;