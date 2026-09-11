# Fantasy Character Creator & Player Card Deck Builder

An immersive, ancient alchemist-themed web application that generates unique fantasy heroes, complete with collectible game cards, cartoon/video-game style portraits, dynamic stats (Health, Mana, Strength), lore-rich backstories, and a persistent "My Deck" collection.

---

## 🔮 What It Is

The **Fantasy Character Creator** allows roleplayers, writers, and game enthusiasts to conjure randomized fantasy champions. Presented on an **Ancient Alchemist's Workbench**, each character is rendered as a bordered fantasy collectible card featuring:

- **Character Identity**: Unique generated fantasy name, heroic title, class archetype, subclass, race, and moral alignment.
- **Illustrated Character Portrait**: Video-game and cartoon-style fantasy portrait art tailored to the character's class, with one-click re-rolls.
- **Player Card Stats**:
  - ❤️ **Health (HP)**: Vital force scaled to class resilience (e.g., higher for Warriors & Paladins).
  - ⚡ **Mana (MP)**: Arcane energy reservoir (e.g., boosted for Mages, Clerics & Warlocks).
  - ⚔️ **Strength (STR)**: Physical combat prowess.
- **Character Backstory & Lore**: Flavorful origin stories and narrative catalysts that can be re-rolled with a single click.
- **Complete RPG Attributes**: Traditional STR, DEX, CON, INT, WIS, and CHA matrix with class-affinity bonuses.
- **Weapons, Abilities & Traits**: Signature weapons, unique abilities, personal traits, and in-character quotes.
- **"My Deck" System**: A personal player deck where cards can be saved, inspected, and managed across sessions.

---

## 🚀 How to Use

### 1. Generating a Character Card
- Click the golden **"Generate Character"** button at the top of the workbench (or press the **`Space`** key on your keyboard).
- A completely fresh fantasy hero will be generated with all attributes, stats, portrait, and backstory.
- You can also select a specific class from the **"Filter by Class"** dropdown (e.g., Mage, Paladin, Rogue) before clicking generate.

### 2. Generating & Changing Portraits
- **One-Click Portrait Button**: Click the button positioned directly below the portrait lens (**"Generate Portrait"** if currently empty, or **"Change Portrait"** to cycle through stylized variants for the current character).
- Everything is kept in sync with the current character's identity and stats.

### 3. Generating Backstories
- On the player card, locate the **"Character Backstory & Origin Lore"** section.
- Click the **"New Backstory"** button located directly inside the backstory box header to re-roll an authentic origin story and narrative catalyst for the hero.

### 4. Saving Cards to "My Deck"
- Click the **"Save to Deck"** button located in the card header.
- The button will update to **"In Deck"**, and the full card data (name, class, stats, portrait, backstory, and traits) is stored into your persistent collection.
- Scroll down to the **"My Deck"** section to view your collection.

### 5. Managing "My Deck"
- **View Card**: Click **"View Card"** on any miniature card in your deck to display it as the primary active card on the workbench.
- **Remove Card**: Click the trash icon on a deck card to remove it from your collection.
- **Clear Deck**: Click **"Clear Deck"** at the top of the section to wipe all saved cards.

### 6. Copying Character Data
- Click **"Copy Card"** on the card header to copy the full character sheet (stats, backstory, attributes, and equipment) directly to your clipboard in formatted text.

---

## ⚙️ Important Information

### 1. Data Persistence
- Cards saved to **"My Deck"** are automatically persisted in browser `localStorage` under the key `fantasy_player_deck`.
- Your deck will remain intact when you refresh the page or return to the application in the same browser.

### 2. Keyboard Shortcuts
- **`Spacebar`**: Triggers "Generate Character" instantly when no text input or dropdown is focused.

### 3. Supported Fantasy Classes (15 Archetypes)

#### 🇮🇳 Indian Region & Vedic Epic Classes
1. **Kshatriya** (Dharma Vanguard & Astradhari Warrior): Noble warrior bound by Dharma and honor, wielding the legendary steel Khanda sword, spiked iron Gada mace, and golden battle armor.
2. **Dhanurdhar** (Master Archer & Celestial Astra Marksman): Legendary archer of supreme focus (*Ekagrata*), wielding the curved Gandiva bow to loose fiery Agneyastra and whirlwind Vayavastra arrows.
3. **Rishi** (Vedic Mystic, Seer & Cosmic Channeler): Ancient hermit-seer tapping into cosmic vibrations, sacred palm-leaf Samhitas, and primordial mantras to invoke celestial boons and divine shields.
4. **Mayavi** (Illusionist Sorcerer & Weaver of Maya): Cunning illusionist wielding the cosmic veil of *Maya*, casting deceptive phantom duplicates, peacock-feather glamours, and spatial mirages.
5. **Yogi** (Prana Master, Ascetic & Chakra Warrior): Master of Kundalini energy and the 7 sacred Chakras, channeling breath (*Prana*) into adamantine invulnerability (*Vajra Kaya*) and devastating shockwaves.

