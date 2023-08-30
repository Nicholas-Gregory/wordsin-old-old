const { avg, weirdAvg } = require('./stats');

const combine = (...effects) => ({
    keywords: effects.reduce(
        (keywords, effect) => keywords.concat(effect.keywords.reduce(
            (innerKeywords, keyword) => innerKeywords.concat([keyword]), []
        )), []
    ),
    ceil: weirdAvg(...effects.map(effect => effect.ceil)),
    time: avg(...effects.map(effect => effect.time))
});

const affect = (result, affectList) => {    
    const successes = [];

    for (let affect of affectList) {
        if (result.roll >= affect.requirement) {
            if (result.keywords.includes(affect.keyword)) {
                successes.push(affect);
            }
        }
    }

    return successes;
}

module.exports = {
    combine, affect
};