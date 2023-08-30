const { DataTypes, Model } = require('sequelize');
const sequelize = require('../connection');

class StateChange extends Model {

    async change() {
        await (await this.getLinkInWorld()).update(this.state);
    }
}

StateChange.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    linkId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.LinkInWorld,
            key: 'id'
        }
    },
    advanceId: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.AffectToAdvance,
            key: 'id'
        }
    },
    state: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'StateChange'
});

module.exports = StateChange;