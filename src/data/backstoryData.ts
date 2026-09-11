import { FantasyClassType } from '../types';

export const ORIGIN_STORIES: Record<FantasyClassType, string[]> = {
  Warrior: [
    'Born amidst the clang of iron in the high fortress of Oakhaven, they survived the brutal Siege of the Red Peaks before pledging their blade to defend the downtrodden.',
    'Once a disgraced vanguard captain sentenced to exile in the frozen tundras, they redeemed their honor by slaying a marauding frost drake with a shattered halberd.',
    'Raised by nomadic clans wandering the jagged spine of the Dragonfang mountains, they mastered every discipline of war before seeking their destiny beyond the horizon.',
    'A former gladiator in the sun-baked pits of Karthor who broke their iron shackles and led an uprising to liberate fellow enslaved champions.',
    'Scion of an ancient lineage of oath-wardens, sworn from their tenth summer to hold the northern border against the encroaching abyssal host.',
  ],
  Mage: [
    'Apprenticed to the secluded Star-Gazer conclave atop Mount Celestine, they unlocked forbidden astral rifts that etched glowing constellations across their skin.',
    'Discovered as an orphan inside a glowing circle of wild faerie fire, their latent elemental conduit astonished even the archmages of the High Citadel.',
    'Expelled from the Grand Academy of Aethelgard for conducting unorthodox temporal chronomancy to rescue their lost sibling from the void.',
    'Sole survivor of a catastrophic arcane cataclysm that consumed their home province, binding their soul to the primordial leylines of the cosmos.',
    'A scholarly hermit who spent decades decoding the ciphered codices of forgotten titan archmages within the subterranean libraries of Mor-Drakar.',
  ],
  Rogue: [
    'Trained in the clandestine alleys and moonlit rooftops of the grand canal city, they became a ghost legend whispered about by corrupt guildmasters.',
    'Orphaned during the Night of Red Embers, they survived by outsmarting street syndicates with twin daggers and an uncanny instinct for hidden traps.',
    'A former royal court cartographer who uncovered an illicit coup and vanished into the shadowed underworld before the executioner could strike.',
    'Master of the velvet shadow, having stolen the fabled Eye of the Moonstone directly from the vault of the High Inquisitor without raising a single alarm.',
    'A swashbuckling privateer who sailed the mist-shrouded reefs of the Pirate Sovereign sea, duel-wielding stolen rapier blades with deadly charisma.',
  ],
  Ranger: [
    'Raised deep within the ancient Whispering Canopy by elder treants, they speak the dialect of predators and can read centuries of lore in mossy footprints.',
    'Former border warden of the Western Marches who tracked a phantom shadow-beast across three kingdoms before putting it down with a single silver-fletched arrow.',
    'Exiled from their ancestral clan for protecting an injured sacred spirit wolf, who now fights eternally by their side in mutual bond.',
    'Patrolling the jagged frontiers where civilizations end, they guard innocent caravans from subterranean horrors lurking in the mountain crevices.',
    'A solitary stalker of the primeval barrows who learned to camouflage within the autumn brush and loose arrows faster than the autumn gale.',
  ],
  Paladin: [
    'Kneeling before the weeping statue of the Dawn Goddess during a plague, they were bathed in incandescent sunlight and gifted celestial retribution.',
    'Born to simple blacksmiths, they took up their father’s hammer when demons besieged their village, channeling blinding holy fire through the molten steel.',
    'A noble knight who renounced corrupt courtly titles to take the austere Oath of the Vanguard, wandering the realm to shield the forgotten and powerless.',
    'Consecrated in the golden cathedrals of Sol-Aethel after passing the Trial of Seven Fires without burning a single thread of their vestments.',
    'Sworn to an unbroken vow of righteous justice, their very footsteps leave faint glowing sparks that scorch the shadow creatures of the deep.',
  ],
  Cleric: [
    'A humble shrinekeeper whose midnight prayers summoned a chorus of celestial heralds, commanding them to carry the light into the blighted realms.',
    'Surviving a deadly shipwreck through divine providence, they established sanctuaries across the stormy coastline, healing all who seek shelter.',
    'Chosen by the deity of renewal during an eclipse, they bear the sacred holy symbol that can mend shattered flesh and rebuke ancient undead.',
    'Former apothecary whose compassionate herbal cures miraculously transformed into divine restorative miracles when plague ravaged the lower wards.',
    'An emissary of the Silver Light sent to cleanse corrupted tombs and restore peace to tormented spirits wandering the catacombs.',
  ],
  Druid: [
    'Attuned from birth to the heartbeat of the primeval elderwoods, their whispers can command briar roots to burst through stone foundations.',
    'Living for a decade in beast shape among mountain bears, they emerged back into human form only when corrupt industrialists began felling the sacred groves.',
    'Guardian of the ancient Stone Circle of Belenor, wielding the seasonal fury of blizzards and summer wildfires to preserve ecological balance.',
    'Born during an equinox thunderstorm inside a hollow lightning-struck oak tree, they hold dominion over the winds, rivers, and apex predators.',
    'A quiet hermit who tends the subterranean glow-fungi forests, guarding the boundary between root systems and abyssal caverns.',
  ],
  Bard: [
    'Trained in the gilded music halls of Highcrest, they discovered that harmonic frequencies struck upon their silver strings could warp physical reality.',
    'A wandering troubadour whose biting satirical ballads toppled three tyrannical barons without ever having to draw a blade from its scabbard.',
    'Keeper of oral epics that date back before the shattering of the sky; their songs inspire ordinary soldiers to perform miraculous feats of valor.',
    'A charismatic duelist who serenades taverns by sundown and fights masked duels for justice under the midnight stars.',
    'Possessing the fabled Siren’s resonance, their voice can charm the wild beasts of the forest or shatter obsidian armor with a single crescendo.',
  ],
  Warlock: [
    'Trapped in a crumbling tomb beneath the desert sands, they struck a bargain with an ancient star-entity to survive, trading their shadow for forbidden powers.',
    'A curious scholar who opened a chained grimoire discovered in the deep barrows, forging an occult pact with the Queen of the Astral Night.',
    'Born under an unnatural blood eclipse, they channel eldritch beams of void energy that leave dark frost burns on any surface they touch.',
    'Having cheated death by bartering with a cunning fiend, they now search for ancient relics to break the contract before their time comes due.',
    'An occultist who walks the delicate razor between humanity and cosmic insanity, summoning spectral tentacles and eerie illusions to confound foes.',
  ],
  Monk: [
    'Trained at the summit monastery of the High Wind, they spent twelve silent years meditating beneath frozen waterfalls until their spirit forged into iron.',
    'A quiet ascetic whose bare knuckles can fracture adamantine armor, channeling inner ki into shockwaves that disrupt the flow of time itself.',
    'Survivor of an assassinated martial order, now traveling the continent to safeguard the ancient scroll of the Ten Heavenly Steps.',
    'Disciplined practitioner of the Drunken Astral Fist who masks lethal precision under an eccentric, carefree demeanor.',
    'Having achieved complete harmony of mind, body, and spirit, they glide across bamboo leaves and deflect incoming arrows without looking.',
  ],
  Kshatriya: [
    'Born into an ancient royal lineage of Aryavarta, they were trained from their fifth year in Dhanurveda and swordsmanship, swearing an oath to uphold Dharma above life itself.',
    'During the siege of the Sun-Gate fortress, they rallied their weary comrades and stood solitary at the breach, brandishing their ancestral Khanda until reinforcements arrived.',
    'A noble warrior who renounced a gilded royal inheritance to protect innocent pilgrims traveling the bandit-infested valleys of the Vindhya mountains.',
    'Bathed in consecrated waters of the sacred river at dawn, their weapon was blessed by an avatar of fire to defend the innocent against shadow hordes.',
    'A renowned Maharathi champion celebrated across kingdoms for unwavering chivalry, refusing to strike an unarmed foe even in the heat of mortal combat.',
  ],
  Dhanurdhar: [
    'Trained deep within the sacred bamboo forests by a legendary hermit archer, they mastered the divine eye of Ekagrata, capable of striking a humming bird through dense thunderstorm fog.',
    'Chosen to inherit the celestial Gandiva-style recurve bow, their arrows leave glowing trails of emerald light that ignite demonic fiends upon impact.',
    'A swift frontier scout of the royal kingdoms who defended three forest hamlets single-handedly from a rampaging pack of enchanted beasts.',
    'Practicing the supreme art of Savyasachi—loosing arrows with equal deadly accuracy with either hand—they can fire twelve astra arrows before the first strikes earth.',
    'A solitary wanderer of the misty Deccan plateau whose wind-attuned ears can detect the hum of an enemy bowstring three leagues away.',
  ],
  Rishi: [
    'Spent forty years in rigorous tapasya atop the snow-capped Himalayan peaks, attuning their spirit to the primordial cosmic syllable that sustains all creation.',
    'Keeper of the ancient palm-leaf Samhitas, their sacred chants can soothe raging wildfire storms and call down celestial healing rains.',
    'An enlightened seer who survived the collapse of an ancient temple by chanting a protective kavacha mantra that withstood falling granite pillars.',
    'Gifted with Divya Drishti (astral vision), they can peer through mortal illusions and discern the true karmic threads connecting every soul.',
    'A wandering guru accompanied by woodland creatures, using consecrated herbs and fire-homa rituals to banish dark plagues from border towns.',
  ],
  Mayavi: [
    'Apprenticed to the secretive shadow-sorcerers of the Dandaka forest, they mastered the forbidden art of Indrajala, weaving illusions indistinguishable from reality.',
    'Born under an eclipse of Rahu and Ketu, they command iridescent peacock mirrors and smoke yantras that cause enemy armies to turn blades against themselves.',
    'A mysterious court advisor who unmasked an assassin guild by projecting hundred-fold phantom duplicates that lured the conspirators into the open.',
    'Wielding iridescent gossamer threads of cosmic Maya, they can fold distances, vanish into thin mist, and confuse even seasoned dragon-hunters.',
    'A flamboyant illusionist who travels disguised among wandering theatrical troupes, silently executing covert missions against tyrants and corrupt despots.',
  ],
  Yogi: [
    'Practicing austere breathwork in mountain caves, they awakened all seven sacred Kundalini chakras, transforming their physical body into unbreakable adamantine (Vajra Kaya).',
    'A wandering Nath ascetic who wields a consecrated iron Trishula, channeling pure Prana energy to shatter boulder barricades with an open palm.',
    'Having conquered hunger, cold, and pain through transcendental meditation, they walk unharmed across bed of glowing coals and ice crevasses.',
    'A master of mystical Siddhis who moves with supernatural agility, defying gravity across treetops and cleansing corrupted water with a gentle touch.',
    'A serene martial monk who entered the battlefield only when a sacred temple was threatened, disarming forty armored raiders without drawing a drop of blood.',
  ],
};

