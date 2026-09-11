import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Copy,
  Check,
  Layers,
  CheckCircle2,
  Swords,
  Sparkles,
  Scroll,
  Quote,
  Flame,
  Heart,
  Zap,
  BookOpen,
  RefreshCw,
  Wand2,
  Shield,
  Award,
  ArrowUpCircle,
} from 'lucide-react';
import { FantasyCharacter } from '../types';
import { FANTASY_CLASSES } from '../data/fantasyData';
import { ClassIcon } from './ClassIcon';
import { CharacterPortrait } from './CharacterPortrait';
import { BrassCorner, AlchemicalDivider } from './AlchemyDecorations';
import { calculateMaxExp } from '../utils/levelUpSystem';

interface CharacterCardProps {
  character: FantasyCharacter;
  isInDeck?: boolean;
  onSaveToDeck?: (character: FantasyCharacter) => void;
  onGeneratePortrait?: () => void;
  onRegeneratePortrait?: () => void;
  onGenerateBackstory?: () => void;
  onTrainCharacter?: (characterId: string) => void;
  isGeneratingPortrait?: boolean;
  isGeneratingBackstory?: boolean;
  animationEffect?: 'flip' | 'fade';
}

export function CharacterCard({
  character,
  isInDeck = false,
  onSaveToDeck,
  onGeneratePortrait,
  onRegeneratePortrait,
  onGenerateBackstory,
  onTrainCharacter,
  isGeneratingPortrait = false,
  isGeneratingBackstory = false,
  animationEffect = 'flip',
}: CharacterCardProps) {
  const [copied, setCopied] = useState(false);
  const classInfo = FANTASY_CLASSES[character.characterClass];

  const currentLevel = character.level || 1;
  const currentXp = character.experience || 0;
  const maxExp = character.maxExperience || calculateMaxExp(currentLevel);
  const xpPercent = Math.min(100, Math.round((currentXp / maxExp) * 100));

  // Default values if cardStats isn't set
  const healthVal = character.cardStats?.health ?? 100;
  const manaVal = character.cardStats?.mana ?? 60;
  const strengthVal = character.cardStats?.strength ?? 65;

  const handleCopy = () => {
    const text = `=== FANTASY PLAYER CARD ===
Name: ${character.name}
Class: ${character.characterClass} (${character.subclass})
Race: ${character.race}
Alignment: ${character.alignment}
Title: ${character.title}

CARD STATS:
• Health: ${healthVal} HP
• Mana: ${manaVal} MP
• Strength: ${strengthVal} STR

BACKSTORY:
${character.backstory}

Attributes:
• STR: ${character.stats.strength} | DEX: ${character.stats.dexterity} | CON: ${character.stats.constitution}
• INT: ${character.stats.intelligence} | WIS: ${character.stats.wisdom} | CHA: ${character.stats.charisma}

Signature Weapon: ${character.signatureWeapon}
Special Ability: ${character.specialAbility}
Trait: ${character.trait}
Quote: "${character.quote}"`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statItems = [
    { label: 'STR', rune: '🜂', full: 'Strength', val: character.stats.strength, isPrimary: classInfo.primaryStat === 'strength' },
    { label: 'DEX', rune: '🜁', full: 'Dexterity', val: character.stats.dexterity, isPrimary: classInfo.primaryStat === 'dexterity' },
    { label: 'CON', rune: '🜃', full: 'Constitution', val: character.stats.constitution, isPrimary: classInfo.primaryStat === 'constitution' },
    { label: 'INT', rune: '☿', full: 'Intelligence', val: character.stats.intelligence, isPrimary: classInfo.primaryStat === 'intelligence' },
    { label: 'WIS', rune: '☽', full: 'Wisdom', val: character.stats.wisdom, isPrimary: classInfo.primaryStat === 'wisdom' },
    { label: 'CHA', rune: '☉', full: 'Charisma', val: character.stats.charisma, isPrimary: classInfo.primaryStat === 'charisma' },
  ];

  // Animation variants for card entry & exit
  const cardVariants = {
    flip: {
      initial: {
        opacity: 0,
        rotateY: -22,
        rotateX: 5,
        scale: 0.95,
        y: 14,
      },
      animate: {
        opacity: 1,
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.42,
          ease: [0.16, 1, 0.3, 1],
        },
      },
      exit: {
        opacity: 0,
        rotateY: 22,
        rotateX: -5,
        scale: 0.95,
        y: -14,
        transition: {
          duration: 0.32,
          ease: [0.65, 0, 0.35, 1],
        },
      },
    },
    fade: {
      initial: {
        opacity: 0,
        scale: 0.97,
        y: 18,
      },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.38,
          ease: [0.16, 1, 0.3, 1],
        },
      },
      exit: {
        opacity: 0,
        scale: 0.97,
        y: -18,
        transition: {
          duration: 0.28,
          ease: 'easeIn',
        },
      },
    },
  };

  return (
    <div className="w-full relative" style={{ perspective: 1400 }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={character.id}
          variants={cardVariants[animationEffect]}
          initial="initial"
          animate="animate"
          exit="exit"
          id="fantasy-player-card"
          className="w-full bg-white border-2 border-amber-300 rounded-3xl shadow-xl shadow-amber-950/5 overflow-hidden relative ring-1 ring-amber-100 will-change-transform"
        >
          {/* Subtle Radiant Card Glint Shimmer on Entry */}
          <motion.div
            key={`glint-${character.id}`}
            initial={{ x: '-120%', opacity: 0.6 }}
            animate={{ x: '220%', opacity: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut', delay: 0.08 }}
            className="absolute inset-0 pointer-events-none z-30 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent -skew-x-12"
          />

          {/* Outer Gilded Card Frame Accents */}
          <BrassCorner position="top-left" className="w-8 h-8" />
          <BrassCorner position="top-right" className="w-8 h-8" />
          <BrassCorner position="bottom-left" className="w-8 h-8" />
          <BrassCorner position="bottom-right" className="w-8 h-8" />

        {/* Top Gold Ingot Banner */}
        <div className="h-2 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 border-b border-amber-300" />

        {/* Card Header Plate: Name, Class, and Actions */}
        <div className="px-6 pt-7 pb-4 border-b border-amber-200/80 bg-gradient-to-b from-amber-50/70 via-stone-50/40 to-white relative">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              {/* Class & Subclass Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  id="card-class-badge"
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border font-cinzel shadow-2xs ${classInfo.badgeColor}`}
                >
                  <ClassIcon characterClass={character.characterClass} className="w-3.5 h-3.5" />
                  <span>{character.characterClass}</span>
                  <span className="opacity-60">•</span>
                  <span>{character.subclass}</span>
                </span>

                {/* Prominent Hero Level Badge */}
                <span
                  id="card-level-badge"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-stone-950 border border-amber-500 shadow-2xs font-cinzel"
                  title={`Character Level ${currentLevel}`}
                >
                  <Award className="w-3.5 h-3.5 text-stone-950" />
                  <span>Level {currentLevel}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200 font-cinzel">
                  <span>{character.race}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200 font-cinzel">
                  <span>{character.alignment}</span>
                </span>
              </div>

              {/* Character Name */}
              <div className="pt-1">
                <h2
                  id="card-character-name"
                  className="font-fantasy-name text-3xl sm:text-4xl md:text-5xl font-black tracking-wide text-stone-900 select-text drop-shadow-2xs"
                >
                  {character.name}
                </h2>

                {/* Epithet / Title */}
                <p className="text-xs sm:text-sm text-amber-800 font-bold tracking-widest uppercase font-cinzel flex items-center gap-2 mt-1">
                  <span className="text-amber-500">✦</span>
                  <span>{character.title}</span>
                  <span className="text-amber-500">✦</span>
                </p>
              </div>
            </div>

            {/* Actions Bar (Save to Deck & Copy Sheet) */}
            <div className="flex items-center gap-2 self-end md:self-start z-10 flex-wrap">
              {onSaveToDeck && (
                <button
                  type="button"
                  onClick={() => onSaveToDeck(character)}
                  id="btn-save-to-deck"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all border font-cinzel cursor-pointer shadow-sm ${
                    isInDeck
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 border-amber-400 hover:brightness-105 active:scale-95'
                  }`}
                  title={isInDeck ? 'Already in My Deck' : 'Save character to My Deck list'}
                >
                  {isInDeck ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>In My Deck</span>
                    </>
                  ) : (
                    <>
                      <Layers className="w-4 h-4 text-stone-950" />
                      <span>Save to Deck</span>
                    </>
                  )}
                </button>
              )}

              <button
                type="button"
                onClick={handleCopy}
                id="btn-copy-character"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 hover:border-amber-400 transition-all font-cinzel cursor-pointer shadow-2xs"
                title="Copy character card to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Card</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-6">
          {/* Prominent Portrait Window */}
          {onGeneratePortrait && onRegeneratePortrait && (
            <CharacterPortrait
              character={character}
              onGeneratePortrait={onGeneratePortrait}
              onRegeneratePortrait={onRegeneratePortrait}
              isGenerating={isGeneratingPortrait}
            />
          )}

          {/* THREE RANDOMLY GENERATED CARD STATS: Health, Mana, Strength */}
          <div
            id="player-card-stats-section"
            className="w-full bg-stone-50/70 border border-amber-200/90 rounded-2xl p-4 shadow-2xs relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3 px-1 border-b border-stone-200 pb-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs font-black uppercase tracking-widest text-stone-800 font-cinzel">
                  Core Player Card Stats & Level
                </h3>
              </div>
              <span className="text-[11px] text-stone-500 font-medieval">
                Combat Potency & Vitality
              </span>
            </div>

            {/* Level & XP Progression Status Bar */}
            <div
              id="card-level-xp-container"
              className="p-3 rounded-xl bg-white border border-amber-200/90 shadow-2xs mb-3.5 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-stone-900 font-cinzel">
                      Level {currentLevel} Progression
                    </span>
                    <span className="text-[11px] text-stone-500 font-medieval ml-2">
                      {currentXp} / {maxExp} XP ({xpPercent}%)
                    </span>
                  </div>
                </div>

                {/* Train Hero Button if saved in deck */}
                {isInDeck && onTrainCharacter && (
                  <button
                    type="button"
                    id="btn-card-train-hero"
                    onClick={() => onTrainCharacter(character.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 hover:brightness-105 border border-amber-400 shadow-2xs font-cinzel cursor-pointer transition-all active:scale-95"
                    title={`Train ${character.name} to earn XP based on their stats and level up!`}
                  >
                    <ArrowUpCircle className="w-3.5 h-3.5" />
                    <span>Train Hero (+XP)</span>
                  </button>
                )}
              </div>

              {/* Progress Bar Track */}
              <div className="w-full h-2 rounded-full bg-stone-100 border border-stone-200 overflow-hidden relative shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-full shadow-2xs"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercent}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>

              {/* Stat-scaling note / Last Level Up Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] text-stone-500 font-medieval pt-0.5">
                <span>
                  XP gain is scaled by {classInfo.primaryStat.toUpperCase()} & total stat versatility.
                </span>

                {character.lastLevelUpGains ? (
                  <span className="font-bold text-amber-900 font-cinzel bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    ⭐ Lvl {character.lastLevelUpGains.level} Growth: +{character.lastLevelUpGains.hp} HP, +{character.lastLevelUpGains.mp} MP, +{character.lastLevelUpGains.str} STR
                  </span>
                ) : !isInDeck ? (
                  <span className="text-amber-800 italic">
                    Save to My Deck below to unlock training and level up attributes!
                  </span>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* HEALTH STAT */}
              <div
                id="stat-health-badge"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-rose-200 shadow-2xs group hover:border-rose-400 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-2xs">
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-600 animate-pulse" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-rose-900 font-cinzel">
                      Health (HP)
                    </span>
                    <span className="text-xs text-rose-700/70 font-medieval">Vital Force</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black text-rose-700 font-cinzel tracking-tight">
                    {healthVal}
                  </span>
                  <span className="text-[10px] text-rose-600 font-bold block font-cinzel">HP</span>
                </div>
              </div>

              {/* MANA STAT */}
              <div
                id="stat-mana-badge"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-sky-200 shadow-2xs group hover:border-sky-400 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-2xs">
                    <Zap className="w-5 h-5 fill-sky-400 text-sky-600" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-sky-900 font-cinzel">
                      Mana (MP)
                    </span>
                    <span className="text-xs text-sky-700/70 font-medieval">Arcane Surge</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black text-sky-700 font-cinzel tracking-tight">
                    {manaVal}
                  </span>
                  <span className="text-[10px] text-sky-600 font-bold block font-cinzel">MP</span>
                </div>
              </div>

              {/* STRENGTH STAT */}
              <div
                id="stat-strength-badge"
                className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-amber-200 shadow-2xs group hover:border-amber-400 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-2xs">
                    <Swords className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-amber-950 font-cinzel">
                      Strength (STR)
                    </span>
                    <span className="text-xs text-amber-700/70 font-medieval">Martial Might</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black text-amber-700 font-cinzel tracking-tight">
                    {strengthVal}
                  </span>
                  <span className="text-[10px] text-amber-600 font-bold block font-cinzel">STR</span>
                </div>
              </div>
            </div>
          </div>

          {/* BACKSTORY SECTION */}
          <div
            id="player-card-backstory-section"
            className="w-full bg-[#fdfbf7] border border-amber-200/90 rounded-2xl p-5 shadow-2xs relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 border-b border-amber-200/60 pb-2.5">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <h3 className="text-xs font-black uppercase tracking-wider text-stone-900 font-cinzel">
                  Character Backstory & Origin Lore
                </h3>
              </div>

              {onGenerateBackstory && (
                <button
                  type="button"
                  id="btn-generate-backstory"
                  onClick={onGenerateBackstory}
                  disabled={isGeneratingBackstory}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-white hover:bg-amber-50 text-stone-700 border border-stone-300 hover:border-amber-400 transition-all cursor-pointer font-cinzel self-start sm:self-auto shadow-2xs"
                  title="Generate or re-roll character backstory"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-amber-600 ${isGeneratingBackstory ? 'animate-spin' : ''}`} />
                  <span>Reroll Backstory</span>
                </button>
              )}
            </div>

            <div className="relative">
              <p
                id="character-backstory-text"
                className="text-sm text-stone-800 leading-relaxed font-medieval tracking-wide text-justify"
              >
                {character.backstory || 'Born to the wild winds and ancient ruins, their legend is only beginning.'}
              </p>
            </div>
          </div>

          <AlchemicalDivider />

          {/* Signature Equipment & Special Ability */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-1 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 font-cinzel">
                <Swords className="w-3.5 h-3.5 text-amber-600" />
                <span>Signature Weapon</span>
              </div>
              <p className="text-sm font-semibold text-stone-800 font-medieval">
                {character.signatureWeapon}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-1 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 font-cinzel">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Special Ability</span>
              </div>
              <p className="text-sm font-semibold text-stone-800 font-medieval">
                {character.specialAbility}
              </p>
            </div>
          </div>

          {/* Personality Trait & Handwritten Quote */}
          <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700 font-cinzel">
              <Scroll className="w-3.5 h-3.5 text-amber-600" />
              <span>Inscribed Trait</span>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed font-medieval">
              {character.trait}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border-l-4 border-l-amber-500 border-y border-r border-amber-200/70 flex items-start gap-3 shadow-2xs">
            <Quote className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm italic text-stone-800 leading-relaxed font-medieval text-base">
              "{character.quote}"
            </p>
          </div>

          {/* Secondary RPG Attributes Drawer */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-stone-600 font-cinzel flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-600" />
                <span>Attribute Matrix</span>
              </span>
              <span className="text-[10px] text-amber-800 font-medieval">
                ★ Primary Affinity
              </span>
            </div>

            <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
              {statItems.map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-lg p-1.5 text-center border ${
                    stat.isPrimary
                      ? 'bg-amber-100/90 border-amber-300 text-amber-950 font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  <div className="text-[9px] font-bold tracking-wider font-cinzel">
                    {stat.label}
                  </div>
                  <div className="text-sm font-black text-stone-900 font-cinzel">
                    {stat.val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card Foil Bottom Ingot */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 border-t border-amber-300" />
      </motion.div>
    </AnimatePresence>
  </div>
  );
}


