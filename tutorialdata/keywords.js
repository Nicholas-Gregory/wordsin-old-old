const Keyword = require('../db/models/Keyword');

const keywordWords = [
    'blast',
    'lockpick',
    'strike',
    'club',
    'pierce',
    'jump',
    'slice',
    'smash',
    'burn',
    'wet',
    'freeze',
    'move',
    'open',
    'push',
    'evade',
    'hear',
    'smell',
    'see',
    'taste',
    'feel',
    'think'
];

module.exports = {
    seed: async () => {
        for (let word of keywordWords) {
            await Keyword.create({ word });
        }
    }
};