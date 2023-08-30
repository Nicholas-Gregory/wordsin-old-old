const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

const StateChange = require('./StateChange');
const AffectToAdvance = require('./AffectToAdvance');
const LinkInWorld = require('./LinkInWorld');
const NextStorylet = require('./NextStorylet');

class World extends Model {

    async changeState(affect) {
        const currentStorylet = await this.getStorylet();
        const links = await NextStorylet.findAll({
            where: {
                first: currentStorylet.id
            }
        });
        const advances = await AffectToAdvance.findAll({
            where: {
                affectId: affect.id,
                next: links.map(link => link.id)
            },
            include: {
                model: StateChange
            }
        });

        for (let advance of advances) {                  
            for (let state of advance.StateChanges) {
                await state.change();
            }
        }
    }

    async activeLinks() {
        const currentStorylet = await this.getStorylet();
        const sLinks = await currentStorylet.getLinks();
        const links = await LinkInWorld.findAll({
            where: {
                worldId: this.id,
                active: true
            }
        });

        return sLinks
        .filter(sLink => links
            .find(link => link.linkId === sLink.id));
    }

    async affectSucceeded(result) {
        const currentStorylet = await this.getStorylet();
        const affects = await currentStorylet.affectsToAdvance();
        const keywords = await Promise.all(affects
            .map(async affect => await affect.getKeyword()));
        const resultKeywords = result.keywords.map(keyword => keyword.word);

        for (let affect of affects) {
            if (affect.requirement <= result.amount &&
                keywords.find(keyword => resultKeywords.includes(keyword.word))) {
                    return affect;
            }
        }
    }

    async advance(affect) {
        const currentStorylet = await this.getStorylet();
        const activeLinks = await this.activeLinks(currentStorylet);        
        const affectLinks = await affect.getNextStorylets();
        const link = activeLinks.find(link => affectLinks.find(aLink => aLink.id === link.id));
        
        if (link) {
            this.currentStorylet = link.second;
            await this.save();
        }
    }
}

World.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    currentStorylet: {
        type: DataTypes.INTEGER,
        references: {
            model: sequelize.models.Storylet,
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'World'
});

module.exports = World;