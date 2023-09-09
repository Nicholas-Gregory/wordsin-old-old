const keywords = require('./keywords');
const effects = require('./effects');
const storylets = require('./storylets');

(async () => {
    await keywords.seed();
    await effects.seed();
    await storylets.seed();
})();