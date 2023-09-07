const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = require('graphql');

const models = require('./db/models')

const user = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        userName: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        characters: {
            type: new GraphQLList(character),
            resolve: async user => await (await models.User.findByPk(user.id)).getCharacters()
        }
    })
});

const character = new GraphQLObjectType({
    name: 'character',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        level: {
            type: GraphQLInt
        },
        user: {
            type: user,
            resolve: async character => await (await models.Character.findByPk(character.id)).getUser()
        }
    })
});

const storylet = new GraphQLObjectType({
    name: 'storylet',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        next: {
            type: new GraphQLList(storylet),
            resolve: async current => await (await models.Storylet.findByPk(current.id)).getNext()
        },
        previous: {
            type: new GraphQLList(storylet),
            resolve: async current => await (await models.Storylet.findByPk(current.id)).getPrevious()
        }
    })
});

const keyword = new GraphQLObjectType({
    name: 'keyword',
    fields: () => ({
        id: { type: GraphQLInt },
        word: { type: GraphQLString }
    })
});

const affect = new GraphQLObjectType({
    name: 'affect',
    fields: () => ({
        id: { type: GraphQLInt },
        requirement: { type: GraphQLInt },
        keyword: {
            type: keyword,
            resolve: async affect => await (await models.Affect.findByPk(affect.id)).getKeyword()
        }
    })
});

const effect = new GraphQLObjectType({
    name: 'effect',
    fields: () => ({
        id: { type: GraphQLInt },
        ceil: { type: GraphQLInt },
        time: { type: GraphQLInt },
        keywords: {
            type: new GraphQLList(keyword),
            resolve: async effect => await (await models.Effect.findByPk(effect.id)).getKeywords()
        }
    })
});

const item = new GraphQLObjectType({
    name: 'item',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        effect: {
            type: effect,
            resolve: async item => await (await models.Item.findByPk(item.id)).getEffect()
        }
    })
});

const modifier = new GraphQLObjectType({
    name: 'modifier',
    fields: () => ({
        id: { type: GraphQLInt },
        amount: { type: GraphQLInt },
        keyword: {
            type: keyword,
            resolve: async modifier => await (await models.Modifier.findByPk(modifier.id)).getKeyword()
        }
    })
});

const equipment = new GraphQLObjectType({
    name: 'equipment',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        type: { type: GraphQLString },
        effect: {
            type: effect,
            resolve: async equipment => await (await models.Equipment.findByPk(equipment.id)).getEffect()
        },
        modifiers: { 
            type: new GraphQLList(modifier),
            resolve: async equipment => await (await models.Equipment.findByPk(equipment.id)).getModifiers()
        }
    })
});

module.exports = {
    user, character, storylet,
    keyword, affect, effect,
    item,
    modifier, equipment
}