const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connection');

class Cantrip extends Model {

    async associateEffect(effect) {
        this.effectId = effect.id;
        await this.save();
    }
}

Cantrip.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    effectId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.Effect,
            key: 'id'
        }
    },
    uses: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1
        }
    }
},
{
    sequelize,
    freezeTableName: true,
    modelName: 'Cantrip'
});

module.exports = Cantrip;