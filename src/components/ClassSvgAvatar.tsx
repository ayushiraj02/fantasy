import { FantasyClassType } from '../types';

interface ClassSvgAvatarProps {
  characterClass: FantasyClassType;
  name: string;
  variant?: number;
  className?: string;
}

export function ClassSvgAvatar({
  characterClass,
  name,
  variant = 1,
  className = 'w-full h-full',
}: ClassSvgAvatarProps) {
  // Derive a deterministic hue shift based on name characters
  const charCodeSum = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) + variant * 37;

  // Background and accent colors by class
  const classPalettes: Record<
    FantasyClassType,
    { bg1: string; bg2: string; armor: string; accent: string; eyes: string; glow: string }
  > = {
    Warrior: {
      bg1: '#3b1c06',
      bg2: '#1e0f03',
      armor: '#78716c',
      accent: '#f59e0b',
      eyes: '#fef08a',
      glow: '#fbbf24',
    },
    Mage: {
      bg1: '#2e1065',
      bg2: '#0f0529',
      armor: '#4c1d95',
      accent: '#a855f7',
      eyes: '#67e8f9',
      glow: '#c084fc',
    },
    Rogue: {
      bg1: '#064e3b',
      bg2: '#022c22',
      armor: '#1f2937',
      accent: '#10b981',
      eyes: '#34d399',
      glow: '#059669',
    },
    Ranger: {
      bg1: '#14532d',
      bg2: '#052e16',
      armor: '#365314',
      accent: '#84cc16',
      eyes: '#bef264',
      glow: '#65a30d',
    },
    Paladin: {
      bg1: '#451a03',
      bg2: '#1c0a02',
      armor: '#e2e8f0',
      accent: '#eab308',
      eyes: '#fef9c3',
      glow: '#facc15',
    },
    Cleric: {
      bg1: '#164e63',
      bg2: '#082f49',
      armor: '#94a3b8',
      accent: '#06b6d4',
      eyes: '#bae6fd',
      glow: '#38bdf8',
    },
    Druid: {
      bg1: '#134e4a',
      bg2: '#042f2e',
      armor: '#292524',
      accent: '#14b8a6',
      eyes: '#5eead4',
      glow: '#0d9488',
    },
    Bard: {
      bg1: '#831843',
      bg2: '#4c0519',
      armor: '#9d174d',
      accent: '#ec4899',
      eyes: '#fbcfe8',
      glow: '#f43f5e',
    },
    Warlock: {
      bg1: '#3b0764',
      bg2: '#1e0338',
      armor: '#1e1b4b',
      accent: '#9333ea',
      eyes: '#c084fc',
      glow: '#a855f7',
    },
    Monk: {
      bg1: '#7c2d12',
      bg2: '#361204',
      armor: '#c2410c',
      accent: '#f97316',
      eyes: '#fed7aa',
      glow: '#ea580c',
    },
    Kshatriya: {
      bg1: '#451a03',
      bg2: '#1e0a02',
      armor: '#d97706',
      accent: '#fbbf24',
      eyes: '#fef08a',
      glow: '#f59e0b',
    },
    Dhanurdhar: {
      bg1: '#064e3b',
      bg2: '#022c22',
      armor: '#059669',
      accent: '#34d399',
      eyes: '#a7f3d0',
      glow: '#10b981',
    },
    Rishi: {
      bg1: '#1e1b4b',
      bg2: '#0f0d28',
      armor: '#4338ca',
      accent: '#818cf8',
      eyes: '#c7d2fe',
      glow: '#6366f1',
    },
    Mayavi: {
      bg1: '#3b0764',
      bg2: '#1d0234',
      armor: '#7e22ce',
      accent: '#c084fc',
      eyes: '#f0abfc',
      glow: '#a855f7',
    },
    Yogi: {
      bg1: '#7c2d12',
      bg2: '#2a0c02',
      armor: '#ea580c',
      accent: '#f59e0b',
      eyes: '#fef3c7',
      glow: '#d97706',
    },
  };

  const p = classPalettes[characterClass] || classPalettes.Warrior;
  const gradientId = `bg-grad-${characterClass}-${variant}-${charCodeSum % 1000}`;
  const auraId = `aura-${characterClass}-${variant}`;

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${name} cartoon portrait`}
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={p.bg1} />
          <stop offset="100%" stopColor={p.bg2} />
        </radialGradient>
        <filter id={auraId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background with video-game vignette */}
      <rect width="200" height="200" rx="16" fill={`url(#${gradientId})`} />

      {/* Ambient background arcane particles/stars */}
      <circle cx="40" cy="45" r="2.5" fill={p.glow} opacity="0.6" />
      <circle cx="160" cy="50" r="3" fill={p.glow} opacity="0.5" />
      <circle cx="30" cy="120" r="2" fill={p.glow} opacity="0.4" />
      <circle cx="170" cy="130" r="2.5" fill={p.glow} opacity="0.6" />

      {/* Hero Body / Shoulders */}
      <path
        d="M30 195 C30 145, 65 130, 100 130 C135 130, 170 145, 170 195 Z"
        fill={p.armor}
        stroke="#111827"
        strokeWidth="3.5"
      />

      {/* Chestplate / Robe Trim */}
      <path
        d="M80 135 L100 160 L120 135 Z"
        fill={p.accent}
        stroke="#111827"
        strokeWidth="2"
      />
      <line x1="100" y1="160" x2="100" y2="195" stroke={p.accent} strokeWidth="3" />

      {/* Hero Neck & Head Base */}
      <rect x="86" y="110" width="28" height="24" rx="4" fill="#fed7aa" stroke="#111827" strokeWidth="2.5" />
      <ellipse cx="100" cy="85" rx="38" ry="42" fill="#fed7aa" stroke="#111827" strokeWidth="3.5" />

      {/* Class Specific Headgear / Hair */}
      {characterClass === 'Warrior' && (
        <g>
          {/* Steel Helmet with Gold Visor */}
          <path
            d="M60 75 C60 40, 140 40, 140 75 C140 85, 136 95, 136 95 L64 95 Z"
            fill="#94a3b8"
            stroke="#111827"
            strokeWidth="3"
          />
          {/* Golden Crest Plume */}
          <path
            d="M92 42 Q100 15 108 42 Z"
            fill={p.accent}
            stroke="#111827"
            strokeWidth="2.5"
          />
          {/* Visor Slit */}
          <rect x="74" y="80" width="52" height="8" rx="3" fill="#0f172a" />
          <circle cx="86" cy="84" r="2" fill={p.eyes} />
          <circle cx="114" cy="84" r="2" fill={p.eyes} />
        </g>
      )}

      {characterClass === 'Mage' && (
        <g>
          {/* Wizard Hood / Hat */}
          <path
            d="M52 82 Q100 10 148 82 Q100 68 52 82 Z"
            fill={p.armor}
            stroke="#111827"
            strokeWidth="3"
          />
          <polygon points="100,10 88,40 112,40" fill={p.accent} />
          {/* Glowing Eyes */}
          <ellipse cx="85" cy="85" rx="5" ry="4" fill={p.eyes} filter={`url(#${auraId})`} />
          <ellipse cx="115" cy="85" rx="5" ry="4" fill={p.eyes} filter={`url(#${auraId})`} />
          {/* Arcane Rune on forehead */}
          <circle cx="100" cy="65" r="4" fill={p.accent} />
        </g>
      )}

      {characterClass === 'Rogue' && (
        <g>
          {/* Shadow Cowl & Mask */}
          <path
            d="M58 80 C58 45, 142 45, 142 80 L135 110 L65 110 Z"
            fill="#1e293b"
            stroke="#111827"
            strokeWidth="3"
          />
          {/* Mask covering lower face */}
          <path d="M68 92 Q100 112 132 92 L128 118 Q100 128 72 118 Z" fill="#0f172a" stroke="#111827" strokeWidth="2" />
          {/* Sharp focused eyes */}
          <path d="M80 82 Q88 80 94 85" stroke="#111827" strokeWidth="3" fill="none" />
          <path d="M106 85 Q112 80 120 82" stroke="#111827" strokeWidth="3" fill="none" />
          <circle cx="87" cy="84" r="3" fill={p.eyes} />
          <circle cx="113" cy="84" r="3" fill={p.eyes} />
        </g>
      )}

      {characterClass === 'Ranger' && (
        <g>
          {/* Archer's Feathered Cap */}
          <path
            d="M56 75 C60 45, 140 45, 144 75 L135 88 Q100 78 65 88 Z"
            fill="#365314"
            stroke="#111827"
            strokeWidth="3"
          />
          {/* Feather */}
          <path d="M125 65 Q145 25 155 35 Q140 55 128 70" fill={p.accent} stroke="#111827" strokeWidth="2" />
          {/* Keen Eyes & Smirk */}
          <circle cx="85" cy="85" r="3.5" fill={p.eyes} stroke="#111827" strokeWidth="1.5" />
          <circle cx="115" cy="85" r="3.5" fill={p.eyes} stroke="#111827" strokeWidth="1.5" />
          <path d="M92 104 Q100 110 108 104" stroke="#111827" strokeWidth="2.5" fill="none" />
        </g>
      )}

      {characterClass === 'Paladin' && (
        <g>
          {/* Golden Solar Coronet / Circlet */}
          <path d="M62 70 L100 48 L138 70 L130 82 L70 82 Z" fill="#facc15" stroke="#111827" strokeWidth="2.5" />
          <circle cx="100" cy="62" r="5" fill="#fef08a" filter={`url(#${auraId})`} />
          {/* Noble Eyes & expression */}
          <circle cx="85" cy="86" r="3.5" fill="#1e293b" />
          <circle cx="115" cy="86" r="3.5" fill="#1e293b" />
          <path d="M90 106 Q100 112 110 106" stroke="#111827" strokeWidth="2.5" fill="none" />
          {/* Radiance Halo */}
          <circle cx="100" cy="50" r="30" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.6" />
        </g>
      )}

      {/* General features for Cleric, Druid, Bard, Warlock, Monk if fallback */}
      {!['Warrior', 'Mage', 'Rogue', 'Ranger', 'Paladin'].includes(characterClass) && (
        <g>
          {/* Character Headband / Circlet */}
          <path d="M63 70 Q100 62 137 70 L135 80 Q100 72 65 80 Z" fill={p.accent} stroke="#111827" strokeWidth="2" />
          <circle cx="85" cy="86" r="3.5" fill={p.eyes} stroke="#111827" strokeWidth="1.5" />
          <circle cx="115" cy="86" r="3.5" fill={p.eyes} stroke="#111827" strokeWidth="1.5" />
          <path d="M92 105 Q100 112 108 105" stroke="#111827" strokeWidth="2.5" fill="none" />
        </g>
      )}

      {/* Class Emblem Watermark in Corner */}
      <rect x="150" y="150" width="38" height="38" rx="8" fill="#111827" stroke={p.accent} strokeWidth="2" />
      <text
        x="169"
        y="174"
        textAnchor="middle"
        fill={p.accent}
        fontSize="16"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        {characterClass[0]}
      </text>
    </svg>
  );
}
