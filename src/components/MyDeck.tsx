import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Trash2,
  Eye,
  Heart,
  Zap,
  Swords,
  Sparkles,
  BookOpen,
  ArrowUpCircle,
  Dumbbell,
  Compass,
  Flame,
  Brain,
  Award,
  HelpCircle,
} from 'lucide-react';
import { FantasyCharacter } from '../types';
import { FANTASY_CLASSES } from '../data/fantasyData';
import { CLASS_PORTRAIT_IMAGES, getDiceBearPortraitUrl } from '../data/portraitAssets';
import { ClassIcon } from './ClassIcon';
import { BrassCorner } from './AlchemyDecorations';
import {
  calculateMaxExp,
  calculateExpGainFromStats,
  calculateLevelUpAttributeGains,
  TrainingResult,
} from '../utils/levelUpSystem';
import { mysteriousAudio } from '../utils/mysteriousAudio';

interface MyDeckProps {
  deck: FantasyCharacter[];
  activeCharacterId?: string;
  onSelectCard: (character: FantasyCharacter) => void;
  onRemoveFromDeck: (characterId: string) => void;
  onClearDeck: () => void;
  onTrainCharacter: (
    characterId: string,
    trainingType?: 'balanced' | 'martial' | 'mystic' | 'cunning'
  ) => TrainingResult | void;
  onTrainAllCharacters?: (
    trainingType?: 'balanced' | 'martial' | 'mystic' | 'cunning'
  ) => void;
}

