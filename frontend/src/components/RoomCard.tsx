import type { Room } from '../types'
import { cn } from '../lib/utils'
import { Icon } from './Icon'

interface RoomCardProps {
  room: Room
  deviceCount: number
  activeCount: number
  selected: boolean
  onSelect: () => void
}

export function RoomCard({
  room,
  deviceCount,
  activeCount,
  selected,
  onSelect,
}: RoomCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'group w-full rounded-2xl border p-5 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60',
        selected
          ? 'border-emerald-400/40 bg-emerald-400/[0.06] glow-ring'
          : 'border-white/5 bg-panel/70 hover:border-white/10 hover:bg-panel-soft/60',
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl border transition-colors',
            selected
              ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
              : 'border-white/5 bg-white/[0.03] text-slate-400 group-hover:text-slate-300',
          )}
        >
          <Icon name={room.icon} className="h-5 w-5" />
        </span>
        <span className="rounded-full border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-slate-400">
          {activeCount}/{deviceCount} on
        </span>
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-100">{room.name}</h3>

      <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <Icon name="thermometer" className="h-3.5 w-3.5 text-sky-400/80" />
          {room.temperature.toFixed(1)}°C
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Icon name="droplet" className="h-3.5 w-3.5 text-cyan-400/80" />
          {room.humidity}%
        </span>
      </div>
    </button>
  )
}
