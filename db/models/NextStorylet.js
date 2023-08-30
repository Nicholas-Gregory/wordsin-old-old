const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

class NextStorylet extends Model {}

NextStorylet.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    second: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.Storylet,
            key: 'id'
        }
    },
    first: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.Storylet,
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'NextStorylet'
});

module.exports = NextStorylet;