#### 🏰 Classic Fantasy Classes
6. **Warrior** (Ironclad Vanguard, Berserker, Champion)
7. **Mage** (Arcanist, Elementalist, Chronomancer)
8. **Rogue** (Shadowblade, Infiltrator, Swashbuckler)
9. **Ranger** (Beastmaster, Pathfinder, Shadow Sniper)
10. **Paladin** (Oath of the Dawn, Sun Warden, Holy Avenger)
11. **Cleric** (Life Domain, War Priest, Light Bearer)
12. **Druid** (Circle of Thorns, Beast Shifter, Windcaller)
13. **Bard** (College of Blades, Lore Spinner, Siren Singer)
14. **Warlock** (Eldritch Scholar, Void Stalker, Nether Binder)
15. **Monk** (Way of the Astral Fist, Wind Walker, Shadow Ascetic)

---

### 🎵 4. Sparkling Gaming Mystery Soundtrack & AI Music Weaver
- **Sparkling Gaming Mystery Soundtrack ("Relic of Whispers")**:
  - Replaced the sleepy ambient drones with a single, high-energy sparkling adventure mystery soundtrack at **114 BPM**.
  - Features clockwork pizzicato mystery bass, sparkling 16th-note crystal celesta arpeggios, shimmering stardust echoes with dotted-8th stereo delay, and curious puzzle-solving melodic motifs.
- **Continuous Background Loop**: Seamlessly loops in the background without interruptions.
- **Auto-Awaken Gesture**: Automatically activates on first user interaction (click, keypress, Spacebar roll, or tap) and persists across tab focus and page navigation.
- **Lyria 3 Music Weaver (`lyria-3-clip-preview`)**:
  - Integrated full-stack AI music generation via `/api/generate-music` using Google's Lyria 3 model.
  - Allows generating custom 30-second mystical gaming soundtracks on demand with automatic background looping.
- **Interactive Controls**:
  - One-click Play / Pause button with live soundwave equalizer graphic.
  - Real-time volume slider (0% to 100%).
  - One-click toggle between built-in Sparkling Theme and custom AI-woven tracks.

### 5. Card Reveal Entry & Exit Animations
- **3D Card Flip**: Dynamic 3D perspective tilt (`rotateY` / `rotateX`), elevation float, and foil glint sweep when revealing a new card or inspecting from My Deck.
- **Soft Fade & Glide**: Subtle vertical glide and opacity fade for a minimalist, smooth card transition.
- **Toggle Control**: Easily switch between **3D Flip** and **Soft Fade** via the **Card FX** toggle in the main generator control box.

---

## 🛠️ Tech Stack & Scripts

- **Framework**: React 19 with TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS with custom typography & animations
- **Animation**: `motion` (Framer Motion)
- **Icons**: `lucide-react`
- **Fonts**: Google Fonts (`Cinzel Decorative`, `Cinzel`, `MedievalSharp`)

### Development & Build Commands

```bash
# Start the local development server (binds to 0.0.0.0:3000)
npm run dev

# Run TypeScript type-checking / linting
npm run lint

# Build the production bundle into dist/
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 File Structure

```
├── index.html                   # HTML entry point with fantasy typography & meta tags
├── metadata.json                # Application permissions & metadata configuration
├── package.json                 # Dependencies and build scripts
├── README.md                    # Project documentation
├── src/
│   ├── App.tsx                  # Main app component & state orchestration
│   ├── main.tsx                 # React DOM mount entry
│   ├── types.ts                 # TypeScript interfaces (FantasyCharacter, CardStats, etc.)
│   ├── index.css                # Tailwind CSS imports and custom utility classes
│   ├── assets/
│   │   └── images/              # Ancient alchemist workbench backgrounds
│   ├── components/
│   │   ├── AlchemyDecorations.tsx # Brass filigree corners and alchemical sigils
│   │   ├── CharacterCard.tsx    # Bordered collectible fantasy player card
│   │   ├── CharacterPortrait.tsx# Scrying lens portrait frame & generators
│   │   ├── ClassIcon.tsx        # Dynamic fantasy class icon renderer
│   │   ├── ClassSvgAvatar.tsx   # Stylized SVG avatar fallbacks
│   │   ├── HistoryList.tsx      # Generation history timeline
│   │   ├── MyDeck.tsx           # Saved player card collection and deck manager
│   │   └── MysteriousAudioPlayer.tsx # Mysterious ambient soundtrack controller & visualizer
│   ├── utils/
│   │   └── mysteriousAudio.ts   # Web Audio procedural synthesis engine (Vedic/Alchemist/Astral)
│   └── data/
│       ├── backstoryData.ts     # Character backstory generator & lore tables
│       ├── fantasyData.ts       # Class definitions, name generators & stat rollers
│       └── portraitAssets.ts    # High-resolution video-game portrait assets
└── vite.config.ts               # Vite configuration
```
