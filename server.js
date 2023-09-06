const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql')

const qlTypes = require('./graphqltypes');

const sequelize = require('./db/connection');
const models = require('./db/models');

const app = express();

const EXPRESS_PORT = 5000;

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'rootQuery',
        fields: () => ({
            users: {
                type: new GraphQLList(qlTypes.user),
                resolve: async () => await models.User.findAll({})
            },
            characters: {
                type: new GraphQLList(qlTypes.character),
                resolve: async () => await models.Character.findAll({})
            },
            storylets: {
                type: new GraphQLList(qlTypes.storylet),
                resolve: async () => await models.Storylet.findAll({})
            },
            keywords: {
                type: new GraphQLList(qlTypes.keyword),
                resolve: async () => await models.Keyword.findAll({})
            },
            affect: {
                type: new GraphQLList(qlTypes.affect),
                resolve: async () => await models.Affect.findAll({})
            }
        })
    }),
    mutation: new GraphQLObjectType({
        name: 'rootMutation',
        fields: () => ({
            addUser: {
                type: qlTypes.user,
                args: {
                    userName: { type: new GraphQLNonNull(GraphQLString) },
                    email: { type: new GraphQLNonNull(GraphQLString) },
                    password: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: async (_, args) => await models.User.create({
                    userName: args.userName,
                    email: args.email,
                    password: args.password
                })
            },
            addCharacter: {
                type: qlTypes.character,
                args: {
                    name: { type: new GraphQLNonNull(GraphQLString) },
                    userId: { type: GraphQLInt }
                },
                resolve: async (_, args) => await models.Character.create({
                        name: args.name,
                        userId: args.userId
                })
            }
        })
    })
});

app.use('/api', graphqlHTTP({
    graphiql: true,
    schema
}));

sequelize.sync({ force: true }).then(async () => {
    const keyword = await models.Keyword.create({
        word: 'open'
    })
    const affect = await models.Affect.create({
        requirement: 1
    });
    affect.associateKeyword(keyword);
    const storylet1 = await models.Storylet.create({
        body: "You see a chair"
    });
    const storylet2 = await models.Storylet.create({
        body: "The chair is red"
    });
    await storylet1.link(storylet2, [affect]);

    app.listen(EXPRESS_PORT, () => console.log(`Express server listening on port ${EXPRESS_PORT}`));
});