export const CATALYSTS = [
  'Driven by the loss of their ancestral stronghold, they search for the lost artifacts capable of banishing the darkness forever.',
  'Now bound by an unbreakable vow, they offer their formidable talents to any worthy fellowship seeking to restore balance to the realm.',
  'Armed with legend-forged arms and unwavering conviction, they venture forth where even seasoned armies dare not tread.',
  'With their loyal companion and keen instincts, they carve their own legend across the untamed wilderness.',
  'Whispers of a rising ancient dread have compelled them to leave their sanctuary and unite the divided kingdoms.',
  'Guided by recurring prophetic visions in their dreams, their journey carries the fate of mortal kind.',
];

export function generateCharacterBackstory(char: {
  name: string;
  characterClass: FantasyClassType;
  subclass?: string;
  race?: string;
  signatureWeapon?: string;
}): string {
  const originPool = ORIGIN_STORIES[char.characterClass] || ORIGIN_STORIES.Warrior;
  const origin = originPool[Math.floor(Math.random() * originPool.length)];
  const catalyst = CATALYSTS[Math.floor(Math.random() * CATALYSTS.length)];

  const weaponDetail = char.signatureWeapon
    ? ` Bearing their trusty ${char.signatureWeapon}, `
    : ' ';

  return `${char.name}, a renowned ${char.race || 'adventurer'} ${char.subclass || char.characterClass}. ${origin}${weaponDetail}${catalyst}`;
}
