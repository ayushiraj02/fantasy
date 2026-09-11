import { Trash2, RotateCcw, Sparkles } from 'lucide-react';
import { FantasyCharacter } from '../types';
import { FANTASY_CLASSES } from '../data/fantasyData';
import { ClassIcon } from './ClassIcon';
import { BrassCorner } from './AlchemyDecorations';

interface HistoryListProps {
  characters: FantasyCharacter[];
  activeCharacterId?: string;
  onSelectCharacter: (character: FantasyCharacter) => void;
  onClearHistory: () => void;
}

export function HistoryList({
  characters,
  activeCharacterId,
  onSelectCharacter,
  onClearHistory,
}: HistoryListProps) {
  if (characters.length <= 1) {
    return null;
  }

  return (
    <div className="w-full bg-white/95 border border-amber-200 rounded-2xl p-4 mt-6 relative shadow-sm">
      <BrassCorner position="top-left" className="w-4 h-4" />
      <BrassCorner position="top-right" className="w-4 h-4" />

      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-amber-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-cinzel">
            Character Generation Log ({characters.length})
          </h3>
        </div>
        <button
          type="button"
          onClick={onClearHistory}
          id="btn-clear-history"
          className="text-xs text-stone-500 hover:text-rose-600 flex items-center gap-1.5 transition-colors px-2.5 py-1 rounded-lg hover:bg-rose-50 border border-transparent hover:border-rose-200 font-cinzel cursor-pointer"
          title="Clear chronicle log"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Log</span>
        </button>
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-200">
        {characters.map((char) => {
          const isActive = char.id === activeCharacterId;
          const classInfo = FANTASY_CLASSES[char.characterClass];

          return (
            <button
              key={char.id}
              type="button"
              onClick={() => onSelectCharacter(char)}
              id={`history-item-${char.id}`}
              className={`flex-shrink-0 text-left p-2.5 rounded-xl border transition-all max-w-[210px] cursor-pointer ${
                isActive
                  ? 'bg-amber-50/80 border-amber-400 shadow-xs ring-1 ring-amber-200'
                  : 'bg-white border-stone-200 hover:border-amber-300 hover:bg-amber-50/30'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`p-1 rounded text-xs border ${classInfo.badgeColor}`}>
                  <ClassIcon characterClass={char.characterClass} className="w-3 h-3" />
                </span>
                <span className="text-xs font-bold text-amber-900 truncate font-cinzel">
                  {char.characterClass}
                </span>
              </div>
              <div className="text-xs font-bold text-stone-900 truncate font-fantasy-name">
                {char.name}
              </div>
              <div className="text-[10px] text-stone-500 truncate font-medieval">
                {char.race} • {char.subclass}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

