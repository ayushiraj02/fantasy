import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, Wand2, Flame, Eye } from 'lucide-react';
import { FantasyCharacter } from '../types';
import { FANTASY_CLASSES } from '../data/fantasyData';
import { CLASS_PORTRAIT_IMAGES, getDiceBearPortraitUrl } from '../data/portraitAssets';
import { ClassSvgAvatar } from './ClassSvgAvatar';
import { ClassIcon } from './ClassIcon';
import { BrassCorner } from './AlchemyDecorations';

interface CharacterPortraitProps {
  character: FantasyCharacter;
  onGeneratePortrait: () => void;
  onRegeneratePortrait: () => void;
  isGenerating?: boolean;
}

export function CharacterPortrait({
  character,
  onGeneratePortrait,
  onRegeneratePortrait,
  isGenerating = false,
}: CharacterPortraitProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const classInfo = FANTASY_CLASSES[character.characterClass];
  const hasPortrait = Boolean(character.portraitUrl);
  const variant = character.portraitVariant || 1;

  const getPortraitSrc = (): string => {
    if (variant === 1) {
      return CLASS_PORTRAIT_IMAGES[character.characterClass] || getDiceBearPortraitUrl(character.name, character.characterClass, 1);
    }
    return getDiceBearPortraitUrl(character.name, character.characterClass, variant);
  };

  return (
    <div
      id="character-portrait-section"
      className="w-full flex flex-col items-center bg-white/95 border border-amber-200 rounded-2xl p-5 shadow-sm relative overflow-hidden"
    >
      <BrassCorner position="top-left" className="w-5 h-5" />
      <BrassCorner position="top-right" className="w-5 h-5" />
      <BrassCorner position="bottom-left" className="w-5 h-5" />
      <BrassCorner position="bottom-right" className="w-5 h-5" />

      {/* Header */}
      <div className="w-full flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700">
            <Eye className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-cinzel">
              Character Portrait
            </h3>
            <p className="text-[10px] text-stone-500 font-medieval">Visual appearance of {character.name}</p>
          </div>
        </div>
        {hasPortrait && (
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 shadow-sm flex items-center gap-1 font-cinzel">
            <Flame className="w-3 h-3 text-amber-600" />
            <span>Style #{variant}</span>
          </span>
        )}
      </div>

      {/* Main Portrait Frame */}
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md bg-stone-100 flex items-center justify-center group ring-2 ring-amber-100">
        {/* Ornate corner filigree */}
        <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-amber-400 z-20 pointer-events-none" />
        <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-amber-400 z-20 pointer-events-none" />
        <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-amber-400 z-20 pointer-events-none" />
        <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-amber-400 z-20 pointer-events-none" />

        {/* Loading Overlay */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/90 z-30 flex flex-col items-center justify-center gap-3 backdrop-blur-xs"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                className="p-3 rounded-full bg-amber-100 border border-amber-300"
              >
                <Wand2 className="w-8 h-8 text-amber-600 animate-pulse" />
              </motion.div>
              <p className="text-xs font-bold text-amber-900 font-cinzel tracking-wider">
                Drawing {character.characterClass} Portrait...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Portrait Display or Empty State */}
        {hasPortrait ? (
          <div className="w-full h-full relative">
            {!imageFailed ? (
              <img
                key={`${character.id}-${variant}`}
                src={getPortraitSrc()}
                alt={`${character.name} the ${character.characterClass} portrait`}
                referrerPolicy="no-referrer"
                onError={() => setImageFailed(true)}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <ClassSvgAvatar
                characterClass={character.characterClass}
                name={character.name}
                variant={variant}
                className="w-full h-full object-cover"
              />
            )}

            {/* Bottom Nameplate */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/80 via-stone-900/50 to-transparent p-3 pt-6 z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate font-fantasy-name drop-shadow">
                  {character.name}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase border font-cinzel ${classInfo.badgeColor}`}>
                  {character.characterClass}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Placeholder state before portrait generation */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-amber-50/40 to-stone-50">
            <div className="w-16 h-16 rounded-full bg-amber-100/80 border border-amber-300 flex items-center justify-center text-amber-700 shadow-xs mb-3">
              <ClassIcon characterClass={character.characterClass} className="w-8 h-8" />
            </div>
            <p className="text-xs font-bold text-stone-800 mb-1 font-cinzel tracking-wider">
              No Portrait Generated Yet
            </p>
            <p className="text-[11px] text-stone-500 leading-relaxed font-medieval">
              Click below to generate a stylized video-game portrait for {character.name}.
            </p>
          </div>
        )}
      </div>

      {/* Simplified Portrait Action: Exactly ONE clear, contextual button */}
      <div className="w-full mt-3.5 flex items-center justify-center z-10">
        {!hasPortrait ? (
          <button
            type="button"
            id="btn-generate-portrait"
            onClick={onGeneratePortrait}
            disabled={isGenerating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider transition-all cursor-pointer font-cinzel bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-stone-950 shadow-sm hover:brightness-105 active:scale-95 border border-amber-300"
            title="Generate portrait for this character"
          >
            <Sparkles className="w-4 h-4 text-stone-950" />
            <span>Generate Portrait</span>
          </button>
        ) : (
          <button
            type="button"
            id="btn-regenerate-portrait"
            onClick={onRegeneratePortrait}
            disabled={isGenerating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider transition-all cursor-pointer font-cinzel bg-white hover:bg-amber-50 text-stone-800 border border-stone-300 hover:border-amber-400 shadow-xs active:scale-95"
            title="Switch to a new portrait style variation"
          >
            <RefreshCw className="w-4 h-4 text-amber-600" />
            <span>Change Portrait</span>
          </button>
        )}
      </div>
    </div>
  );
}

