const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

class LinkInWorld extends Model {

    async update(state) {
        this.active = state;
        await this.save();        
    }
}

LinkInWorld.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    worldId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.World,
            key: 'id'
        }
    },
    linkId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.NextStorylet,
            key: 'id'
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,    
    freezeTableName: true,
    modelName: 'LinkInWorld'
});

module.exports = LinkInWorld;