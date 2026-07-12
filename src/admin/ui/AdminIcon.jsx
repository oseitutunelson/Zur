// Admin dashboard icon set (1.75px line icons) — separate from the public
// site's Icon component so the two can evolve independently.
const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }

const PATHS = {
  dashboard: <path {...P} d="M4 13h6V4H4v9zm0 7h6v-4H4v4zm10 0h6v-9h-6v9zm0-16v4h6V4h-6z" />,
  projects: <path {...P} d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4M3 17l9 4 9-4" />,
  services: (
    <>
      <path {...P} d="M14 7l3-3 3 3-3 3M7 14l-3 3 3 3 3-3" />
      <path {...P} d="M20.5 10.5L10 21H3v-7L13.5 3.5" />
    </>
  ),
  home: <path {...P} d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9z" />,
  gallery: (
    <>
      <rect {...P} x="3" y="4" width="18" height="16" rx="2" />
      <circle {...P} cx="8.5" cy="9" r="1.5" />
      <path {...P} d="M4 17l5-4 4 3 3-2 4 3" />
    </>
  ),
  inbox: <path {...P} d="M4 4h16v16H4V4zm0 10h4l2 3h4l2-3h4" />,
  quote: <path {...P} d="M7 7H4v6h3l-1 4M17 7h-3v6h3l-1 4" />,
  partners: (
    <>
      <circle {...P} cx="8" cy="8" r="3" />
      <circle {...P} cx="16" cy="8" r="3" />
      <path {...P} d="M3 20a5 5 0 015-5M21 20a5 5 0 00-5-5M9.5 20h5" />
    </>
  ),
  settings: (
    <>
      <circle {...P} cx="12" cy="12" r="3" />
      <path {...P} d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
    </>
  ),
  files: <path {...P} d="M6 3h8l4 4v14H6V3zm8 0v4h4" />,
  activity: <path {...P} d="M3 12h4l2 6 4-14 2 8h6" />,
  users: (
    <>
      <circle {...P} cx="9" cy="8" r="3.2" />
      <path {...P} d="M3 20a6 6 0 0112 0M16 5.5a3 3 0 010 5.5M21 20a5.5 5.5 0 00-3.5-5" />
    </>
  ),
  bell: <path {...P} d="M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6M9.5 20a2.5 2.5 0 005 0" />,
  search: (
    <>
      <circle {...P} cx="11" cy="11" r="7" />
      <path {...P} d="M20 20l-3.5-3.5" />
    </>
  ),
  sun: (
    <>
      <circle {...P} cx="12" cy="12" r="4" />
      <path {...P} d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </>
  ),
  moon: <path {...P} d="M21 12.8A8.5 8.5 0 1111.2 3a6.5 6.5 0 009.8 9.8z" />,
  menu: <path {...P} d="M4 6h16M4 12h16M4 18h16" />,
  close: <path {...P} d="M6 6l12 12M18 6L6 18" />,
  plus: <path {...P} d="M12 5v14M5 12h14" />,
  edit: <path {...P} d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4" />,
  trash: <path {...P} d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />,
  eye: (
    <>
      <path {...P} d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle {...P} cx="12" cy="12" r="3" />
    </>
  ),
  copy: (
    <>
      <rect {...P} x="9" y="9" width="12" height="12" rx="2" />
      <path {...P} d="M6 15H4V4a1 1 0 011-1h11v2" />
    </>
  ),
  archive: <path {...P} d="M3 5h18v4H3V5zm1 4v11h16V9M9 13h6" />,
  filter: <path {...P} d="M3 5h18l-7 8v6l-4-2v-4L3 5z" />,
  chevronDown: <path {...P} d="M6 9l6 6 6-6" />,
  chevronLeft: <path {...P} d="M15 6l-6 6 6 6" />,
  chevronRight: <path {...P} d="M9 6l6 6-6 6" />,
  arrowUp: <path {...P} d="M12 19V5M6 11l6-6 6 6" />,
  arrowDown: <path {...P} d="M12 5v14M6 13l6 6 6-6" />,
  logout: <path {...P} d="M15 12H4m0 0l4-4m-4 4l4 4M14 4h4a2 2 0 012 2v12a2 2 0 01-2 2h-4" />,
  upload: <path {...P} d="M12 16V4m0 0L7 9m5-5l5 5M4 20h16" />,
  image: (
    <>
      <rect {...P} x="3" y="4" width="18" height="16" rx="2" />
      <circle {...P} cx="8.5" cy="9" r="1.5" />
      <path {...P} d="M4 17l5-4 4 3 3-2 4 3" />
    </>
  ),
  star: <path fill="currentColor" stroke="none" d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />,
  starOutline: <path {...P} d="M12 3l2.7 5.7 6.3.7-4.7 4.3 1.3 6.2L12 17.7 6.1 20.9l1.3-6.2L2.7 10.4l6.3-.7L12 3z" />,
  check: <path {...P} d="M5 12l4 4L19 7" />,
  dots: <path {...P} d="M12 6h.01M12 12h.01M12 18h.01" strokeWidth="2.4" />,
  grip: <path {...P} d="M9 6h.01M9 12h.01M9 18h.01M15 6h.01M15 12h.01M15 18h.01" strokeWidth="2.2" />,
  pin: (
    <>
      <path {...P} d="M12 21c4-4 7-7.5 7-11a7 7 0 10-14 0c0 3.5 3 7 7 11z" />
      <circle {...P} cx="12" cy="10" r="2.5" />
    </>
  ),
  calendar: <path {...P} d="M4 6h16v15H4V6zm0 4h16M8 3v4M16 3v4" />,
  mail: (
    <>
      <rect {...P} x="3" y="5" width="18" height="14" rx="2" />
      <path {...P} d="M3 7l9 6 9-6" />
    </>
  ),
  spark: <path {...P} d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />,
}

export default function AdminIcon({ name, size = 20, className = '', ...rest }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true" {...rest}>
      {PATHS[name] || null}
    </svg>
  )
}
