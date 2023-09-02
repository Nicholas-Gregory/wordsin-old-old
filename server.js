const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')

const sequelize = require('./db/connection');
const models = require('./db/models');

const app = express();

const EXPRESS_PORT = 5000;

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'root',
        fields: () => ({
            use: { 
                type: GraphQLString,
                resolve: () => "Working"
            }
        })
    })
});

app.use('/api', graphqlHTTP({
    graphiql: true,
    schema
}));

sequelize.sync({ force: true }).then(async () => {
    app.listen(EXPRESS_PORT, () => console.log(`Express server listening on port ${EXPRESS_PORT}`));
});