const {
    GraphQLObjectType, 
    GraphQLInt,
    GraphQLString
} = require('graphql');

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
        }
    })
});

module.exports = character;