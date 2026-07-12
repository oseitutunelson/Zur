// Line-icon set tuned to the ZUR Construction design language (1.5px strokes, square caps).
const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

const PATHS = {
  bricks: (
    <>
      <path {...P} d="M3 9h18M3 15h18M9 3v6M15 9v6M9 15v6M3 3h18v18H3z" />
    </>
  ),
  bars: (
    <>
      <path {...P} d="M6 20V10M12 20V4M18 20v-7" />
    </>
  ),
  cube: (
    <>
      <path {...P} d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path {...P} d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
    </>
  ),
  compass: (
    <>
      <circle {...P} cx="12" cy="12" r="9" />
      <path {...P} d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </>
  ),
  crane: (
    <>
      <path {...P} d="M6 21V5l13 1M6 5l3-2M6 8h9M11 8v3M11 11h3" />
      <path {...P} d="M4 21h7" />
      <rect {...P} x="9.5" y="11" width="3" height="2.5" />
    </>
  ),
  clipboard: (
    <>
      <rect {...P} x="5" y="4" width="14" height="17" rx="2" />
      <path {...P} d="M9 4h6v3H9zM8 11h8M8 15h8M8 18h5" />
    </>
  ),
  calculator: (
    <>
      <rect {...P} x="5" y="3" width="14" height="18" rx="2" />
      <path {...P} d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M16 15v2M8 18h2" />
    </>
  ),
  brush: (
    <>
      <path {...P} d="M4 20c2 0 3-1 3-3 0-1.5 1-2.5 2.5-2.5L18 6l-2-2-8.5 8.5C6 14 5 15 4 17z" />
      <path {...P} d="M14 4l6 6" />
    </>
  ),
  tree: (
    <>
      <path {...P} d="M12 3l5 7h-3l4 6H6l4-6H7l5-7zM12 16v5" />
    </>
  ),
  bolt: (
    <>
      <path {...P} d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" />
    </>
  ),
  chat: (
    <>
      <path {...P} d="M4 5h16v11H9l-4 4V5z" />
      <path {...P} d="M8 10h0M12 10h0M16 10h0" />
    </>
  ),
  team: (
    <>
      <circle {...P} cx="9" cy="8" r="3" />
      <path {...P} d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path {...P} d="M16 5.5a3 3 0 010 5.7M21 20a5.5 5.5 0 00-4-5.3" />
    </>
  ),
  clock: (
    <>
      <circle {...P} cx="12" cy="12" r="9" />
      <path {...P} d="M12 7v5l3.5 2" />
    </>
  ),
  shield: (
    <>
      <path {...P} d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path {...P} d="M9 12l2 2 4-4" />
    </>
  ),
  layers: (
    <>
      <path {...P} d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 16.5l9 5 9-5" />
    </>
  ),
  arrow: (
    <>
      <path {...P} d="M7 17L17 7M9 7h8v8" />
    </>
  ),
  phone: (
    <>
      <path {...P} d="M6 3h3l1.5 5-2 1.5a11 11 0 005 5l1.5-2 5 1.5v3a2 2 0 01-2 2A16 16 0 014 5a2 2 0 012-2z" />
    </>
  ),
  mail: (
    <>
      <rect {...P} x="3" y="5" width="18" height="14" rx="2" />
      <path {...P} d="M3 7l9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path {...P} d="M12 21c4-4 7-7.5 7-11a7 7 0 10-14 0c0 3.5 3 7 7 11z" />
      <circle {...P} cx="12" cy="10" r="2.5" />
    </>
  ),
  star: (
    <path fill="currentColor" stroke="none" d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
  ),
  plus: <path {...P} d="M12 5v14M5 12h14" />,
  minus: <path {...P} d="M5 12h14" />,
  check: <path {...P} d="M5 12l4 4L19 7" />,
  whatsapp: (
    <>
      <path {...P} d="M20 12a8 8 0 01-11.7 7.1L4 20l1-4.2A8 8 0 1120 12z" />
      <path {...P} d="M9 9c0 4 2 6 6 6 .5 0 1-.5 1-1l-2-1-1 1c-1 0-2-1-2-2l1-1-1-2c-.5 0-1 .5-1 1z" />
    </>
  ),
}

export default function Icon({ name, size = 24, className = '', ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {PATHS[name] || null}
    </svg>
  )
}