export function MyDeck({
  deck,
  activeCharacterId,
  onSelectCard,
  onRemoveFromDeck,
  onClearDeck,
  onTrainCharacter,
  onTrainAllCharacters,
}: MyDeckProps) {
  // Activity selection per character: characterId -> trainingType
  const [selectedActivity, setSelectedActivity] = useState<
    Record<string, 'balanced' | 'martial' | 'mystic' | 'cunning'>
  >({});

  // Floating feedback popups per character: characterId -> message
  const [feedbackMap, setFeedbackMap] = useState<
    Record<string, { text: string; isLevelUp: boolean; timestamp: number }>
  >({});

  // Global deck feedback banner
  const [deckNotice, setDeckNotice] = useState<string | null>(null);

  // Toggle stat formula info modal/drawer
  const [showFormulaInfo, setShowFormulaInfo] = useState<boolean>(false);

  const getCardPortraitUrl = (char: FantasyCharacter): string => {
    if (char.portraitUrl) return char.portraitUrl;
    const variant = char.portraitVariant || 1;
    if (variant === 1 && CLASS_PORTRAIT_IMAGES[char.characterClass]) {
      return CLASS_PORTRAIT_IMAGES[char.characterClass];
    }
    return getDiceBearPortraitUrl(char.name, char.characterClass, variant);
  };

  const handleTrain = (character: FantasyCharacter) => {
    const activity = selectedActivity[character.id] || 'balanced';
    const result = onTrainCharacter(character.id, activity);

    if (result) {
      if (result.leveledUp) {
        mysteriousAudio.playLevelUpChime();
        setFeedbackMap((prev) => ({
          ...prev,
          [character.id]: {
            text: `⭐ LEVEL UP! Lvl ${result.gains?.newLevel}! (+${result.gains?.hpGain} HP, +${result.gains?.manaGain} MP, +${result.gains?.strGain} STR)`,
            isLevelUp: true,
            timestamp: Date.now(),
          },
        }));
        setDeckNotice(result.message);
      } else {
        setFeedbackMap((prev) => ({
          ...prev,
          [character.id]: {
            text: `+${result.xpGained} XP! (${character.experience! + result.xpGained}/${result.updatedCharacter.maxExperience} XP)`,
            isLevelUp: false,
            timestamp: Date.now(),
          },
        }));
      }

      // Clear feedback after 3.2 seconds
      setTimeout(() => {
        setFeedbackMap((prev) => {
          const next = { ...prev };
          delete next[character.id];
          return next;
        });
      }, 3200);
    }
  };

  const handleTrainParty = () => {
    if (onTrainAllCharacters && deck.length > 0) {
      onTrainAllCharacters('balanced');
      mysteriousAudio.playLevelUpChime();
      setDeckNotice(
        `⚔️ The entire party embarked on a Heroic Quest! Every hero gained experience points scaled by their stats!`
      );
      setTimeout(() => setDeckNotice(null), 5000);
    }
  };

  return (
    <section
      id="my-deck-section"
      className="w-full bg-white/95 border border-amber-200 rounded-2xl p-5 sm:p-6 mt-8 shadow-sm relative overflow-hidden"
    >
      <BrassCorner position="top-left" className="w-5 h-5" />
      <BrassCorner position="top-right" className="w-5 h-5" />
      <BrassCorner position="bottom-left" className="w-5 h-5" />
      <BrassCorner position="bottom-right" className="w-5 h-5" />

      {/* Deck Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 px-1 border-b border-amber-200/80 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 shadow-2xs">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-stone-900 font-cinzel">
                My Deck & Hero Guild
              </h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-cinzel">
                {deck.length} {deck.length === 1 ? 'Hero' : 'Heroes'}
              </span>

              <button
                type="button"
                onClick={() => setShowFormulaInfo(!showFormulaInfo)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 transition-colors cursor-pointer font-cinzel"
                title="How do stats govern XP and Level Up attribute gains?"
              >
                <HelpCircle className="w-3 h-3 text-amber-600" />
                <span>Level-Up Rules</span>
              </button>
            </div>
            <p className="text-xs text-stone-500 font-medieval">
              Saved characters gain XP based on their stats to increase Health, Mana, and Strength
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        {deck.length > 0 && (
          <div className="flex items-center gap-2 self-end sm:self-center flex-wrap">
            {onTrainAllCharacters && (
              <button
                type="button"
                id="btn-train-party-all"
                onClick={handleTrainParty}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-stone-950 hover:brightness-105 transition-all shadow-2xs font-cinzel cursor-pointer border border-amber-400"
                title="Train all heroes in the deck together based on their stats"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Train Party (+XP)</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClearDeck}
              id="btn-clear-deck"
              className="text-xs text-stone-500 hover:text-rose-600 flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-lg hover:bg-rose-50 border border-transparent hover:border-rose-200 font-cinzel cursor-pointer"
              title="Clear all cards from My Deck"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Deck</span>
            </button>
          </div>
        )}
      </div>

      {/* Level-Up System Info Drawer */}
      <AnimatePresence>
        {showFormulaInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-stone-700 space-y-2 font-medieval">
              <div className="flex items-center justify-between font-cinzel font-bold text-amber-900 border-b border-amber-200 pb-1.5">
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-700" />
                  Experience & Attribute Growth Mechanics
                </span>
                <span className="text-[10px] text-amber-700 font-mono">D&D Stat Scaling</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] leading-relaxed">
                <div>
                  <strong className="text-stone-900 font-cinzel block mb-0.5">
                    1. Experience Points (XP) Calculation:
                  </strong>
                  <p>
                    Each training session grants base XP plus a strong bonus from the hero's{' '}
                    <strong className="text-amber-900">Primary Class Stat</strong> (e.g., STR for Warriors, INT for Mages, DEX for Rogues), plus a versatility bonus from all 6 attributes combined!
                  </p>
                </div>
                <div>
                  <strong className="text-stone-900 font-cinzel block mb-0.5">
                    2. Level-Up Attribute Boosts:
                  </strong>
                  <p>
                    When XP fills the threshold, the character levels up:
                    <br />
                    • <strong className="text-rose-800">Health (HP)</strong> increases by +12 + (55% of Constitution).
                    <br />
                    • <strong className="text-sky-800">Mana (MP)</strong> increases by +10 + (38% of Int + Wis).
                    <br />
                    • <strong className="text-amber-800">Strength (STR)</strong> increases by +8 + (48% of Strength).
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Banner Notice */}
      <AnimatePresence>
        {deckNotice && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-4 p-2.5 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-950 text-xs font-cinzel font-bold flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
              <span>{deckNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setDeckNotice(null)}
              className="text-amber-800 hover:text-amber-950 font-bold px-2 py-0.5 cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deck Content */}
      {deck.length === 0 ? (
        <div className="text-center py-10 px-4 rounded-xl border border-dashed border-amber-200 bg-amber-50/40">
          <div className="w-14 h-14 rounded-2xl bg-white border border-amber-200 mx-auto flex items-center justify-center text-amber-600 mb-3 shadow-2xs">
            <Layers className="w-7 h-7" />
          </div>
          <h4 className="text-sm font-bold text-stone-900 font-cinzel mb-1">
            Your Deck is Empty
          </h4>
          <p className="text-xs text-stone-600 max-w-sm mx-auto font-medieval leading-relaxed">
            Click the <strong className="text-amber-800">"Save to Deck"</strong> button on any generated character card above to add them to your hero guild, train them, and unlock Level Ups!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {deck.map((card) => {
              const isActive = card.id === activeCharacterId;
              const classInfo = FANTASY_CLASSES[card.characterClass];
              const portraitSrc = getCardPortraitUrl(card);

              const currentLevel = card.level || 1;
              const currentXp = card.experience || 0;
              const maxExp = card.maxExperience || calculateMaxExp(currentLevel);
              const xpPercent = Math.min(100, Math.round((currentXp / maxExp) * 100));

              const currentActivity = selectedActivity[card.id] || 'balanced';
              const previewXp = calculateExpGainFromStats(card, currentActivity);
              const attributeBoostPreview = calculateLevelUpAttributeGains(card);

              const feedback = feedbackMap[card.id];

              return (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className={`group relative rounded-xl border-2 overflow-hidden transition-all flex flex-col justify-between ${
                    isActive
                      ? 'bg-white border-amber-400 shadow-md ring-2 ring-amber-100'
                      : 'bg-white border-stone-200 hover:border-amber-400 hover:shadow-md'
                  }`}
                >
                  {/* Top Card Ingot Bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />

                  {/* Level Up Celebration Floating Toast on Card */}
                  <AnimatePresence>
                    {feedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        className={`absolute inset-x-2 top-2 z-40 p-2 rounded-lg text-center shadow-md font-cinzel font-bold text-xs border ${
                          feedback.isLevelUp
                            ? 'bg-amber-500 text-stone-950 border-yellow-300 ring-2 ring-amber-300 animate-pulse'
                            : 'bg-stone-900 text-amber-300 border-amber-500/80'
                        }`}
                      >
                        {feedback.text}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="p-3">
                    {/* Top Row: Class Badge, Level Badge & Active Indicator */}
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase border font-cinzel ${classInfo.badgeColor}`}
                        >
                          <ClassIcon characterClass={card.characterClass} className="w-2.5 h-2.5" />
                          <span>{card.characterClass}</span>
                        </span>

                        {/* Prominent Level Badge */}
                        <span
                          id={`deck-level-badge-${card.id}`}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black uppercase bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 border border-amber-500 shadow-2xs font-cinzel"
                          title={`Character Level ${currentLevel}`}
                        >
                          <Award className="w-2.5 h-2.5" />
                          <span>Lvl {currentLevel}</span>
                        </span>
                      </div>

                      {isActive && (
                        <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 font-cinzel">
                          Active Card
                        </span>
                      )}
                    </div>

                    {/* Card Body: Portrait Thumbnail + Name */}
                    <div className="flex gap-3 items-center mb-2.5">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-amber-300 bg-stone-100 shrink-0 shadow-xs">
                        <img
                          src={portraitSrc}
                          alt={card.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="font-fantasy-name text-sm font-bold text-stone-900 truncate">
                          {card.name}
                        </h4>
                        <p className="text-[11px] text-stone-600 truncate font-medieval">
                          {card.race} • {card.subclass}
                        </p>
                        <p className="text-[10px] text-amber-800 truncate font-cinzel font-semibold">
                          {card.title}
                        </p>
                      </div>
                    </div>

                    {/* Experience Points (XP) Progress Bar */}
                    <div
                      id={`deck-card-xp-${card.id}`}
                      className="p-2 rounded-lg bg-stone-50 border border-stone-200 mb-2.5"
                    >
                      <div className="flex items-center justify-between text-[10px] font-bold font-cinzel mb-1">
                        <span className="text-stone-700 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                          <span>EXP Progress</span>
                        </span>
                        <span className="text-amber-900 font-mono">
                          {currentXp} / {maxExp} XP ({xpPercent}%)
                        </span>
                      </div>

                      {/* Bar */}
                      <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden relative shadow-inner">
                        <motion.div
                          className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${xpPercent}%` }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[9px] text-stone-500 font-medieval mt-1">
                        <span>
                          Earns ~{previewXp.xpGained} XP ({classInfo.primaryStat.toUpperCase()} bonus)
                        </span>
                        <span>Next Lvl: +{attributeBoostPreview.hpGain} HP, +{attributeBoostPreview.manaGain} MP</span>
                      </div>
                    </div>

                    {/* 3 Core Stats Badges (Health, Mana, Strength) */}
                    <div className="grid grid-cols-3 gap-1.5 py-1.5 px-2 bg-stone-50 rounded-lg border border-stone-200 mb-2.5 text-center">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-0.5 text-[9px] font-bold text-rose-700 font-cinzel">
                          <Heart className="w-2.5 h-2.5 fill-rose-500 text-rose-600" />
                          <span>HP</span>
                        </div>
                        <span className="text-xs font-black text-stone-900 font-cinzel">
                          {card.cardStats?.health ?? 100}
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-0.5 text-[9px] font-bold text-sky-700 font-cinzel">
                          <Zap className="w-2.5 h-2.5 fill-sky-500 text-sky-600" />
                          <span>MP</span>
                        </div>
                        <span className="text-xs font-black text-stone-900 font-cinzel">
                          {card.cardStats?.mana ?? 60}
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-0.5 text-[9px] font-bold text-amber-800 font-cinzel">
                          <Swords className="w-2.5 h-2.5 text-amber-600" />
                          <span>STR</span>
                        </div>
                        <span className="text-xs font-black text-stone-900 font-cinzel">
                          {card.cardStats?.strength ?? 65}
                        </span>
                      </div>
                    </div>

                    {/* Training Activity Focus Selector */}
                    <div className="flex items-center justify-between gap-1 mb-2 px-1">
                      <span className="text-[10px] font-bold text-stone-600 font-cinzel flex items-center gap-1">
                        <Dumbbell className="w-2.5 h-2.5 text-amber-600" />
                        <span>Training Focus:</span>
                      </span>
                      <select
                        id={`select-training-${card.id}`}
                        value={currentActivity}
                        onChange={(e) =>
                          setSelectedActivity((prev) => ({
                            ...prev,
                            [card.id]: e.target.value as 'balanced' | 'martial' | 'mystic' | 'cunning',
                          }))
                        }
                        className="text-[10px] font-cinzel font-semibold px-2 py-0.5 rounded bg-stone-100 border border-stone-300 text-stone-800 focus:outline-none focus:border-amber-400 cursor-pointer"
                      >
                        <option value="balanced">🧭 Quest (Balanced)</option>
                        <option value="martial">⚔️ Sparring (STR & CON)</option>
                        <option value="mystic">🔮 Meditation (INT & WIS)</option>
                        <option value="cunning">🏹 Drill (DEX & CHA)</option>
                      </select>
                    </div>

                    {/* Backstory Excerpt */}
                    <div className="p-2 rounded bg-stone-50 border border-stone-200 mb-2">
                      <div className="flex items-center gap-1 text-[9px] font-bold text-stone-600 uppercase font-cinzel mb-0.5">
                        <BookOpen className="w-2.5 h-2.5 text-amber-600" />
                        <span>Backstory</span>
                      </div>
                      <p className="text-[11px] text-stone-700 font-medieval line-clamp-2 leading-tight">
                        {card.backstory || 'A courageous wanderer ready for epic quests.'}
                      </p>
                    </div>
                  </div>

                  {/* Card Actions Bottom Strip: View Card, Train (+XP), Delete */}
                  <div className="flex items-center justify-between gap-1.5 p-2 bg-stone-50/80 border-t border-stone-200">
                    <button
                      type="button"
                      id={`btn-view-card-${card.id}`}
                      onClick={() => onSelectCard(card)}
                      className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white text-stone-800 hover:bg-amber-50 hover:text-stone-900 border border-stone-300 hover:border-amber-400 transition-all font-cinzel cursor-pointer shadow-2xs"
                      title="Inspect full player card"
                    >
                      <Eye className="w-3 h-3 text-amber-600" />
                      <span className="hidden sm:inline">View</span>
                    </button>

                    {/* Interactive Level Up / Train Button */}
                    <button
                      type="button"
                      id={`btn-train-card-${card.id}`}
                      onClick={() => handleTrain(card)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 hover:brightness-105 border border-amber-400 shadow-2xs font-cinzel cursor-pointer transition-all active:scale-95"
                      title={`Train ${card.name} to gain experience points and level up!`}
                    >
                      <ArrowUpCircle className="w-3.5 h-3.5 text-stone-950" />
                      <span>Train (+XP)</span>
                    </button>

                    <button
                      type="button"
                      id={`btn-remove-deck-${card.id}`}
                      onClick={() => onRemoveFromDeck(card.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-200 cursor-pointer"
                      title="Remove from My Deck"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
