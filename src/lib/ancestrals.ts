export type Shape = "dragon" | "serpent" | "bird" | "beast" | "ghost" | "moon";
export type Ancestral = {
  id: string;
  name: string;
  types: string[];
  specialty: string;
  description: string;
  abilities: [string, string][];
  trait: string;
  sprite: { shape: Shape; main: string; accent: string; aura: string };
};

const a = (
  id: string,
  name: string,
  types: string[],
  specialty: string,
  description: string,
  abilities: [string, string][],
  trait: string,
  sprite: Ancestral["sprite"],
): Ancestral => ({ id, name, types, specialty, description, abilities, trait, sprite });

export const ANCESTRALS: Ancestral[] = [
  a("darkrai", "Darkrai", ["Dark"], "Control, sleep and weakening.", "A creature tied to nightmares, able to incapacitate foes and strike vulnerable targets.", [["Eternal Nightmare", "Deals dark damage with a chance to put the target to sleep."], ["Veil of Darkness", "Lowers the accuracy of enemies hit."], ["Dream Rupture", "Deals bonus damage to sleeping targets."]], "Dream Hunter", { shape: "ghost", main: "#2B2238", accent: "#E0E0E8", aura: "#A96BFF" }),
  a("dragonite-mg", "Dragonite MG", ["Dragon", "Flying"], "Physical strength, mobility and endurance.", "A special Dragonite variant combining draconic strength, aerial mobility and resilience.", [["Draconic Impact", "A powerful physical blow."], ["Celestial Wings", "An aerial attack with a chance to stun."], ["Dragon's Fury", "Temporarily raises attack."]], "Draconic Spirit", { shape: "dragon", main: "#F2A03D", accent: "#7FC4A0", aura: "#FFD873" }),
  a("giratina", "Giratina", ["Ghost", "Dragon"], "Dimensional damage, endurance and weakening.", "A dimensional entity that warps reality and controls the battlefield.", [["Dimensional Claw", "Deals ghostly damage and may cause bleeding."], ["Distortion Portal", "Deals area damage."], ["Reality Rupture", "Temporarily lowers the target's defense."]], "Lord of the Distortion", { shape: "serpent", main: "#3A3046", accent: "#E14B3B", aura: "#FFC94D" }),
  a("groudon-shiny", "Groudon Shiny", ["Ground"], "Physical strength, endurance and area damage.", "A terrestrial colossus specialized in brute force and wide-reaching attacks.", [["Continental Quake", "A tremor that deals area damage."], ["Magma Fist", "A physical blow with a chance to burn."], ["Plate Fury", "Temporarily raises attack and defense."]], "Earth Core", { shape: "beast", main: "#C9B23A", accent: "#3A3046", aura: "#FFD34D" }),
  a("cresselia", "Cresselia", ["Psychic"], "Healing, protection and support.", "A lunar creature able to shield allies, restore health and weaken foes.", [["Moonlight", "Restores part of its health."], ["Dream Barrier", "Reduces damage taken."], ["Psychic Pulse", "Deals damage and may lower the target's special attack."]], "Lunar Blessing", { shape: "moon", main: "#F2C14D", accent: "#F58AB8", aura: "#D9B8FF" }),
  a("kyurem", "Kyurem", ["Dragon", "Ice"], "Freezing, slowing and high damage.", "A glacial dragon that commands extreme cold and hinders enemy movement.", [["Glacial Prison", "Deals Ice damage and lowers speed."], ["Void Breath", "A freezing blast in a line."], ["Freezing Rupture", "Deals bonus damage to frozen targets."]], "Heart of Ice", { shape: "dragon", main: "#8C9AA8", accent: "#63CFE0", aura: "#B7EEF7" }),
  a("latias", "Latias Ancestral", ["Dragon", "Psychic"], "Evasion, protection and support.", "An agile, protective ancestral variant specialized in psychic energy and defense.", [["Ancestral Reflex", "Temporarily raises evasion."], ["Eon Lance", "A high-damage psychic projectile."], ["Crimson Shield", "Protects Latias or an ally."]], "Eon Memory", { shape: "bird", main: "#E14B3B", accent: "#F6F1E4", aura: "#F58AB8" }),
  a("latios", "Latios Ancestral", ["Dragon", "Psychic"], "Speed, precision and special damage.", "Latias' offensive counterpart, specialized in fast attacks and psychic energy.", [["Eon Rush", "A swift attack that may hit twice."], ["Mind Comet", "Deals psychic area damage."], ["Horizon Tear", "A draconic attack that ignores part of the defense."]], "Eon Flight", { shape: "bird", main: "#3C6BE0", accent: "#F6F1E4", aura: "#7FA0F5" }),
  a("lugia-m-shiny", "Lugia M Shiny", ["Psychic", "Flying"], "Defense, counterattack and control.", "A special Lugia variant with a shadowy look, great resilience and long-range attacks.", [["Abyssal Whirl", "Deals area damage."], ["Psychic Wall", "Temporarily reduces damage taken."], ["Guardian Wave", "Deals damage and may interrupt enemies."]], "Shadow Guardian", { shape: "bird", main: "#3A3046", accent: "#A96BFF", aura: "#6B4BA0" }),
  a("lugia-shiny-ancestral", "Lugia Shiny Ancestral", ["Psychic", "Flying"], "Protection, healing and area control.", "A celestial Lugia variant, extremely rare and specialized in group protection.", [["Ancestral Aurora", "Gradually restores health."], ["Wings of Eternity", "Protects Lugia and nearby allies."], ["Celestial Judgment", "A psychic area attack."]], "Legacy of the Ages", { shape: "bird", main: "#F6F1E4", accent: "#F58AB8", aura: "#FFC94D" }),
  a("mega-charizard", "Mega Charizard", ["Fire", "Flying"], "Explosive damage and offensive pressure. (X: Fire/Dragon · Y: Fire/Flying)", "A Mega variant specialized in powerful flames and offensive attacks.", [["Mega Flame", "A high-damage fire explosion."], ["Blazing Dive", "An aerial charge that may burn."], ["Devastating Sun", "Temporarily raises Fire damage."]], "Living Furnace", { shape: "dragon", main: "#F2803D", accent: "#3C9BD8", aura: "#FFD873" }),
  a("mega-lugia-ancestral", "Mega Lugia Ancestral", ["Psychic", "Flying"], "Advanced protection, area damage and weakening.", "An elite variant of the guardian of the seas, combining resilience and ancestral energy.", [["Primordial Storm", "Deals area damage."], ["Shield of the Ancients", "Reduces damage and protects allies."], ["Celestial Resonance", "Deals psychic damage and weakens the target."]], "Sovereign of the Skies", { shape: "bird", main: "#E8EEF8", accent: "#3C6BE0", aura: "#63CFE0" }),
  a("mega-charizard-x", "Mega Charizard X", ["Fire", "Dragon"], "Physical damage, burning and defense break.", "A blue-flame form specialized in physical combat and draconic attacks.", [["Draconic Claws", "A physical Dragon blow."], ["Blue Flame", "Deals Fire damage and may burn the target."], ["Dragon Rupture", "Lowers the opponent's defense."]], "Draconic Flame", { shape: "dragon", main: "#2B2238", accent: "#3CB8F0", aura: "#63CFE0" }),
  a("rayquaza-shiny", "Rayquaza Shiny", ["Dragon", "Flying"], "Speed, mobility and high damage.", "A rare variant of the celestial dragon, prized for its look and offensive power.", [["Celestial Ascent", "Raises speed and attack."], ["Meteor Tail", "A high-impact draconic blow."], ["Atmospheric Rupture", "Deals area damage and may interrupt enemies."]], "Sky Predator", { shape: "serpent", main: "#2B2238", accent: "#FFC94D", aura: "#FFD873" }),
  a("rayquaza", "Rayquaza", ["Dragon", "Flying"], "Consistent damage, mobility and control.", "A legend of the skies with draconic attacks and the power to weaken foes.", [["Draconic Tornado", "Deals area damage."], ["Firmament Rush", "A swift attack."], ["Atmospheric Roar", "Temporarily lowers nearby enemies' attack."]], "Celestial Balance", { shape: "serpent", main: "#3A9B5A", accent: "#F2D33D", aura: "#7FE0A0" }),
  a("reshiram", "Reshiram", ["Dragon", "Fire"], "Special attack, burning and focused damage.", "A fire dragon tied to truth, specialized in high-power special attacks.", [["Flame of Truth", "A high-damage fire explosion."], ["Dragon Pulse", "A projectile of draconic energy."], ["White Sun", "Temporarily boosts Fire attacks."]], "Blazing Truth", { shape: "dragon", main: "#F6F1E4", accent: "#E14B3B", aura: "#F58A72" }),
  a("zekrom", "Zekrom", ["Dragon", "Electric"], "Physical attack, electricity and paralysis.", "An electric dragon tied to ideals, with physical blows and the power to paralyze.", [["Bolt of Ideals", "Deals electric damage and may paralyze."], ["Thunder Rush", "A high-power physical blow."], ["Plasma Core", "An electric discharge in an area."]], "Stormbound Ideal", { shape: "dragon", main: "#1E1A26", accent: "#3CB8F0", aura: "#7FD8FF" }),
];

export const ANCESTRAL_BONUSES = [
  { icon: "crystal", label: "Crystals", value: "+10%" },
  { icon: "xp", label: "Pokémon XP", value: "+50%" },
  { icon: "trainer", label: "Trainer XP", value: "2×" },
  { icon: "gold", label: "Gold (Trait)", value: "+50%" },
] as const;
