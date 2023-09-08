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
            affects: {
                type: new GraphQLList(qlTypes.affect),
                resolve: async () => await models.Affect.findAll({})
            },
            effects: {
                type: new GraphQLList(qlTypes.effect),
                resolve: async () => await models.Effect.findAll({})
            },
            items: {
                type: new GraphQLList(qlTypes.item),
                resolve: async () => await models.Item.findAll({})
            },
            modifiers: {
                type: new GraphQLList(qlTypes.modifier),
                resolve: async () => await models.Modifier.findAll({})
            },
            equipment: {
                type: new GraphQLList(qlTypes.equipment),
                resolve: async () => await models.Equipment.findAll({})
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
                    level: { type: GraphQLInt },
                    userId: { type: GraphQLInt }
                },
                resolve: async (_, args) => {
                    const character = await models.Character.create({
                        name: args.name,
                        userId: args.userId,
                        level: args.level
                    });

                    await character.initInventories();

                    return character;
                }
            },
            addStorylet: {
                type: qlTypes.storylet,
                args: {
                    title: { type: new GraphQLNonNull(GraphQLString) },
                    body: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: async (_, args) => await models.Storylet.create({
                    title: args.title,
                    body: args.body
                })
            },
            addKeyword: {
                type: qlTypes.keyword,
                args: {
                    word: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: async (_, args) => await models.Keyword.create({
                    word: args.word
                })
            },
            addAffect: {
                type: qlTypes.affect,
                args: {
                    requirement: { type: new GraphQLNonNull(GraphQLInt) },
                    keywordId: { type: new GraphQLNonNull(GraphQLInt) }
                },
                resolve: async (_, args) => {
                    const affect = await models.Affect.create({
                        keywordId: args.keywordId,
                        requirement: args.requirement
                    });
                    const keyword = await models.Keyword.findByPk(args.keywordId);

                    await affect.associateKeyword(keyword);

                    return affect;
                }
            },
            linkStorylets: {
                type: GraphQLString,
                args: {
                    first: { type: new GraphQLNonNull(GraphQLInt) },
                    second: { type: new GraphQLNonNull(GraphQLInt) },
                    affectIds: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt))}
                },
                resolve: async (_, args) => {
                    const first = await models.Storylet.findByPk(args.first);
                    const second = await models.Storylet.findByPk(args.second);
                    const affects = await Promise.all(
                        args.affectIds
                        .map(async id => await models.Affect.findByPk(id))
                    );

                    await first.link(second, affects);

                    return "Storylets linked"
                }
            },
            addEffect: {
                type: qlTypes.effect,
                args: {
                    ceil: { type: new GraphQLNonNull(GraphQLInt) },
                    time: { type: new GraphQLNonNull(GraphQLInt) },
                    keywordIds: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
                },
                resolve: async (_, args) => {
                    const effect = await models.Effect.create({
                        ceil: args.ceil,
                        time: args.time
                    });

                    for (let id of args.keywordIds) {
                        let keyword = await models.Keyword.findByPk(id);

                        await effect.addKeyword(keyword);
                    }

                    return effect;
                }
            },
            addItem: {
                type: qlTypes.item,
                args: {
                    name: { type: new GraphQLNonNull(GraphQLString) },
                    description: { type: new GraphQLNonNull(GraphQLString) },
                    effectId: { type: GraphQLInt }
                },
                resolve: async (_, args) => {
                    const item = await models.Item.create({
                        name: args.name,
                        description: args.description,
                    });
                    const effect = await models.Effect.findByPk(args.effectId)

                    await item.associateEffect(effect);

                    return item;
                } 
            },
            addModifier: {
                type: qlTypes.modifier,
                args: {
                    amount: { type: new GraphQLNonNull(GraphQLInt) },
                    keywordId: { type: GraphQLInt }
                },
                resolve: async (_, args) => {
                    const modifier = await models.Modifier.create({
                        amount: args.amount,                        
                    });
                    const keyword = await models.Keyword.findByPk(args.keywordId);

                    await modifier.associateKeyword(keyword);

                    return modifier;
                }
            },
            addEquipment: {
                type: qlTypes.equipment,
                args: {
                    name: { type: new GraphQLNonNull(GraphQLString) },
                    description: { type: new GraphQLNonNull(GraphQLString) },
                    type: { type: GraphQLString },
                    effectId: { type: GraphQLInt },
                    modifierIds: { type: new GraphQLList(GraphQLInt) }
                },
                resolve: async (_, args) => {
                    const equipment = await models.Equipment.create({
                        name: args.name,
                        description: args.description,
                        type: args.type,
                        effectId: args.effectId
                    });

                    for (let id of args.modifierIds) {
                        const modifier = await models.Modifier.findByPk(id);

                        await equipment.addModifier(modifier);
                    }

                    return equipment;
                }
            }
        })
    })
});

app.use('/api', graphqlHTTP({
    graphiql: true,
    schema
}));

sequelize.sync({ force: true }).then(async () => {
    require('./tutorialdata');
    app.listen(EXPRESS_PORT, () => console.log(`Express server listening on port ${EXPRESS_PORT}`));
});