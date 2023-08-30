const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

const EnchantmentHasModifier = require('./EnchantmentHasModifier');

class Enchantment extends Model {

    async addModifier(modifier) {
        await EnchantmentHasModifier.create({
            enchantmentId: this.id,
            modifierId: modifier.id
        });
    }
}

Enchantment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    cap: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'Enchantment'
});

module.exports = Enchantment;