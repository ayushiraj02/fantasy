import { FantasyClassType, FantasyClassInfo, FantasyCharacter, CharacterStats, CardStats } from '../types';
import { generateCharacterBackstory } from './backstoryData';

export const FANTASY_CLASSES: Record<FantasyClassType, FantasyClassInfo> = {
  Warrior: {
    name: 'Warrior',
    role: 'Frontline Combatant & Vanguard',
    badgeColor: 'text-amber-900 bg-amber-100/90 border-amber-300',
    accentBg: 'from-amber-50 to-orange-50',
    borderColor: 'border-amber-300',
    description: 'Master of weapons, armor, and direct battlefield martial dominance.',
    primaryStat: 'strength',
    subclasses: ['Vanguard', 'Berserker', 'Battlemaster', 'Champion Knight', 'Shield Warden'],
    signatureWeapons: [
      'Gilded Greatsword',
      'Dragonbone Warhammers',
      'Tower Shield & Broadsword',
      'Serrated Halberd',
      'Ancestral Greataxe',
    ],
    specialAbilities: [
      'Iron Will & Cleave',
      'Unstoppable Rampart',
      'Battle Cry of Valhalla',
      'Titan’s Respite',
      'Whirlwind Severance',
    ],
    sampleQuotes: [
      'Steel does not lie; it tests the spirit and settles all disputes.',
      'My shield stands between the innocent and the dark.',
      'Until the last breath leaves my chest, this line shall hold!',
    ],
  },
  Mage: {
    name: 'Mage',
    role: 'Master of Arcane Spellcraft',
    badgeColor: 'text-violet-900 bg-violet-100/90 border-violet-300',
    accentBg: 'from-violet-50 to-purple-50',
    borderColor: 'border-violet-300',
    description: 'Weaver of primordial elements and mystic reality-shaping spells.',
    primaryStat: 'intelligence',
    subclasses: ['Pyromancer', 'Chronomancer', 'Archmage', 'Abjurer', 'Spellweaver'],
    signatureWeapons: [
      'Starlight Crystal Staff',
      'Tome of Astral Conduits',
      'Enchanted Runed Wand',
      'Orb of Frozen Echoes',
      'Arcane Spellblade',
    ],
    specialAbilities: [
      'Meteor Swarm & Rift Pulse',
      'Temporal Rewind',
      'Aegis of Pure Force',
      'Chain Arc Lightning',
      'Glacial Cataclysm',
    ],
    sampleQuotes: [
      'The cosmos speaks in runes and embers; I merely interpret its wrath.',
      'Knowledge is the deepest forge; reality itself is our clay.',
      'You fear the flame, yet you understand neither its warmth nor its hunger.',
    ],
  },
  Rogue: {
    name: 'Rogue',
    role: 'Infiltrator & Precision Assassin',
    badgeColor: 'text-emerald-900 bg-emerald-100/90 border-emerald-300',
    accentBg: 'from-emerald-50 to-teal-50',
    borderColor: 'border-emerald-300',
    description: 'Operates in shadows with lethal cunning, poison, and unmatched agility.',
    primaryStat: 'dexterity',
    subclasses: ['Shadowblade', 'Phantom Assassin', 'Swashbuckler', 'Master Infiltrator', 'Trickster'],
    signatureWeapons: [
      'Twin Obsidian Daggers',
      'Silent Repeating Hand-Crossbow',
      'Poison-Dipped Stiletto',
      'Shadow-Forged Rapier',
      'Gilded Throwing Knives',
    ],
    specialAbilities: [
      'Smoke Mirage & Shadowstep',
      'Lethal Anatomical Strike',
      'Acrobatic Evade',
      'Nightfall Shroud',
      'Flurry of Blades',
    ],
    sampleQuotes: [
      'The loudest scream is the one silenced before it reaches the lips.',
      'Locks are merely invitations from those lacking imagination.',
      'By the time you notice my silhouette, the deal is already struck.',
    ],
  },
  Ranger: {
    name: 'Ranger',
    role: 'Wilderness Scout & Marksman',
    badgeColor: 'text-teal-900 bg-teal-100/90 border-teal-300',
    accentBg: 'from-teal-50 to-emerald-50',
    borderColor: 'border-teal-300',
    description: 'Deadly tracker and marksman attuned to the instincts and hazards of the wilds.',
    primaryStat: 'dexterity',
    subclasses: ['Gloom Stalker', 'Beast Companion', 'Horizon Walker', 'Windstrider', 'Apex Hunter'],
    signatureWeapons: [
      'Yew Recurve Longbow',
      'Dual Bone-Hilted Shortswords',
      'Fletched Storm-Arrows',
      'Hawthorn Stalker Spear',
      'Silent Composite Crossbow',
    ],
    specialAbilities: [
      'Rain of Volley Arrows',
      'Hunter’s Mark of the Hawk',
      'Camouflage & Woodland Meld',
      'Summon Spirit Wolf',
      'Zephyr Sprint',
    ],
    sampleQuotes: [
      'The forest forgives mistakes only once; learn its rhythm or become its dust.',
      'My arrows never seek a target; the wind carries them home.',
      'Nature is neither cruel nor kind. It is absolute.',
    ],
  },
  Paladin: {
    name: 'Paladin',
    role: 'Holy Champion & Oathkeeper',
    badgeColor: 'text-amber-900 bg-amber-100/90 border-amber-300',
    accentBg: 'from-amber-50 to-yellow-50',
    borderColor: 'border-amber-300',
    description: 'Holy warrior channeling celestial radiance to smite evils and bolster allies.',
    primaryStat: 'charisma',
    subclasses: ['Oath of the Dawn', 'Vengeance Crusader', 'Oath of the Ancients', 'Holy Redeemer', 'Sun Warden'],
    signatureWeapons: [
      'Radiant Sun-Blade',
      'Sanctified War Hammer',
      'Blessed Tower Bulwark',
      'Solar Lance of Justice',
      'Silvered Greatsword',
    ],
    specialAbilities: [
      'Divine Smite of Dawn',
      'Aura of Courage & Warding',
      'Lay on Hands (Heal)',
      'Solar Judgement Pillar',
      'Sacred Steed Manifestation',
    ],
    sampleQuotes: [
      'My vow is my armor, and righteousness burns away all shadows.',
      'Stand behind me; darkness shall not touch you while I draw breath.',
      'Justice is not blind when guided by the eternal flame.',
    ],
  },
  Cleric: {
    name: 'Cleric',
    role: 'Divine Emissary & Restorer',
    badgeColor: 'text-sky-900 bg-sky-100/90 border-sky-300',
    accentBg: 'from-sky-50 to-blue-50',
    borderColor: 'border-sky-300',
    description: 'Ordained vessel of the gods, restoring life and wielding divine vengeance.',
    primaryStat: 'wisdom',
    subclasses: ['Life Domain', 'Tempest Herald', 'Light Bringer', 'War Priest', 'Twilight Guardian'],
    signatureWeapons: [
      'Gilded Morningstar',
      'Celestial Reliquary Mace',
      'Blessed Silver Holy Symbol',
      'Sunburst Flail',
      'Censer of Cleansing Flame',
    ],
    specialAbilities: [
      'Miraculous Revival Word',
      'Wrath of the Heavens',
      'Sanctuary Field',
      'Turn the Undead',
      'Beacon of Divine Renewal',
    ],
    sampleQuotes: [
      'In the darkest hour, the gods do not abandon us; they test our devotion.',
      'Breathe easy, friend. The Light will mend what was broken.',
      'Woe to the wicked, for holy fire cleanses all corruptions.',
    ],
  },
  Druid: {
    name: 'Druid',
    role: 'Shapechanger & Nature Sovereign',
    badgeColor: 'text-emerald-900 bg-emerald-100/90 border-emerald-300',
    accentBg: 'from-emerald-50 to-green-50',
    borderColor: 'border-emerald-300',
    description: 'Primal guardian who shifts into ferocious beasts and commands root and storm.',
    primaryStat: 'wisdom',
    subclasses: ['Circle of the Moon', 'Circle of Spores', 'Circle of Wildfire', 'Circle of the Land'],
    signatureWeapons: [
      'Ironwood Quarterstaff',
      'Yew Sickle of Thorns',
      'Bramblebound Scythe',
      'Living Bark Buckler',
      'Amber-Tipped Spear',
    ],
    specialAbilities: [
      'Apex Beast Wildshape',
      'Tanglevine & Thornburst',
      'Call Lightning Storm',
      'Rebirth of the Wildfire Spirit',
      'Barkskin Fortress',
    ],
    sampleQuotes: [
      'Stone weathers, empires rot, but the seed always breaks the ruin.',
      'The trees remember every blood drop you have ever spilled.',
      'I do not tame the wild; I am the wild.',
    ],
  },
  Bard: {
    name: 'Bard',
    role: 'Mystic Minstrel & Lorekeeper',
    badgeColor: 'text-pink-900 bg-pink-100/90 border-pink-300',
    accentBg: 'from-pink-50 to-rose-50',
    borderColor: 'border-pink-300',
    description: 'Spins enchantments through music, wit, and forgotten ancient verse.',
    primaryStat: 'charisma',
    subclasses: ['College of Lore', 'College of Swords', 'College of Glamour', 'College of Whispers'],
    signatureWeapons: [
      'Silver-Strung Rosewood Lute',
      'Gilded Rapier of Elegance',
      'Enchanted Elven Flute',
      'Dueling Dagger & Parrying Buckler',
      'Song-Forged Sabre',
    ],
    specialAbilities: [
      'Song of Inspiration & Valor',
      'Dissonant Cacophony',
      'Bewitching Symphony',
      'Blade Flourish Dance',
      'Heroic Hymn of Reversal',
    ],
    sampleQuotes: [
      'History is written by the victors, but songs outlive even the throne.',
      'A sharp tongue often pierces deeper than any dragon-forged steel.',
      'Every legend begins with a spark of madness and a great chorus.',
    ],
  },
  Warlock: {
    name: 'Warlock',
    role: 'Eldritch Binder & Occultist',
    badgeColor: 'text-purple-900 bg-purple-100/90 border-purple-300',
    accentBg: 'from-purple-50 to-indigo-50',
    borderColor: 'border-purple-300',
    description: 'Binds pacts with eldritch cosmic entities for forbidden, devastating magic.',
    primaryStat: 'charisma',
    subclasses: ['Eldritch Voidwalker', 'Fiend Pact Warden', 'Archfey Trickster', 'Great Old One Emissary'],
    signatureWeapons: [
      'Obsidian Eldritch Focus',
      'Tentacle-Wreathed Bone Blade',
      'Grimoire of Shadow Pacts',
      'Soul-Siphon Scythe',
      'Rune-Carved Dagger',
    ],
    specialAbilities: [
      'Eldritch Blast Barrage',
      'Void Singularity',
      'Soul Devourer Shroud',
      'Pact Weapon Warp',
      'Shadow Gate Teleport',
    ],
    sampleQuotes: [
      'Power is never given freely; I simply had the stomach to pay the price.',
      'The void does not judge—it only consumes.',
      'What mortals call madness, I call clarity.',
    ],
  },
  Monk: {
    name: 'Monk',
    role: 'Ki Channeler & Martial Ascetic',
    badgeColor: 'text-orange-900 bg-orange-100/90 border-orange-300',
    accentBg: 'from-orange-50 to-amber-50',
    borderColor: 'border-orange-300',
    description: 'Harnesses spiritual ki to move faster than lightning and strike with lethal force.',
    primaryStat: 'dexterity',
    subclasses: ['Way of the Open Hand', 'Shadow Discipline', 'Four Elements Adept', 'Drunken Brawler', 'Astral Spirit'],
    signatureWeapons: [
      'Ancestral Bo Staff',
      'Adamantine Nunchaku',
      'Spirit-Woven Handwraps',
      'Wind-Carved Sickles',
      'Unarmed Astral Fists',
    ],
    specialAbilities: [
      'Flurry of a Hundred Blows',
      'Stunning Ki Disruption',
      'Deflect Missiles mid-air',
      'Diamond Body Invulnerability',
      'Step of the Wind',
    ],
    sampleQuotes: [
      'Clear the mind of desire, and the body becomes an unbreakable tempest.',
      'True power is not striking hard, but striking at the exact moment.',
      'The storm rages around the mountain, yet the mountain remains still.',
    ],
  },
  Kshatriya: {
    name: 'Kshatriya',
    role: 'Dharma Vanguard & Astradhari Warrior',
    badgeColor: 'text-amber-900 bg-amber-100/90 border-amber-400',
    accentBg: 'from-amber-50 to-orange-50',
    borderColor: 'border-amber-400',
    description: 'Noble warrior bound by Dharma and valor, wielding the sacred Khanda sword, spiked Gada mace, and celestial battle armor.',
    primaryStat: 'strength',
    subclasses: ['Maharathi', 'Dharmic Champion', 'Vanguard of Hastina', 'Agni-Forged Knight', 'Sovereign Rakshak'],
    signatureWeapons: [
      'Steel Khanda Blade',
      'Spiked Iron Gada (Heavy Mace)',
      'Ornate Gold Talwar Sabre',
      'Chakram of Retribution',
      'Golden Dhal Shield & Lance',
    ],
    specialAbilities: [
      'Astradhari Onslaught',
      'Unyielding Dharma Stance',
      'Gada Shockwave Cleave',
      'Surya Invocation',
      'Roar of the Royal Lion',
    ],
    sampleQuotes: [
      'Dharma is my shield; when righteousness is threatened, my blade shall answer.',
      'A true warrior fights not out of hatred for what is in front of him, but out of devotion to what he protects.',
      'Let the war conch sound; honor and truth shall never yield!',
    ],
  },
  Dhanurdhar: {
    name: 'Dhanurdhar',
    role: 'Master Archer & Celestial Astra Marksman',
    badgeColor: 'text-emerald-900 bg-emerald-100/90 border-emerald-400',
    accentBg: 'from-emerald-50 to-teal-50',
    borderColor: 'border-emerald-400',
    description: 'Legendary archer of unmatched focus (Ekagrata), capable of loosing celestial Astra arrows that pierce through mountains and storms.',
    primaryStat: 'dexterity',
    subclasses: ['Savyasachi (Dual-Handed Archer)', 'Astra Seeker', 'Jungle Vanachara', 'Sun-Bow Champion', 'Wind-Piercer'],
    signatureWeapons: [
      'Gandiva Curved Longbow',
      'Agneyastra Fire-Tipped Quiver',
      'Sharangha Golden Divine Bow',
      'Moon-Silver Daggers',
      'Vayu-Infused Broadhead Arrows',
    ],
    specialAbilities: [
      'Brahmashira Arrow Volley',
      'Piercing Eye of the Fish (Ekagrata)',
      'Vayu Whirlwind Shot',
      'Varunastra Rain of Darts',
      'Shadow-Split Triple Arrow',
    ],
    sampleQuotes: [
      'I see neither the tree nor the branch; I see only the eye of the bird.',
      'An arrow drawn with pure conviction bends the very winds to find its mark.',
      'My bow sings the rhythm of the cosmos before the thunder strikes.',
    ],
  },
  Rishi: {
    name: 'Rishi',
    role: 'Vedic Mystic, Seer & Cosmic Channeler',
    badgeColor: 'text-indigo-900 bg-indigo-100/90 border-indigo-400',
    accentBg: 'from-indigo-50 to-violet-50',
    borderColor: 'border-indigo-400',
    description: 'Ancient hermit-seer who taps into cosmic vibrations, sacred mantras, and primordial Vedic chants to summon celestial boons.',
    primaryStat: 'wisdom',
    subclasses: ['Brahmarishi', 'Jyotishi (Astral Seer)', 'Agni Homa Priest', 'Samhita Lorekeeper', 'Tapasvi Ascetic'],
    signatureWeapons: [
      'Rudraksha Mala & Kamandalu',
      'Carved Khadira Wood Staff',
      'Sacred Shankha (Conch Shell)',
      'Palm-Leaf Yantra Scrolls',
      'Silver Fire-Ritual Danda',
    ],
    specialAbilities: [
      'Maha Mantra Resonation',
      'Divya Drishti (Cosmic Vision)',
      'Agni-Homa Cleansing Aura',
      'Shanti Barrier Ward',
      'Celestial Boon of Indra',
    ],
    sampleQuotes: [
      'All matter is merely vibrating sound; chant the eternal truth and reality bends.',
      'He who conquers his inner beasts holds sovereignty over the entire universe.',
      'The stars do not decide destiny; they illuminate the sacred thread.',
    ],
  },
  Mayavi: {
    name: 'Mayavi',
    role: 'Illusionist Sorcerer & Weaver of Maya',
    badgeColor: 'text-purple-900 bg-purple-100/90 border-purple-400',
    accentBg: 'from-purple-50 to-fuchsia-50',
    borderColor: 'border-purple-400',
    description: 'Mystic sorcerer wielding the cosmic veil of Maya, weaving phantasms, spectral mirages, and deceptive spatial distortions.',
    primaryStat: 'intelligence',
    subclasses: ['Chhaya Weaver', 'Indrajala Sorcerer', 'Mirage Sovereign', 'Astral Phantasmist', 'Night-Yantra Caster'],
    signatureWeapons: [
      'Peacock Feather Fan of Glamour',
      'Chhaya Mirror Wand',
      'Cinnabar Yantra Talisman',
      'Smoky Quartz Focus',
      'Shadow Katar Punch Dagger',
    ],
    specialAbilities: [
      'Indrajala (Cosmic Mirage Veil)',
      'Chhaya Multi-Clone Echo',
      'Phantasmal Dread Mandala',
      'Spatial Displacement Warp',
      'Hypnotic Mohini Trance',
    ],
    sampleQuotes: [
      'What you touch is illusion; what you believe is your cage.',
      'You swing your blade at my shadow while my real form watches from the stars.',
      'Reality is merely the dream of the waking mind; I control the dream.',
    ],
  },
  Yogi: {
    name: 'Yogi',
    role: 'Prana Master, Ascetic & Chakra Warrior',
    badgeColor: 'text-amber-950 bg-amber-100/90 border-amber-400',
    accentBg: 'from-amber-50 to-orange-50',
    borderColor: 'border-amber-400',
    description: 'Master of Kundalini energy and 7 sacred Chakras, channeling breath (Prana) into superhuman agility, invulnerability, and spiritual force.',
    primaryStat: 'constitution',
    subclasses: ['Siddha Master', 'Kundalini Conduit', 'Nath Mystic', 'Vajra Body Ascetic', 'Pranayama Striker'],
    signatureWeapons: [
      'Trishula of the Three Realms',
      'Brass Chimta & Singing Bowl',
      'Kusha Grass Cord Wraps',
      'Vajra Bronze Cestus',
      'Unarmed Prana Strikes',
    ],
    specialAbilities: [
      'Chakra Awakening Surge',
      'Vajra Kaya (Adamantine Body)',
      'Prana Shockwave Palm',
      'Sahasrara Radiance',
      'Levitation & Wind Breath',
    ],
    sampleQuotes: [
      'When breath is still, the mind is diamond; when prana flows, mountains shatter.',
      'The body is a temple of sacred fire; awaken its dormant serpent and walk through flame.',
      'In absolute stillness lies the most devastating strike.',
    ],
  },
};

