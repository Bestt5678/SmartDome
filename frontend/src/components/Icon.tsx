import type { ReactNode } from 'react'
import type { IconName } from '../types'

interface IconProps {
  name: IconName
  className?: string
  strokeWidth?: number
}

export function Icon({
  name,
  className = 'h-5 w-5',
  strokeWidth = 1.8,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {renderIcon(name)}
    </svg>
  )
}

function renderIcon(name: IconName): ReactNode {
  switch (name) {
    case 'home':
      return <path d="m3 10.5 9-7 9 7V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
    case 'devices':
      return (
        <>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </>
      )
    case 'rooms':
      return (
        <>
          <path d="M4 21h16" />
          <path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17" />
          <path d="M14 12h.01" />
        </>
      )
    case 'energy':
      return <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
    case 'shield':
      return (
        <>
          <path d="M12 3 5 6v5c0 5 3.4 8 7 10 3.6-2 7-5 7-10V6z" />
          <path d="m9.5 12 1.8 1.8L15 10" />
        </>
      )
    case 'settings':
      return (
        <>
          <path d="M4 6h16M4 12h16M4 18h16" />
          <circle cx="9" cy="6" r="2" />
          <circle cx="15" cy="12" r="2" />
          <circle cx="8" cy="18" r="2" />
        </>
      )
    case 'bell':
      return (
        <>
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10.3 21a2 2 0 0 0 3.4 0" />
        </>
      )
    case 'search':
      return (
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </>
      )
    case 'menu':
      return <path d="M4 7h16M4 12h16M4 17h16" />
    case 'close':
      return <path d="M6 6l12 12M18 6 6 18" />
    case 'plus':
      return <path d="M12 5v14M5 12h14" />
    case 'thermometer':
      return <path d="M14 14.8V5a2 2 0 1 0-4 0v9.8a4 4 0 1 0 4 0Z" />
    case 'droplet':
      return <path d="M12 3s6 6.2 6 10a6 6 0 0 1-12 0c0-3.8 6-10 6-10Z" />
    case 'wifi':
      return (
        <>
          <path d="M5 12.5a10 10 0 0 1 14 0" />
          <path d="M8.5 16a5 5 0 0 1 7 0" />
          <path d="M12 19.5h.01" />
        </>
      )
    case 'lock':
      return (
        <>
          <rect x="4" y="10" width="16" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </>
      )
    case 'lightbulb':
      return (
        <>
          <path d="M9 18h6" />
          <path d="M10 21h4" />
          <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z" />
        </>
      )
    case 'fan':
      return (
        <>
          <circle cx="12" cy="12" r="2" />
          <path d="M12 10c0-3 1-6 4-6 2 0 3 2 3 4 0 2-2 3-4 3h-3" />
          <path d="M14 12c3 0 6 1 6 4 0 2-2 3-4 3-2 0-3-2-3-4v-3" />
          <path d="M12 14c0 3-1 6-4 6-2 0-3-2-3-4 0-2 2-3 4-3h3" />
          <path d="M10 12c-3 0-6-1-6-4 0-2 2-3 4-3 2 0 3 2 3 4v3" />
        </>
      )
    case 'plug':
      return (
        <>
          <path d="M9 3v5M15 3v5" />
          <path d="M6 8h12v4a6 6 0 0 1-12 0z" />
          <path d="M12 18v3" />
        </>
      )
    case 'camera':
      return (
        <>
          <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <circle cx="12" cy="12.5" r="3.5" />
        </>
      )
    case 'speaker':
      return (
        <>
          <rect x="6" y="3" width="12" height="18" rx="2" />
          <circle cx="12" cy="8" r="2" />
          <path d="M10.5 16h3" />
        </>
      )
    case 'sun':
      return (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
        </>
      )
    case 'moon':
      return <path d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5Z" />
    case 'arrow-up':
      return <path d="M12 19V5M6 11l6-6 6 6" />
    case 'arrow-down':
      return <path d="M12 5v14M6 13l6 6 6-6" />
    case 'chevron-right':
      return <path d="m9 6 6 6-6 6" />
    case 'sparkles':
      return (
        <>
          <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
          <path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z" />
        </>
      )
    case 'sofa':
      return (
        <>
          <path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
          <path d="M3 12a2 2 0 0 1 2 2v3h14v-3a2 2 0 0 1 2-2" />
          <path d="M5 17v2M19 17v2" />
        </>
      )
    case 'kitchen':
      return (
        <>
          <path d="M4 10h16" />
          <path d="M6 10v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8" />
          <path d="M9 6c0-1 1-1 1-2M13 6c0-1 1-1 1-2" />
        </>
      )
    case 'bed':
      return (
        <>
          <path d="M3 8v11" />
          <path d="M3 16h18v3" />
          <path d="M3 12h18v4" />
          <path d="M7 12V9h5v3" />
        </>
      )
    case 'desk':
      return (
        <>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16v4" />
        </>
      )
    case 'bath':
      return (
        <>
          <path d="M4 12V6a2 2 0 0 1 4 0" />
          <path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
          <path d="M6 19v2M18 19v2" />
        </>
      )
    case 'car':
      return (
        <>
          <path d="M3 13l2-5h14l2 5v5H3z" />
          <circle cx="7.5" cy="16" r="1.5" />
          <circle cx="16.5" cy="16" r="1.5" />
        </>
      )
    case 'check':
      return <path d="m5 12 4.5 4.5L19 7" />
    case 'gauge':
      return (
        <>
          <path d="M3 18a9 9 0 1 1 18 0" />
          <path d="M12 14l3-3" />
          <circle cx="12" cy="14" r="1" />
        </>
      )
    case 'leaf':
      return (
        <>
          <path d="M4 20c0-8 6-14 16-14 0 10-6 16-16 14Z" />
          <path d="M4 20c2-6 6-9 11-11" />
        </>
      )
  }
}
