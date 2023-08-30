const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connection');

class AffectToAdvance extends Model {

}

AffectToAdvance.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    next: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.NextStorylet,
            key: 'id'
        }
    },
    affectId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.Affect,
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'AffectToAdvance'
});

module.exports = AffectToAdvance;