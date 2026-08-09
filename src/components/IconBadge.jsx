const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  focusable: 'false',
}

const icons = {
  target: () => (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3" />
      <path d="M12 18.5v3" />
      <path d="M2.5 12h3" />
      <path d="M18.5 12h3" />
    </svg>
  ),
  grid: () => (
    <svg {...svgProps}>
      <rect x="4" y="4" width="6" height="6" rx="1.2" />
      <rect x="14" y="4" width="6" height="6" rx="1.2" />
      <rect x="4" y="14" width="6" height="6" rx="1.2" />
      <rect x="14" y="14" width="6" height="6" rx="1.2" />
    </svg>
  ),
  trend: () => (
    <svg {...svgProps}>
      <path d="M4 18V6" />
      <path d="M4 18h16" />
      <path d="m7 15 4-4 3 3 5-7" />
      <path d="M16 7h3v3" />
    </svg>
  ),
  spark: () => (
    <svg {...svgProps}>
      <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9-5.7-1.8L10.2 9 12 3.5Z" />
      <path d="M19 15.5v3" />
      <path d="M17.5 17h3" />
    </svg>
  ),
  flag: () => (
    <svg {...svgProps}>
      <path d="M6 20V4" />
      <path d="M6 5.5c2-1.2 4.1-1.2 6.3 0 1.9 1 3.8 1 5.7-.2v9.4c-1.9 1.2-3.8 1.2-5.7.2-2.2-1.2-4.3-1.2-6.3 0" />
    </svg>
  ),
  doc: () => (
    <svg {...svgProps}>
      <path d="M7 3.5h6l4 4V20H7V3.5Z" />
      <path d="M13 3.5V8h4" />
      <path d="M9.5 12h5" />
      <path d="M9.5 15.5h5" />
    </svg>
  ),
  pie: () => (
    <svg {...svgProps}>
      <path d="M12 3.5v8h8" />
      <path d="M20 12a8 8 0 1 1-8-8" />
      <path d="M14 4.3A8 8 0 0 1 19.7 10" />
    </svg>
  ),
  eye: () => (
    <svg {...svgProps}>
      <path d="M3.5 12s3-5.5 8.5-5.5 8.5 5.5 8.5 5.5-3 5.5-8.5 5.5S3.5 12 3.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  ),
  tool: () => (
    <svg {...svgProps}>
      <rect x="4" y="7" width="16" height="12" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M4 12h16" />
    </svg>
  ),
  people: () => (
    <svg {...svgProps}>
      <circle cx="9" cy="9" r="3" />
      <path d="M4.5 19a4.5 4.5 0 0 1 9 0" />
      <path d="M16 7.5a2.5 2.5 0 0 1 0 5" />
      <path d="M16.5 15c2 .5 3 1.8 3 4" />
    </svg>
  ),
  book: () => (
    <svg {...svgProps}>
      <path d="M5 4.5h5a3 3 0 0 1 3 3V20a3 3 0 0 0-3-3H5V4.5Z" />
      <path d="M19 4.5h-5a3 3 0 0 0-3 3V20a3 3 0 0 1 3-3h5V4.5Z" />
    </svg>
  ),
  ai: () => (
    <svg {...svgProps}>
      <rect x="5" y="5" width="14" height="14" rx="3" />
      <path d="M12 8v8" />
      <path d="m8.5 10 7 4" />
      <path d="m15.5 10-7 4" />
    </svg>
  ),
}

export default function IconBadge({ name, className = '', ...props }) {
  const Icon = icons[name] ?? icons.target

  return (
    <span className={`icon-badge ${className}`.trim()} aria-hidden="true" {...props}>
      <Icon />
    </span>
  )
}
