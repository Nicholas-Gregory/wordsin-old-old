const { Effect, Keyword } = require('../db/models');

module.exports = {
    seed: async () => {
        const weakLockpick = await Effect.create({
            ceil: 10,
            time: 3
        });
        await weakLockpick.addKeywordByWord("lockpick");

        const strongLockpick = await Effect.create({
            ceil: 30,
            time: 10
        });
        await strongLockpick.addKeywordByWord("lockpick");
    }
}