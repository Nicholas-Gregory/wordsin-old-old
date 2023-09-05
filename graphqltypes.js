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

module.exports = {
    user, character, storylet
}