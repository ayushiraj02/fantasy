import { useState, useEffect, useTransition } from 'react';
import { motion } from 'motion/react';
import {
  Dices,
  Info,
  FlaskConical,
} from 'lucide-react';
import { FantasyCharacter, FantasyClassType } from './types';
import {
  generateRandomCharacter,
  FANTASY_CLASSES,
} from './data/fantasyData';
import { generateCharacterBackstory } from './data/backstoryData';
import { CLASS_PORTRAIT_IMAGES, getDiceBearPortraitUrl } from './data/portraitAssets';
import alchemyWorkbenchBg from './assets/images/alchemy_workbench_bg_1789116477205.jpg';
import { CharacterCard } from './components/CharacterCard';
import { HistoryList } from './components/HistoryList';
import { MyDeck } from './components/MyDeck';
import { MysteriousAudioPlayer } from './components/MysteriousAudioPlayer';
import { BrassCorner, TransmutationCircle } from './components/AlchemyDecorations';
import { trainDeckCharacter, TrainingResult } from './utils/levelUpSystem';

export default function App() {
  // Current active character
  const [character, setCharacter] = useState<FantasyCharacter>(() => generateRandomCharacter());
  
  // History of generated characters
  const [history, setHistory] = useState<FantasyCharacter[]>(() => [character]);
  
  // "My Deck" list of saved player cards (with fallback to any previously saved characters)
  const [deck, setDeck] = useState<FantasyCharacter[]>(() => {
    try {
      const storedDeck = localStorage.getItem('fantasy_player_deck');
      if (storedDeck) return JSON.parse(storedDeck);
      const storedLegacy = localStorage.getItem('fantasy_saved_characters');
      return storedLegacy ? JSON.parse(storedLegacy) : [];
    } catch {
      return [];
    }
  });

  // Filter option: 'All' or a specific class
  const [classFilter, setClassFilter] = useState<FantasyClassType | 'All'>('All');

  // Generation counter & loading states
  const [generationCount, setGenerationCount] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState<boolean>(false);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState<boolean>(false);
  const [, startTransition] = useTransition();

  // Subtle card entry & exit animation effect: 'flip' or 'fade'
  const [cardAnimationEffect, setCardAnimationEffect] = useState<'flip' | 'fade'>(() => {
    const saved = localStorage.getItem('card_animation_fx');
    return saved === 'fade' ? 'fade' : 'flip';
  });

  const handleAnimationEffectChange = (effect: 'flip' | 'fade') => {
    setCardAnimationEffect(effect);
    localStorage.setItem('card_animation_fx', effect);
  };

  // Save to localStorage when deck updates
  useEffect(() => {
    try {
      localStorage.setItem('fantasy_player_deck', JSON.stringify(deck));
    } catch {
      // Ignore quota errors
    }
  }, [deck]);

  // Handle Generate Character button click (creates a new character with all stats, name, class, backstory)
  const handleGenerate = () => {
    setIsRolling(true);
    
    setTimeout(() => {
      let newChar = generateRandomCharacter();

      // If user selected a specific class filter, roll until matching class
      if (classFilter !== 'All') {
        let attempts = 0;
        while (newChar.characterClass !== classFilter && attempts < 25) {
          newChar = generateRandomCharacter();
          attempts++;
        }
      }

      startTransition(() => {
        setCharacter(newChar);
        setHistory((prev) => [newChar, ...prev.slice(0, 19)]); // Keep last 20
        setGenerationCount((c) => c + 1);
        setIsRolling(false);
      });
    }, 150);
  };

  // Handle "Generate Portrait" (creates the first portrait for the character currently displayed)
  const handleGeneratePortrait = () => {
    setIsGeneratingPortrait(true);
    setTimeout(() => {
      const initialVariant = 1;
      const initialUrl = CLASS_PORTRAIT_IMAGES[character.characterClass] || getDiceBearPortraitUrl(character.name, character.characterClass, 1);
      
      const updatedChar: FantasyCharacter = {
        ...character,
        portraitVariant: initialVariant,
        portraitUrl: initialUrl,
      };

      startTransition(() => {
        setCharacter(updatedChar);
        setHistory((prev) =>
          prev.map((c) => (c.id === updatedChar.id ? updatedChar : c))
        );
        setDeck((prev) =>
          prev.map((c) => (c.id === updatedChar.id ? updatedChar : c))
        );
        setIsGeneratingPortrait(false);
      });
    }, 250);
  };

  // Handle "Regenerate Portrait" (replaces it with a new portrait while keeping the same character)
  const handleRegeneratePortrait = () => {
    setIsGeneratingPortrait(true);
    setTimeout(() => {
      const currentVariant = character.portraitVariant || 1;
      const nextVariant = currentVariant + 1;
      const nextUrl =
        nextVariant === 1
          ? CLASS_PORTRAIT_IMAGES[character.characterClass]
          : getDiceBearPortraitUrl(character.name, character.characterClass, nextVariant);

      const updatedChar: FantasyCharacter = {
        ...character,
        portraitVariant: nextVariant,
        portraitUrl: nextUrl,
      };

      startTransition(() => {
        setCharacter(updatedChar);
        setHistory((prev) =>
          prev.map((c) => (c.id === updatedChar.id ? updatedChar : c))
        );
        setDeck((prev) =>
          prev.map((c) => (c.id === updatedChar.id ? updatedChar : c))
        );
        setIsGeneratingPortrait(false);
      });
    }, 250);
  };

  // Handle "Generate Backstory" / "Regenerate Backstory" for the currently displayed character
  const handleGenerateBackstory = () => {
    setIsGeneratingBackstory(true);
    setTimeout(() => {
      const newBackstory = generateCharacterBackstory({
        name: character.name,
        characterClass: character.characterClass,
        subclass: character.subclass,
        race: character.race,
        signatureWeapon: character.signatureWeapon,
      });

      const updatedChar: FantasyCharacter = {
        ...character,
        backstory: newBackstory,
      };

      startTransition(() => {
        setCharacter(updatedChar);
        setHistory((prev) =>
          prev.map((c) => (c.id === updatedChar.id ? updatedChar : c))
        );
        setDeck((prev) =>
          prev.map((c) => (c.id === updatedChar.id ? updatedChar : c))
        );
        setIsGeneratingBackstory(false);
      });
    }, 200);
  };

  // Handle "Save to Deck" button: saves character with portrait, name, class, backstory, and stats
  const handleSaveToDeck = (charToSave: FantasyCharacter) => {
    const initializedChar: FantasyCharacter = {
      ...charToSave,
      level: charToSave.level || 1,
      experience: charToSave.experience || 0,
      maxExperience: charToSave.maxExperience || 100,
      totalXp: charToSave.totalXp || 0,
    };

    setDeck((prev) => {
      const existingIndex = prev.findIndex(
        (c) => c.id === initializedChar.id || c.name === initializedChar.name
      );

      if (existingIndex >= 0) {
        // Update existing saved card with any new portrait/backstory changes
        const updated = [...prev];
        updated[existingIndex] = {
          ...initializedChar,
          // Retain existing level and xp progress if already trained
          level: prev[existingIndex].level || initializedChar.level,
          experience: prev[existingIndex].experience ?? initializedChar.experience,
          maxExperience: prev[existingIndex].maxExperience || initializedChar.maxExperience,
          totalXp: prev[existingIndex].totalXp || initializedChar.totalXp,
          cardStats: prev[existingIndex].cardStats || initializedChar.cardStats,
        };
        return updated;
      } else {
        // Add new card to top of deck
        return [initializedChar, ...prev];
      }
    });
  };

  // Handle training a character in the deck: gains XP based on stats, increases HP/Mana/STR on level up
  const handleTrainDeckCharacter = (
    characterId: string,
    trainingType: 'balanced' | 'martial' | 'mystic' | 'cunning' = 'balanced'
  ): TrainingResult | void => {
    let result: TrainingResult | undefined;

    setDeck((prev) => {
      // Match by exact ID or matching active character name
      const targetIndex = prev.findIndex(
        (c) => c.id === characterId || (character.id === characterId && c.name === character.name)
      );

      if (targetIndex === -1) return prev;

      result = trainDeckCharacter(prev[targetIndex], trainingType);
      const updatedDeck = [...prev];
      updatedDeck[targetIndex] = result.updatedCharacter;

      // Also sync current active character if it matches
      if (character.id === characterId || character.name === prev[targetIndex].name) {
        setCharacter(result.updatedCharacter);
      }

      return updatedDeck;
    });

    return result;
  };

  // Handle training all characters in My Deck at once
  const handleTrainAllDeckCharacters = (
    trainingType: 'balanced' | 'martial' | 'mystic' | 'cunning' = 'balanced'
  ) => {
    setDeck((prev) => {
      return prev.map((char) => {
        const result = trainDeckCharacter(char, trainingType);
        if (character.id === char.id || character.name === char.name) {
          setCharacter(result.updatedCharacter);
        }
        return result.updatedCharacter;
      });
    });
  };

  // Handle removing a card from My Deck
  const handleRemoveFromDeck = (characterId: string) => {
    setDeck((prev) => prev.filter((c) => c.id !== characterId));
  };

  // Handle clearing My Deck
  const handleClearDeck = () => {
    if (window.confirm?.('Are you sure you wish to clear all cards from My Deck?') ?? true) {
      setDeck([]);
    }
  };

  // Keyboard shortcut: Spacebar generates a character (when not focused on inputs)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === 'Space' &&
        (e.target as HTMLElement).tagName !== 'BUTTON' &&
        (e.target as HTMLElement).tagName !== 'SELECT'
      ) {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [classFilter]);

  const isCurrentCharacterInDeck = deck.some(
    (c) => c.id === character.id || c.name === character.name
  );

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col items-center justify-start py-8 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden">
      {/* Subtle Ancient Alchemist Workbench Textured Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center opacity-10 mix-blend-multiply"
        style={{ backgroundImage: `url(${alchemyWorkbenchBg})` }}
      />

      {/* Atmospheric Workbench Ambient Glow & Transmutation Circles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-200/40 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 -left-32 w-[450px] h-[450px] bg-yellow-200/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-10 -right-32 w-[450px] h-[450px] bg-amber-200/30 blur-[130px] rounded-full" />

        <div className="absolute top-20 right-8 opacity-10 hidden xl:block">
          <TransmutationCircle className="w-64 h-64 text-amber-700" />
        </div>
        <div className="absolute bottom-20 left-8 opacity-10 hidden xl:block">
          <TransmutationCircle className="w-64 h-64 text-amber-700" />
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        {/* Header Section */}
        <header className="text-center mb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-amber-100/90 border border-amber-300 text-amber-900 mb-1 shadow-2xs font-cinzel">
            <FlaskConical className="w-3.5 h-3.5 text-amber-700" />
            <span>Alchemist's Game Card Crucible</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-fantasy-name text-stone-900 drop-shadow-xs"
          >
            Fantasy Player Card Creator
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto font-medieval leading-relaxed">
            Transmute legendary fantasy champion cards complete with illustrated portraits, Health, Mana, and Strength stats, origin backstories, and build your custom deck.
          </p>
        </header>

        {/* Mysterious Ambient Audio / Soundtrack Widget */}
        <MysteriousAudioPlayer />

        {/* Central Generator Control Box (Simplified, Single Action) */}
        <div className="w-full bg-white/95 border border-amber-200 rounded-2xl p-5 sm:p-6 mb-7 shadow-sm space-y-4 relative overflow-hidden">
          <BrassCorner position="top-left" className="w-6 h-6" />
          <BrassCorner position="top-right" className="w-6 h-6" />
          <BrassCorner position="bottom-left" className="w-6 h-6" />
          <BrassCorner position="bottom-right" className="w-6 h-6" />

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 z-10 relative">
            {/* Prominent "Generate Character" button */}
            <motion.button
              type="button"
              id="btn-generate-character"
              onClick={handleGenerate}
              disabled={isRolling}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base sm:text-lg font-bold text-stone-950 tracking-wider shadow-sm transition-all cursor-pointer font-cinzel border border-amber-400 ${
                isRolling
                  ? 'bg-amber-300 opacity-90'
                  : 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 hover:shadow-md'
              }`}
            >
              <Dices
                className={`w-6 h-6 text-stone-950 transition-transform ${
                  isRolling ? 'rotate-180 transition-transform duration-300' : ''
                }`}
              />
              <span className="font-extrabold uppercase tracking-widest">Generate Character</span>
            </motion.button>

            {/* Class Filter selector */}
            <div className="sm:w-60">
              <label
                htmlFor="class-filter-select"
                className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1.5 font-cinzel flex items-center justify-between"
              >
                <span>Element / Class Filter</span>
                <span className="text-[10px] text-amber-800 font-semibold lowercase">15 classes</span>
              </label>
              <div className="relative">
                <select
                  id="class-filter-select"
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value as FantasyClassType | 'All')}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-500 font-cinzel cursor-pointer shadow-2xs"
                >
                  <option value="All">All Guilds (Random 15 Classes)</option>
                  <optgroup label="🇮🇳 Indian Region & Vedic Epic Classes">
                    <option value="Kshatriya">⚔️ Kshatriya (Dharma Vanguard)</option>
                    <option value="Dhanurdhar">🎯 Dhanurdhar (Celestial Archer)</option>
                    <option value="Rishi">📜 Rishi (Vedic Mystic & Seer)</option>
                    <option value="Mayavi">👁️ Mayavi (Illusionist Sorcerer)</option>
                    <option value="Yogi">🧘 Yogi (Chakra & Prana Master)</option>
                  </optgroup>
                  <optgroup label="🏰 Classic Fantasy Classes">
                    <option value="Warrior">🛡️ Warrior</option>
                    <option value="Mage">🔮 Mage</option>
                    <option value="Rogue">⚡ Rogue</option>
                    <option value="Ranger">🏹 Ranger</option>
                    <option value="Paladin">☀️ Paladin</option>
                    <option value="Cleric">✨ Cleric</option>
                    <option value="Druid">🌿 Druid</option>
                    <option value="Bard">🎵 Bard</option>
                    <option value="Warlock">🔥 Warlock</option>
                    <option value="Monk">🥋 Monk</option>
                  </optgroup>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Helper Bar with Card Animation Effect Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 pt-3 border-t border-amber-100 z-10 relative font-medieval">
            <div className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-600" />
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-stone-100 border border-stone-300 text-stone-800 font-mono text-[10px]">Space</kbd> anytime to transmute a card</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Card Animation Effect Toggle */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-stone-600 font-cinzel">Card FX:</span>
                <div className="inline-flex rounded-lg border border-stone-300 bg-stone-100 p-0.5 text-[11px] font-cinzel">
                  <button
                    type="button"
                    id="btn-fx-flip"
                    onClick={() => handleAnimationEffectChange('flip')}
                    className={`px-2.5 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                      cardAnimationEffect === 'flip'
                        ? 'bg-amber-400 text-stone-950 shadow-2xs'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                    title="3D Card Flip entry and exit animation"
                  >
                    3D Flip
                  </button>
                  <button
                    type="button"
                    id="btn-fx-fade"
                    onClick={() => handleAnimationEffectChange('fade')}
                    className={`px-2.5 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                      cardAnimationEffect === 'fade'
                        ? 'bg-amber-400 text-stone-950 shadow-2xs'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                    title="Soft Fade and Glide entry and exit animation"
                  >
                    Soft Fade
                  </button>
                </div>
              </div>

              <span className="text-stone-600">Transmutation #{generationCount}</span>
            </div>
          </div>
        </div>

        {/* Formatted Fantasy Player Card */}
        <CharacterCard
          character={character}
          isInDeck={isCurrentCharacterInDeck}
          onSaveToDeck={handleSaveToDeck}
          onGeneratePortrait={handleGeneratePortrait}
          onRegeneratePortrait={handleRegeneratePortrait}
          onGenerateBackstory={handleGenerateBackstory}
          onTrainCharacter={handleTrainDeckCharacter}
          isGeneratingPortrait={isGeneratingPortrait}
          isGeneratingBackstory={isGeneratingBackstory}
          animationEffect={cardAnimationEffect}
        />

        {/* My Deck Section (View all previously saved characters & level them up) */}
        <MyDeck
          deck={deck}
          activeCharacterId={character.id}
          onSelectCard={(card) => {
            if (card.id === character.id) {
              setCharacter({ ...card, id: `deck-${Date.now()}` });
            } else {
              setCharacter(card);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onRemoveFromDeck={handleRemoveFromDeck}
          onClearDeck={handleClearDeck}
          onTrainCharacter={handleTrainDeckCharacter}
          onTrainAllCharacters={handleTrainAllDeckCharacters}
        />

        {/* History Strip */}
        <HistoryList
          characters={history}
          activeCharacterId={character.id}
          onSelectCharacter={(char) => {
            if (char.id === character.id) {
              setCharacter({ ...char, id: `hist-${Date.now()}` });
            } else {
              setCharacter(char);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onClearHistory={() => setHistory([character])}
        />

        {/* Footer */}
        <footer className="text-center mt-12 mb-4 text-xs text-stone-500 font-medieval">
          <p>Ancient Alchemist's Workbench • Fantasy Player Card Interface & Deck Builder</p>
        </footer>
      </div>
    </div>
  );
}



