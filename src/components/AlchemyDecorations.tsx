interface BrassCornerProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export function BrassCorner({ position, className = 'w-6 h-6' }: BrassCornerProps) {
  const rotationClass = {
    'top-left': '',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }[position];

  return (
    <div
      className={`absolute pointer-events-none select-none z-20 ${
        position === 'top-left' ? 'top-1 left-1' : ''
      } ${position === 'top-right' ? 'top-1 right-1' : ''} ${
        position === 'bottom-left' ? 'bottom-1 left-1' : ''
      } ${position === 'bottom-right' ? 'bottom-1 right-1' : ''} ${rotationClass} ${className}`}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_1px_2px_rgba(180,83,9,0.25)]"
      >
        {/* Main brass corner angle */}
        <path
          d="M2 30V4C2 2.89543 2.89543 2 4 2H30L26 6H6V26L2 30Z"
          fill="url(#brass-grad)"
          stroke="#b45309"
          strokeWidth="0.8"
        />
        {/* Filigree decorative curve */}
        <path
          d="M8 8C14 8 18 12 18 18"
          stroke="#f59e0b"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.9"
        />
        {/* Corner Rivet */}
        <circle cx="5" cy="5" r="1.8" fill="#d97706" stroke="#92400e" strokeWidth="0.8" />
        <circle cx="5" cy="5" r="0.6" fill="#fef3c7" />
        <defs>
          <linearGradient id="brass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="45%" stopColor="#d97706" />
            <stop offset="70%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function TransmutationCircle({ className = 'w-48 h-48' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`${className} animate-arcane-pulse pointer-events-none select-none`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer concentric rings */}
      <circle cx="100" cy="100" r="95" stroke="#d97706" strokeWidth="1.2" strokeDasharray="3 3" fill="none" opacity="0.4" />
      <circle cx="100" cy="100" r="88" stroke="#f59e0b" strokeWidth="1.5" fill="none" opacity="0.5" />
      <circle cx="100" cy="100" r="74" stroke="#d97706" strokeWidth="0.8" fill="none" opacity="0.3" />
      
      {/* Inner Alchemical Heptagram / Triangle Intersect */}
      <polygon points="100,26 164,137 36,137" stroke="#fbbf24" strokeWidth="1.2" fill="none" opacity="0.4" />
      <polygon points="100,174 36,63 164,63" stroke="#fbbf24" strokeWidth="1.2" fill="none" opacity="0.4" />

      {/* Center Rune Core */}
      <circle cx="100" cy="100" r="28" stroke="#f59e0b" strokeWidth="1.5" fill="#fef3c7" fillOpacity="0.4" />
      <circle cx="100" cy="100" r="14" stroke="#d97706" strokeWidth="1" fill="none" />
      <circle cx="100" cy="100" r="3" fill="#b45309" />

      {/* 4 Cardinal Symbols */}
      {/* Fire 🜂 Top */}
      <polygon points="100,12 95,20 105,20" stroke="#f59e0b" strokeWidth="1" fill="#f59e0b" />
      {/* Water 🜄 Bottom */}
      <polygon points="100,188 95,180 105,180" stroke="#38bdf8" strokeWidth="1" fill="#38bdf8" />
      {/* Air 🜁 Left */}
      <polygon points="16,100 24,95 24,105" stroke="#fbbf24" strokeWidth="1" fill="#fbbf24" />
      {/* Earth 🜃 Right */}
      <polygon points="184,100 176,95 176,105" stroke="#84cc16" strokeWidth="1" fill="#84cc16" />
    </svg>
  );
}

export function AlchemicalDivider({ className = 'my-4' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className} select-none`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-300 to-amber-400" />
      <div className="flex items-center gap-1.5 text-amber-600 text-xs">
        <span className="text-[10px]">🜂</span>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 rotate-45" />
        <span className="text-amber-700 font-cinzel text-xs font-bold tracking-widest">✦ ☿ ✦</span>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 rotate-45" />
        <span className="text-[10px]">🜄</span>
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-amber-300 to-amber-400" />
    </div>
  );
}
