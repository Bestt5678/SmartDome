import type { IconName, SectionId } from '../types'
import { cn } from '../lib/utils'
import { Icon } from './Icon'

const navItems: Array<{ id: SectionId; label: string; icon: IconName }> = [
  { id: 'overview', label: 'Overview', icon: 'home' },
  { id: 'devices', label: 'Devices', icon: 'devices' },
  { id: 'rooms', label: 'Rooms', icon: 'rooms' },
  { id: 'energy', label: 'Energy', icon: 'energy' },
  { id: 'security', label: 'Security', icon: 'shield' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
]

interface SidebarProps {
  active: SectionId
  onNavigate: (section: SectionId) => void
  open: boolean
  onClose: () => void
  onlineCount: number
  totalCount: number
}

export function Sidebar({
  active,
  onNavigate,
  open,
  onClose,
  onlineCount,
  totalCount,
}: SidebarProps) {
  const onlinePercent =
    totalCount > 0 ? Math.round((onlineCount / totalCount) * 100) : 0

  const content = (
    <div className="flex h-full flex-col gap-6 border-r border-white/5 bg-panel/90 px-4 py-6 backdrop-blur-xl">
      <div className="flex items-center justify-between px-2">
        <button
          type="button"
          onClick={() => onNavigate('overview')}
          className="flex items-center gap-3 text-left"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-sky-500 text-ink shadow-lg shadow-emerald-500/20">
            <Icon name="home" className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-tight text-slate-100">
              SmartDome
            </span>
            <span className="block text-[11px] text-slate-500">
              Home control
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200 lg:hidden"
        >
          <Icon name="close" className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1" aria-label="Primary">
        {navItems.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-emerald-400/10 text-emerald-300'
                  : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200',
              )}
            >
              <Icon name={item.icon} className="h-5 w-5" />
              <span>{item.label}</span>
              {isActive ? (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
              ) : null}
            </button>
          )
        })}
      </nav>

      <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-slate-300">Home status</span>
          <span className="inline-flex items-center gap-1.5 text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            Online
          </span>
        </div>
        <p className="mt-2 text-sm font-semibold text-slate-100">
          {onlineCount} of {totalCount} devices
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-all duration-500"
            style={{ width: `${onlinePercent}%` }}
          />
        </div>
        <p className="mt-3 text-[11px] text-slate-500">SmartDome Hub · v1.0</p>
      </div>
    </div>
  )

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 lg:block">
        {content}
      </aside>

      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!open}
      >
        <div
          onClick={onClose}
          className={cn(
            'absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          className={cn(
            'absolute inset-y-0 left-0 w-72 max-w-[85%] transition-transform duration-300',
            open ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          {content}
        </div>
      </div>
    </>
  )
}