export const FIRST_NAMES = [
  // Indian Epic & Mythic
  'Arjun', 'Vikram', 'Devrat', 'Karna', 'Nakul', 'Sahadev', 'Bheem', 'Eklavya',
  'Rudra', 'Kalyani', 'Tara', 'Ananya', 'Devika', 'Meera', 'Indira', 'Aditya',
  'Rishabh', 'Surya', 'Vayu', 'Shankar', 'Kavya', 'Padmavati', 'Savitri', 'Chanakya',
  'Harshavardhan', 'Ranveer', 'Satyajit', 'Varun', 'Garuda', 'Vasuki', 'Aniruddh',
  'Chandragupt', 'Damayanti', 'Janaki', 'Madhav', 'Priyavrat', 'Shantanu', 'Vidyadhar',
  // Elven / Mystic
  'Aeloria', 'Faelar', 'Sylas', 'Valerius', 'Lysandra', 'Elandor', 'Thalor', 'Zephyra',
  'Elyse', 'Xyris', 'Seraphina', 'Aeris', 'Kaelen', 'Lyra', 'Illyria', 'Theron', 'Vaelin',
  'Nyx', 'Solas', 'Elion', 'Caelynn', 'Althaea', 'Faerand', 'Lumin', 'Orion', 'Elowen',
  'Mythris', 'Lorien', 'Aurelius', 'Mirella', 'Kaelith', 'Sylvanna', 'Tariel', 'Zinnia',
  // Martial / Dwarven / Northern
  'Thorne', 'Berrick', 'Rogar', 'Grimjaw', 'Torvald', 'Brokk', 'Valgard', 'Durnan',
  'Korath', 'Gareth', 'Hagar', 'Vondor', 'Roland', 'Dagmar', 'Rurik', 'Thrumbar',
  'Brand', 'Kael', 'Bjorn', 'Kragan', 'Draken', 'Magnus', 'Vorn', 'Garrick',
  'Brina', 'Astrid', 'Helga', 'Freydis', 'Ingrid', 'Brynhild', 'Gunnar', 'Sigurd',
  // Cunning / Roguish / Shadows
  'Darian', 'Corvus', 'Vesper', 'Jax', 'Malakor', 'Ravena', 'Kaelis', 'Sylvan',
  'Zephyr', 'Talon', 'Jinx', 'Locke', 'Vane', 'Silas', 'Kazimir', 'Rook',
  'Finnick', 'Mercer', 'Draven', 'Shadow', 'Ren', 'Kasper', 'Bex', 'Skye',
  // Radiant / Divine
  'Alistair', 'Lucian', 'Caelum', 'Galahad', 'Theodora', 'Seraphiel', 'Castiel',
  'Eleanor', 'Justinian', 'Gideon', 'Celeste', 'Elysia', 'Gabriel', 'Balthazar', 'Evander',
];

