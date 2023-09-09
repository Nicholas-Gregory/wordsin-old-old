const { Storylet, Affect } = require('../db/models/');

module.exports = {
    seed: async () => {
        const storylet1 = await Storylet.create({
            title: "title 1",
            body: "body 1"
        });
        const storylet2 = await Storylet.create({
            title: "title 2",
            body: "body 2"
        });
        const storylet3 = await Storylet.create({
            title: "title 3",
            body: "body 3"
        });

        const affect = await Affect.create({
            keywordId: 1,
            requirement: 1
        });

        await storylet1.link(storylet2, [affect]);
        await storylet2.link(storylet3, [affect]);
    }
}