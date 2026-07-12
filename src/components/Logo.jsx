// ZUR Construction identity — an angular "Z" built from stacked architectural
// beams inside a vermilion badge, paired with a stacked wordmark. The badge is
// self-coloured (vermilion + white) so it reads cleanly on light and dark
// backgrounds; the wordmark inherits `currentColor` from the parent.
export default function Logo({ className = '', mark = true, subtitle = true }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {mark && (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent shadow-accent ring-1 ring-black/5">
          <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true">
            {/* Beam-built Z */}
            <path
              d="M6 6 H26 V11 L14.5 21 H26 V26 H6 V21 L17.5 11 H6 Z"
              fill="#ffffff"
            />
            {/* Structural notch — reads as a beam joint */}
            <rect x="6" y="14.5" width="4.5" height="3" rx="1" fill="#ffffff" opacity="0.55" />
          </svg>
        </span>
      )}
      <span className="flex flex-col leading-none">
        <span className="font-display text-2xl font-extrabold tracking-tightest">ZUR</span>
        {subtitle && (
          <span className="mt-0.5 text-[0.5rem] font-semibold uppercase tracking-[0.34em] opacity-60">
            Construction
          </span>
        )}
      </span>
    </span>
  )
}