export const SURNAMES_PARTS_PREFIX = [
  'Surya', 'Agni', 'Vayu', 'Chandra', 'Vajra', 'Dharma', 'Nag', 'Ganga',
  'Iron', 'Whisper', 'Storm', 'Dawn', 'Night', 'Shadow', 'Stone', 'Sun',
  'Star', 'Deep', 'Ember', 'Frost', 'Swift', 'Wolf', 'Raven', 'Bright',
  'Gale', 'Spell', 'Ash', 'Moon', 'Blood', 'Oaken', 'Fire', 'Silver',
  'Gold', 'Black', 'Thorn', 'Mist', 'Rune', 'Light', 'Bramble', 'Hollow',
  'Dusk', 'Wild', 'Thunder', 'Winter', 'Breeze', 'Sky', 'Drake', 'Valiant',
];

export const SURNAMES_PARTS_SUFFIX = [
  'bhanu', 'vanshi', 'teja', 'pala', 'dutta', 'varman', 'nath', 'dhar',
  'wind', 'breaker', 'caller', 'seeker', 'shade', 'weaver', 'guard', 'strider',
  'whisper', 'delver', 'heart', 'blade', 'kin', 'wood', 'shield', 'hoof',
  'borne', 'fall', 'fang', 'brand', 'fist', 'watcher', 'song', 'thorn',
  'bane', 'cloak', 'forge', 'runner', 'crest', 'mire', 'veil', 'stone',
  'helm', 'bound', 'spear', 'haven', 'ward', 'root', 'walker', 'rider',
];

