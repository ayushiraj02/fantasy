import { FantasyCharacter } from '../types';
import { FANTASY_CLASSES } from '../data/fantasyData';

export interface XpGainResult {
  xpGained: number;
  breakdown: string;
  primaryStatName: string;
  primaryBonus: number;
  versatilityBonus: number;
  activityName: string;
}

export interface LevelUpGains {
  hpGain: number;
  manaGain: number;
  strGain: number;
  newLevel: number;
}

export interface TrainingResult {
  updatedCharacter: FantasyCharacter;
  xpGained: number;
  leveledUp: boolean;
  gains?: LevelUpGains;
  message: string;
}

/**
 * Calculates the XP required for a given level.
 * Level 1 -> 100 XP
 * Level 2 -> 200 XP
 * Level 3 -> 300 XP, etc.
 */
export function calculateMaxExp(level: number): number {
  return Math.max(1, level) * 100;
}

/**
 * Calculates experience points gained from training based on traditional stats.
 * Higher primary stat for class and higher overall stat total provide greater XP gains!
 */
export function calculateExpGainFromStats(
  character: FantasyCharacter,
  trainingType: 'balanced' | 'martial' | 'mystic' | 'cunning' = 'balanced'
): XpGainResult {
  const classInfo = FANTASY_CLASSES[character.characterClass];
  const primaryStatKey = (classInfo?.primaryStat || 'strength') as keyof typeof character.stats;
  const primaryStatVal = character.stats[primaryStatKey] || 10;

  const totalStats =
    (character.stats.strength || 10) +
    (character.stats.dexterity || 10) +
    (character.stats.constitution || 10) +
    (character.stats.intelligence || 10) +
    (character.stats.wisdom || 10) +
    (character.stats.charisma || 10);

  let baseXp = 25;
  let primaryBonus = Math.round(primaryStatVal * 1.5);
  let versatilityBonus = Math.round(totalStats * 0.22);
  let luckBonus = Math.floor(Math.random() * 6) + 3;
  let activityName = 'Heroic Questing';

  if (trainingType === 'martial') {
    activityName = 'Martial Sparring';
    const martialSum = (character.stats.strength || 10) + (character.stats.constitution || 10);
    primaryBonus = Math.round(martialSum * 1.1);
  } else if (trainingType === 'mystic') {
    activityName = 'Arcane Meditation';
    const mysticSum = (character.stats.intelligence || 10) + (character.stats.wisdom || 10);
    primaryBonus = Math.round(mysticSum * 1.1);
  } else if (trainingType === 'cunning') {
    activityName = 'Infiltration Drill';
    const cunningSum = (character.stats.dexterity || 10) + (character.stats.charisma || 10);
    primaryBonus = Math.round(cunningSum * 1.1);
  }

  const xpGained = baseXp + primaryBonus + versatilityBonus + luckBonus;

  const breakdown = `+${xpGained} XP (${activityName}: +${primaryBonus} ${primaryStatKey.toUpperCase()} Affinity, +${versatilityBonus} Versatility)`;

  return {
    xpGained,
    breakdown,
    primaryStatName: primaryStatKey,
    primaryBonus,
    versatilityBonus,
    activityName,
  };
}

/**
 * Calculates attribute gains when a character levels up, directly scaling
 * with Constitution (Health), Intelligence/Wisdom (Mana), and Strength (Strength).
 */
export function calculateLevelUpAttributeGains(character: FantasyCharacter): {
  hpGain: number;
  manaGain: number;
  strGain: number;
} {
  const con = character.stats.constitution || 10;
  const int = character.stats.intelligence || 10;
  const wis = character.stats.wisdom || 10;
  const str = character.stats.strength || 10;

  // HP scales with Constitution
  const hpGain = 12 + Math.round(con * 0.55);

  // Mana scales with Intelligence & Wisdom
  const manaGain = 10 + Math.round((int + wis) * 0.38);

  // Strength scales with Strength
  const strGain = 8 + Math.round(str * 0.48);

  return {
    hpGain,
    manaGain,
    strGain,
  };
}

/**
 * Trains a saved character: grants XP based on their stats, checks for level up,
 * and updates Health, Mana, and Strength accordingly.
 */
export function trainDeckCharacter(
  character: FantasyCharacter,
  trainingType: 'balanced' | 'martial' | 'mystic' | 'cunning' = 'balanced'
): TrainingResult {
  const currentLevel = character.level || 1;
  const currentXp = character.experience || 0;
  const maxExp = character.maxExperience || calculateMaxExp(currentLevel);

  const { xpGained, breakdown, activityName } = calculateExpGainFromStats(character, trainingType);

  let updatedLevel = currentLevel;
  let updatedXp = currentXp + xpGained;
  let updatedMaxExp = maxExp;
  let leveledUp = false;
  let gains: LevelUpGains | undefined;

  let currentHealth = character.cardStats?.health ?? 100;
  let currentMana = character.cardStats?.mana ?? 60;
  let currentStrength = character.cardStats?.strength ?? 65;

  // Check if character achieved enough XP to level up
  if (updatedXp >= updatedMaxExp) {
    leveledUp = true;
    updatedLevel += 1;
    updatedXp = updatedXp - updatedMaxExp;
    updatedMaxExp = calculateMaxExp(updatedLevel);

    const attributeBoosts = calculateLevelUpAttributeGains(character);
    currentHealth += attributeBoosts.hpGain;
    currentMana += attributeBoosts.manaGain;
    currentStrength += attributeBoosts.strGain;

    gains = {
      hpGain: attributeBoosts.hpGain,
      manaGain: attributeBoosts.manaGain,
      strGain: attributeBoosts.strGain,
      newLevel: updatedLevel,
    };
  }

  const updatedCharacter: FantasyCharacter = {
    ...character,
    level: updatedLevel,
    experience: updatedXp,
    maxExperience: updatedMaxExp,
    totalXp: (character.totalXp || 0) + xpGained,
    cardStats: {
      health: currentHealth,
      mana: currentMana,
      strength: currentStrength,
    },
    ...(leveledUp && gains
      ? {
          lastLevelUpGains: {
            hp: gains.hpGain,
            mp: gains.manaGain,
            str: gains.strGain,
            level: gains.newLevel,
          },
        }
      : {}),
  };

  const message = leveledUp
    ? `🎉 LEVEL UP! ${character.name} reached Level ${updatedLevel}! (+${gains?.hpGain} HP, +${gains?.manaGain} MP, +${gains?.strGain} STR)`
    : `✨ ${character.name} earned +${xpGained} XP from ${activityName}! (${updatedXp}/${updatedMaxExp} XP)`;

  return {
    updatedCharacter,
    xpGained,
    leveledUp,
    gains,
    message,
  };
}
