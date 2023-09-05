const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList
} = require('graphql')

const { user, character, storylet } = require('./graphqltypes');

const sequelize = require('./db/connection');
const models = require('./db/models');

const app = express();

const EXPRESS_PORT = 5000;

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'rootQuery',
        fields: () => ({
            users: {
                type: new GraphQLList(user),
                resolve: async () => await models.User.findAll({})
            },
            characters: {
                type: new GraphQLList(character),
                resolve: async () => await models.Character.findAll({})
            },
            storylets: {
                type: new GraphQLList(storylet),
                resolve: async () => await models.Storylet.findAll({})
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