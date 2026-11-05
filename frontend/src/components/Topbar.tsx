import { Icon } from './Icon'

interface TopbarProps {
  onOpenMenu: () => void
  query: string
  onQueryChange: (value: string) => void
  activeCount: number
}

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export function Topbar({
  onOpenMenu,
  query,
  onQueryChange,
  activeCount,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-ink/80 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="rounded-lg border border-white/5 bg-white/[0.03] p-2 text-slate-300 transition-colors hover:bg-white/[0.06] lg:hidden"
        >
          <Icon name="menu" className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
            {greeting()}, Alex
          </p>
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-slate-100">
              Home overview
            </p>
            <span className="hidden items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300 md:inline-flex">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              {activeCount} active
            </span>
          </div>
        </div>

        <label className="relative hidden sm:block">
          <span className="sr-only">Search devices</span>
          <Icon
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search devices…"
            className="w-56 rounded-xl border border-white/5 bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
          />
        </label>

        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg border border-white/5 bg-white/[0.03] p-2 text-slate-300 transition-colors hover:bg-white/[0.06]"
        >
          <Icon name="bell" className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
        </button>

        <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] py-1 pl-1 pr-1 sm:pr-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 text-xs font-semibold text-ink">
            A
          </span>
          <span className="hidden text-xs font-medium text-slate-300 sm:block">
            Alex
          </span>
        </div>
      </div>
    </header>
  )
}
