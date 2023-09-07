const keywords = require('./keywords');
const effects = require('./effects');

(async () => {
    await keywords.seed();
    await effects.seed();
})();