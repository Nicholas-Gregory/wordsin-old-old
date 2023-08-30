const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

const SpellInGrimoire = require('./SpellInGrimoire');

class Grimoire extends Model {

    async addSpell(spell) {
        await SpellInGrimoire.create({
            spellId: spell.id,
            grimoireId: this.id
        });
    }
}

Grimoire.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'Grimoire'
});

module.exports = Grimoire;