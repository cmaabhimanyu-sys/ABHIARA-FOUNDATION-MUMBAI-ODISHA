export default function AbhiaraLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Triangle */}
        <path d="M18 2L32 32H4L18 2Z" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
        {/* Central ray */}
        <line x1="18" y1="8" x2="18" y2="20" stroke="#C9A84C" strokeWidth="1.5" />
        <circle cx="18" cy="6" r="2" fill="#C9A84C" />
        {/* Left ray */}
        <line x1="13" y1="14" x2="13" y2="22" stroke="#1A7F8E" strokeWidth="1.2" />
        <circle cx="13" cy="12.5" r="1.5" fill="#1A7F8E" />
        {/* Right ray */}
        <line x1="23" y1="14" x2="23" y2="22" stroke="#1A7F8E" strokeWidth="1.2" />
        <circle cx="23" cy="12.5" r="1.5" fill="#1A7F8E" />
      </svg>
      <div className="flex flex-col leading-none">
        <span
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 700, letterSpacing: "0.15em", color: "#FFFFFF" }}
        >
          ABHIARA
        </span>
        <span
          style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.40)", textTransform: "uppercase" }}
        >
          FOUNDATION
        </span>
      </div>
    </div>
  );
}
