const {
     GraphQLObjectType, 
     GraphQLString,
     GraphQLInt,
     GraphQLList
} = require('graphql');

const character = require('./character')
const User = require('../db/models/User')

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
            resolve: async user => await (await User.findByPk(user.id)).getCharacters()
        }
    })
});

module.exports = user;