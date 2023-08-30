const Character = require('./Character');
const ItemInventory = require('./ItemInventory');
const Item = require('./Item');
const Keyword = require('./Keyword');
const Effect = require('./Effect');
const EffectWord = require('./EffectWord');
const Spell = require('./Spell');
const Grimoire = require('./Grimoire');
const EquipmentInventory = require('./EquipmentInventory');
const Equipment = require('./Equipment');
const GrimoireInventory = require('./GrimoireInventory');
const EquipmentInInventory = require('./EquipmentInInventory');
const ItemInInventory = require('./ItemInInventory');
const GrimoireInInventory = require('./GrimoireInInventory');
const SpellInGrimoire = require('./SpellInGrimoire');
const Affect = require ('./Affect');
const Modifier = require('./Modifier');
const EquipmentHasModifier = require('./EquipmentHasModifier');
const Enchantment = require('./Enchantment');
const EnchantmentHasModifier = require('./EnchantmentHasModifier');
const Storylet = require('./Storylet');
const NextStorylet = require('./NextStorylet');
const AffectToAdvance = require('./AffectToAdvance');
const Cantrip = require('./Cantrip');
const CantripInventory = require('./CantripInventory');
const CantripInInventory = require('./CantripInInventory');
const SkillModifier = require('./SkillModifier');
const EquipmentHasEnchantment = require('./EquipmentHasEnchantment');
const World = require('./World');
const LinkInWorld = require('./LinkInWorld');
const StateChange = require('./StateChange');

Character.hasOne(ItemInventory, { foreignKey: 'characterId' });
ItemInventory.belongsTo(Character, { foreignKey: 'characterId' });

Character.hasOne(EquipmentInventory, { foreignKey: 'characterId' });
EquipmentInventory.belongsTo(Character, { foreignKey: 'characterId' });

Character.hasOne(GrimoireInventory, { foreignKey: 'characterId' });
GrimoireInventory.belongsTo(Character, { foreignKey: 'characterId' });

Character.hasOne(CantripInventory, { foreignKey: 'characterId' });
CantripInventory.belongsTo(Character, { foreignKey: 'characterId' });

Character.belongsToMany(Modifier, {
    through: SkillModifier,
    foreignKey: 'characterId'
});
Modifier.belongsToMany(Character, {
    through: SkillModifier,
    foreignKey: 'modifierId'
});

World.hasMany(Character, { foreignKey: 'worldId' });
Character.belongsTo(World, { foreignKey: 'worldId' });

Storylet.hasMany(World, { foreignKey: 'currentStorylet' });
World.belongsTo(Storylet, { foreignKey: 'currentStorylet' });

EquipmentInventory.belongsToMany(Equipment, {
    through: EquipmentInInventory,
    foreignKey: 'inventoryId' 
});
Equipment.belongsToMany(EquipmentInventory, {
    through: EquipmentInInventory,
    foreignKey: 'equipmentId'
});

ItemInventory.belongsToMany(Item, {
    through: ItemInInventory,
    foreignKey: 'inventoryId'
});
Item.belongsToMany(ItemInventory, {
    through: ItemInInventory,
    foreignKey: 'itemId'
})

GrimoireInventory.belongsToMany(Grimoire, {
    through: GrimoireInInventory,
    foreignKey: 'inventoryId'
});
Grimoire.belongsToMany(GrimoireInventory, {
    through: GrimoireInInventory,
    foreignKey: 'grimoireId'
});

Keyword.belongsToMany(Effect, {
    through: EffectWord,
    foreignKey: 'keywordId'
});
Effect.belongsToMany(Keyword, {
    through: EffectWord,
    foreignKey: 'effectId'
});

Effect.hasMany(Spell, { foreignKey: 'effectId' });
Spell.belongsTo(Effect, { foreignKey: 'effectId' });

Effect.hasMany(Equipment, { foreignKey: 'effectId' });
Equipment.belongsTo(Effect, { foreignKey: 'effectId' });

Effect.hasMany(Item, { foreignKey: 'effectId' });
Item.belongsTo(Effect, { foreignKey: 'effectId' });

Grimoire.belongsToMany(Spell, {
    through: SpellInGrimoire,
    foreignKey: 'grimoireId'
});
Spell.belongsToMany(Grimoire, {
    through: SpellInGrimoire,
    foreignKey: 'spellId'
});

Keyword.hasMany(Affect, { foreignKey: 'keywordId' });
Affect.belongsTo(Keyword, { foreignKey: 'keywordId' });

Keyword.hasMany(Modifier, { foreignKey: 'keywordId' });
Modifier.belongsTo(Keyword, { foreignKey: 'keywordId' });

Affect.hasMany(Spell, { foreignKey: 'cost' });
Spell.belongsTo(Affect, { foreignKey: 'cost' });

Equipment.belongsToMany(Modifier, {
    through: EquipmentHasModifier,
    foreignKey: 'equipmentId'
});
Modifier.belongsToMany(Equipment, {
    through: EquipmentHasModifier,
    foreignKey: 'modifierId'
});

Enchantment.belongsToMany(Modifier, {
    through: EnchantmentHasModifier,
    foreignKey: 'enchantmentId'
});
Modifier.belongsToMany(Enchantment, {
    through: EnchantmentHasModifier,
    foreignKey: 'modifierId'
});

Equipment.belongsToMany(Enchantment, {
    through: EquipmentHasEnchantment,
    foreignKey: 'equipmentId'
});
Enchantment.belongsToMany(Equipment, {
    through: EquipmentHasEnchantment,
    foreignKey: 'enchantmentId'
});

Storylet.belongsToMany(Storylet, {
    through: NextStorylet,
    foreignKey: 'second',
    as: 'next'
});
Storylet.belongsToMany(Storylet, {
    through: NextStorylet,
    foreignKey: 'first',
    as: 'previous'
});

Affect.belongsToMany(NextStorylet, {
    through: AffectToAdvance,
    foreignKey: 'affectId'
});
NextStorylet.belongsToMany(Affect, {
    through: AffectToAdvance,
    foreignKey: 'next'
});

Effect.hasMany(Cantrip, { foreignKey: 'effectId' });
Cantrip.belongsTo(Effect, { foreignKey: 'effectId' });

Cantrip.belongsToMany(CantripInventory, {
    through: CantripInInventory,
    foreignKey: 'cantripId'
});
CantripInventory.belongsToMany(Cantrip, {
    through: CantripInInventory,
    foreignKey: 'inventoryId'
});

World.belongsToMany(NextStorylet, {
    through: LinkInWorld,
    foreignKey: 'worldId'
});
NextStorylet.belongsToMany(World, {
    through: LinkInWorld,
    foreignKey: 'linkId'
});

LinkInWorld.hasMany(StateChange, { foreignKey: 'linkId' });
StateChange.belongsTo(LinkInWorld, { foreignKey: 'linkId' });

AffectToAdvance.hasMany(StateChange, { foreignKey: 'advanceId' });
StateChange.belongsTo(AffectToAdvance, { foreignKey: 'advanceId' });

module.exports = {
    Character, 
    ItemInventory, Item,
    Keyword, Effect, EffectWord,
    Spell, Grimoire, GrimoireInventory,
    Equipment, EquipmentInventory,
    EquipmentInInventory, ItemInInventory, GrimoireInInventory, SpellInGrimoire,
    Affect, Modifier, EquipmentHasModifier,
    Enchantment, EnchantmentHasModifier, EquipmentHasEnchantment,
    Storylet, NextStorylet, AffectToAdvance,
    Cantrip, CantripInventory, CantripInInventory,
    World, LinkInWorld, StateChange
};