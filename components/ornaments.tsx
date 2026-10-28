export function Lantern({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`lantern-wrap ${className}`} aria-hidden="true">
    <svg className="lantern" viewBox="0 0 60 130" focusable="false">
      <line x1="30" y1="0" x2="30" y2="20" stroke="#c9a24b" strokeWidth="1.2" />
      <circle cx="30" cy="23" r="3.2" fill="#c9a24b" />
      <path d="M15 46 C15 34 24 30 30 27 C36 30 45 34 45 46 Z" fill="#c9a24b" />
      <path
        d="M13 46 H47 L43 96 H17 Z"
        fill="rgba(201,162,75,0.12)"
        stroke="#c9a24b"
        strokeWidth="1.4"
      />
      <path
        className="lantern-glow"
        d="M22 90 V62 Q30 48 38 62 V90 Z"
        fill="#ffcf75"
      />
      <path d="M30 52 V90 M22 72 H38" stroke="#6b4a14" strokeWidth="0.8" />
      <rect x="15" y="96" width="30" height="6" rx="1.5" fill="#c9a24b" />
      <path d="M22 102 H38 L34 111 H26 Z" fill="#c9a24b" />
      <line x1="30" y1="111" x2="30" y2="122" stroke="#c9a24b" strokeWidth="1.2" />
      <circle cx="30" cy="125" r="2.6" fill="#c9a24b" />
    </svg>
    </div>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`divider ${className}`}
      viewBox="0 0 260 24"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M0 12 H104" />
        <path d="M156 12 H260" />
        <path d="M112 12 L130 3 L148 12 L130 21 Z" />
        <path d="M120 12 L130 7 L140 12 L130 17 Z" fill="currentColor" />
      </g>
      <g fill="currentColor">
        <circle cx="106" cy="12" r="1.8" />
        <circle cx="154" cy="12" r="1.8" />
        <circle cx="94" cy="12" r="1.2" />
        <circle cx="166" cy="12" r="1.2" />
      </g>
    </svg>
  );
}

/** Repeating vine-wave border used between sections. */
export function Frieze() {
  return <div className="frieze" aria-hidden="true" />;
}

/** Large slowly-rotating eight-point star mandala (kept deliberately clean). */
export function Mandala({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 24 }, (_, i) => i * 15);
  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
  return (
    <svg
      className={`mandala ${className}`}
      viewBox="0 0 600 600"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="#c9a24b" strokeWidth="1">
        <circle cx="300" cy="300" r="296" />
        <circle cx="300" cy="300" r="286" strokeOpacity="0.5" />
        {ticks.map((a) => (
          <path key={a} d="M300 4 V14" transform={`rotate(${a} 300 300)`} strokeOpacity="0.6" />
        ))}
        {petals.map((a) => (
          <path
            key={a}
            d="M300 70 C282 110 282 150 300 190 C318 150 318 110 300 70 Z"
            transform={`rotate(${a} 300 300)`}
            strokeOpacity="0.7"
          />
        ))}
        <rect x="140" y="140" width="320" height="320" />
        <rect x="140" y="140" width="320" height="320" transform="rotate(45 300 300)" />
        <circle cx="300" cy="300" r="226" strokeDasharray="2 8" />
        <circle cx="300" cy="300" r="120" />
        <rect x="222" y="222" width="156" height="156" transform="rotate(22.5 300 300)" strokeOpacity="0.6" />
        <rect x="222" y="222" width="156" height="156" transform="rotate(67.5 300 300)" strokeOpacity="0.6" />
      </g>
    </svg>
  );
}

const WAX_PATH = (() => {
  const pts = Array.from({ length: 96 }, (_, i) => {
    const t = (i / 96) * Math.PI * 2;
    const r = 92 + 3.2 * Math.sin(t * 7) + 2.2 * Math.sin(t * 3 + 1);
    return `${(100 + r * Math.cos(t)).toFixed(2)} ${(100 + r * Math.sin(t)).toFixed(2)}`;
  });
  return `M${pts.join(" L")} Z`;
})();

/** Wax seal medallion in antique-gold on walnut wax. */
export function WaxSeal({
  initials,
  className = "",
}: {
  initials: string;
  className?: string;
}) {
  return (
    <svg
      className={`wax-seal ${className}`}
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="waxBody" cx="0.35" cy="0.3" r="0.95">
          <stop offset="0" stopColor="#d9955a" />
          <stop offset="0.5" stopColor="#92481f" />
          <stop offset="1" stopColor="#3a1a0c" />
        </radialGradient>
        <linearGradient id="waxGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3dfa6" />
          <stop offset="0.5" stopColor="#c9a24b" />
          <stop offset="1" stopColor="#8a6420" />
        </linearGradient>
      </defs>
      <path d={WAX_PATH} fill="url(#waxBody)" />
      <circle cx="100" cy="100" r="72" fill="none" stroke="url(#waxGold)" strokeWidth="2.4" />
      <circle cx="100" cy="100" r="64" fill="none" stroke="url(#waxGold)" strokeWidth="0.8" />
      <g fill="none" stroke="url(#waxGold)" strokeWidth="1.2" opacity="0.8">
        <rect x="56" y="56" width="88" height="88" />
        <rect x="56" y="56" width="88" height="88" transform="rotate(45 100 100)" />
      </g>
      <circle cx="100" cy="100" r="36" fill="#3a1a0c" stroke="url(#waxGold)" strokeWidth="1.4" />
      <text
        x="100"
        y="109"
        textAnchor="middle"
        fontSize="24"
        fill="url(#waxGold)"
        style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
      >
        {initials}
      </text>
    </svg>
  );
}

export function Crescent({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M31 6a18 18 0 1 0 0 36 24 24 0 0 1 0-36Z"
        fill="currentColor"
      />
      <path
        d="m37 17 1.6 3.9 4.2.3-3.2 2.7 1 4.1-3.6-2.2-3.6 2.2 1-4.1-3.2-2.7 4.2-.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

const SPARKS = Array.from({ length: 24 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  size: 2 + ((i * 5) % 4),
  delay: -((i * 3.3) % 20),
  duration: 14 + ((i * 7) % 12),
}));

export function Sparkles() {
  return (
    <div className="sparkles" aria-hidden="true">
      {SPARKS.map((s, i) => (
        <span
          key={i}
          style={{
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