export const EPITHETS = [
  'the Bearer of the Khanda',
  'the Wielder of Astras',
  'the Sovereign of Aryavarta',
  'of the Whispering Ghats',
  'the Seer of the Himalayas',
  'the Lotus-Eyed',
  'the Unconquered',
  'the Lion of the Vindhyas',
  'the Dawnbringer',
  'the Unbroken',
  'the Silent Blade',
  'the Sun-Forged',
  'of the Whispering Crag',
  'the Stormborn',
  'the Iron-Willed',
  'the Spellbound',
  'the Ghost of Arandar',
  'the Stargazer',
  'the Undaunted',
  'the Hearth-Keeper',
  'the Shadowdancer',
  'the Lionheart',
  'of the Silver Vale',
  'the Relentless',
  'the Frost-Veiled',
  'the Dragonkin',
  'the Shield of Hope',
  'the Wild-Strider',
];

export const RACES = [
  'Human of Aryavarta',
  'Vanara Champion',
  'Gandharva Celestial',
  'Yaksha Guardian',
  'Naga-Blooded',
  'Deva-Blessed',
  'High Elf',
  'Wood Elf',
  'Mountain Dwarf',
  'Shield Dwarf',
  'Human of the Coast',
  'Highlander Human',
  'Tiefling',
  'Dragonborn',
  'Halfling',
  'Half-Elf',
  'Half-Orc',
  'Aasimar',
  'Gnome of the Burrows',
  'Goliath',
];

