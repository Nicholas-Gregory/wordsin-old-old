const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList
} = require('graphql')

const { user } = require('./graphqltypes');

const sequelize = require('./db/connection');
const models = require('./db/models');

const app = express();

const EXPRESS_PORT = 5000;

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'rootQuery',
        fields: () => ({
            user: {
                type: new GraphQLList(user),
                resolve: async () => await models.User.findAll({})
            }
        })
    })
});

app.use('/api', graphqlHTTP({
    graphiql: true,
    schema
}));

sequelize.sync({ force: true }).then(async () => {
    const user1 = await models.User.create({
        userName: "test",
        password: "test1234",
        email: "test@test.com"
    });
    const user2 = await models.User.create({
        userName: "user2",
        password: "password123",
        email: "user2@test.com"
    });
    const character = await models.Character.create({
        name: "george",
        userId: user2.id
    });
    
    app.listen(EXPRESS_PORT, () => console.log(`Express server listening on port ${EXPRESS_PORT}`));
});