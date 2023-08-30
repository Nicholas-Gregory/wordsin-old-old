const roll = (ceil, ...mods) => Math.ceil(Math.random() * ceil) + mods.reduce((sum, mod) => sum + mod, 0);

module.exports = {
    roll
}