export const ALIGNMENTS = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
  'Chaotic Neutral',
  'Lawful Evil',
  'Chaotic Evil',
];

export const CHARACTER_TRAITS = [
  'Keeps a journal bound in dragon-scaled leather.',
  'Can read omens in campfire embers and morning mist.',
  'Speaks four ancient dialects long forgotten by commoners.',
  'Has a loyal raven messenger named Archimedes.',
  'Never breaks a sworn oath, no matter the price.',
  'Carries an antique silver compass that points toward danger.',
  'Refuses to enter a tavern without checking the exits first.',
  'Possesses keen night vision and hears the rhythm of footsteps miles away.',
  'Fought against the Siege of Ironspire and survived against all odds.',
  'Adorned with glowing arcane tattoos that pulse during combat.',
  'Collects rare herbs, mineral gemstones, and lost cartography maps.',
  'Always carries lucky dice carved from sea-serpent tooth.',
  'Protects traveling merchants and helpless wanderers free of coin.',
  'Can disarm intricate traps with a hair needle in pitch darkness.',
];

export const CHARACTER_TITLES = [
  'Defender of the High Realm',
  'Nomad of the Forgotten Sands',
  'Warden of the Silver Spires',
  'Scourge of the Dread Marsh',
  'Champion of the Dawn Court',
  'Seeker of the Sunken Citadel',
  'Herald of the Astral Sea',
  'Guardian of the Elder Grove',
  'Whisperer of the Deep Catacombs',
  'Sovereign of the Northern Reaches',
];

