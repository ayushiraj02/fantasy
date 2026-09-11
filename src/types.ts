export type FantasyClassType =
  | 'Warrior'
  | 'Mage'
  | 'Rogue'
  | 'Ranger'
  | 'Paladin'
  | 'Cleric'
  | 'Druid'
  | 'Bard'
  | 'Warlock'
  | 'Monk'
  | 'Kshatriya'
  | 'Dhanurdhar'
  | 'Rishi'
  | 'Mayavi'
  | 'Yogi';

export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface CardStats {
  health: number;
  mana: number;
  strength: number;
}

export interface FantasyClassInfo {
  name: FantasyClassType;
  role: string;
  badgeColor: string;
  accentBg: string;
  borderColor: string;
  description: string;
  primaryStat: keyof CharacterStats;
  subclasses: string[];
  signatureWeapons: string[];
  specialAbilities: string[];
  sampleQuotes: string[];
}

export interface FantasyCharacter {
  id: string;
  name: string;
  title: string;
  characterClass: FantasyClassType;
  subclass: string;
  race: string;
  alignment: string;
  stats: CharacterStats;
  cardStats: CardStats;
  level?: number;
  experience?: number;
  maxExperience?: number;
  totalXp?: number;
  lastLevelUpGains?: {
    hp: number;
    mp: number;
    str: number;
    level: number;
  };
  backstory: string;
  signatureWeapon: string;
  specialAbility: string;
  trait: string;
  quote: string;
  portraitUrl?: string;
  portraitVariant?: number;
  createdAt: number;
}