// Helper to pick random item
export function pickRandom<T>(array: T[]): T {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

// Generate random stat between 8 and 18 (weighted standard 3d6 / 4d6 style)
export function rollStat(isPrimary: boolean = false): number {
  const base = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
  return isPrimary ? Math.max(base, 14 + Math.floor(Math.random() * 5)) : Math.max(base, 9);
}

// Generate a completely unique full name
export function generateFantasyName(): { fullName: string; title: string } {
  const firstName = pickRandom(FIRST_NAMES);
  const useEpithet = Math.random() < 0.45;
  const surname = `${pickRandom(SURNAMES_PARTS_PREFIX)}${pickRandom(SURNAMES_PARTS_SUFFIX)}`;
  
  let fullName = `${firstName} ${surname}`;
  let title = pickRandom(CHARACTER_TITLES);

  if (useEpithet) {
    const epithet = pickRandom(EPITHETS);
    if (Math.random() < 0.5) {
      fullName = `${firstName} ${surname}, ${epithet}`;
    } else {
      fullName = `${firstName} ${epithet}`;
      title = `${surname} Clan / House`;
    }
  }

  return { fullName, title };
}

// Generate the 3 key Card Stats: Health, Mana, and Strength (randomized and tailored to fantasy class)
export function generateCardStats(characterClass: FantasyClassType): CardStats {
  const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  let health: number;
  let mana: number;
  let strength: number;

  switch (characterClass) {
    case 'Warrior':
      health = rand(120, 155);
      mana = rand(25, 45);
      strength = rand(82, 99);
      break;
    case 'Paladin':
      health = rand(115, 145);
      mana = rand(65, 95);
      strength = rand(76, 94);
      break;
    case 'Mage':
      health = rand(65, 88);
      mana = rand(125, 160);
      strength = rand(25, 45);
      break;
    case 'Warlock':
      health = rand(75, 95);
      mana = rand(115, 150);
      strength = rand(35, 55);
      break;
    case 'Cleric':
      health = rand(95, 125);
      mana = rand(105, 140);
      strength = rand(55, 75);
      break;
    case 'Druid':
      health = rand(95, 125);
      mana = rand(100, 135);
      strength = rand(55, 78);
      break;
    case 'Rogue':
      health = rand(80, 105);
      mana = rand(45, 70);
      strength = rand(62, 82);
      break;
    case 'Ranger':
      health = rand(85, 115);
      mana = rand(50, 75);
      strength = rand(65, 85);
      break;
    case 'Monk':
      health = rand(95, 125);
      mana = rand(60, 85);
      strength = rand(72, 90);
      break;
    case 'Bard':
      health = rand(75, 98);
      mana = rand(95, 130);
      strength = rand(45, 68);
      break;
    case 'Kshatriya':
      health = rand(125, 160);
      mana = rand(35, 60);
      strength = rand(85, 99);
      break;
    case 'Dhanurdhar':
      health = rand(90, 118);
      mana = rand(55, 80);
      strength = rand(75, 92);
      break;
    case 'Rishi':
      health = rand(70, 95);
      mana = rand(130, 165);
      strength = rand(30, 50);
      break;
    case 'Mayavi':
      health = rand(72, 94);
      mana = rand(120, 155);
      strength = rand(35, 55);
      break;
    case 'Yogi':
      health = rand(110, 140);
      mana = rand(90, 125);
      strength = rand(70, 88);
      break;
    default:
      health = rand(80, 120);
      mana = rand(50, 100);
      strength = rand(50, 85);
  }

  return { health, mana, strength };
}

// Generate full random character
export function generateRandomCharacter(): FantasyCharacter {
  const classKeys = Object.keys(FANTASY_CLASSES) as FantasyClassType[];
  const chosenClassKey = pickRandom(classKeys);
  const classInfo = FANTASY_CLASSES[chosenClassKey];

  const { fullName, title } = generateFantasyName();
  const race = pickRandom(RACES);
  const alignment = pickRandom(ALIGNMENTS);
  const subclass = pickRandom(classInfo.subclasses);
  const signatureWeapon = pickRandom(classInfo.signatureWeapons);
  const specialAbility = pickRandom(classInfo.specialAbilities);
  const quote = pickRandom(classInfo.sampleQuotes);
  const trait = pickRandom(CHARACTER_TRAITS);

  // Generate traditional D&D stats
  const stats: CharacterStats = {
    strength: rollStat(classInfo.primaryStat === 'strength'),
    dexterity: rollStat(classInfo.primaryStat === 'dexterity'),
    constitution: rollStat(classInfo.primaryStat === 'constitution'),
    intelligence: rollStat(classInfo.primaryStat === 'intelligence'),
    wisdom: rollStat(classInfo.primaryStat === 'wisdom'),
    charisma: rollStat(classInfo.primaryStat === 'charisma'),
  };

  // Generate the three prominent card stats: Health, Mana, Strength
  const cardStats = generateCardStats(chosenClassKey);

  // Generate backstory
  const backstory = generateCharacterBackstory({
    name: fullName,
    characterClass: chosenClassKey,
    subclass,
    race,
    signatureWeapon,
  });

  return {
    id: `char-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: fullName,
    title,
    characterClass: chosenClassKey,
    subclass,
    race,
    alignment,
    stats,
    cardStats,
    level: 1,
    experience: 0,
    maxExperience: 100,
    totalXp: 0,
    backstory,
    signatureWeapon,
    specialAbility,
    trait,
    quote,
    createdAt: Date.now(),
  };
}
