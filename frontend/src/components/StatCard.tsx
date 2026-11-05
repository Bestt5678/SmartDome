import type { IconName, Stat } from '../types'
import { cn } from '../lib/utils'
import { Icon } from './Icon'

const toneByIcon: Record<string, string> = {
  thermometer: 'border-sky-400/25 bg-sky-400/10 text-sky-300',
  droplet: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-300',
  energy: 'border-amber-400/25 bg-amber-400/10 text-amber-300',
  devices: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
}

interface StatCardProps {
  stat: Stat
}

export function StatCard({ stat }: StatCardProps) {
  const trendIcon: IconName =
    stat.direction === 'up'
      ? 'arrow-up'
      : stat.direction === 'down'
        ? 'arrow-down'
        : 'gauge'

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/5 bg-panel/70 p-5 transition-colors duration-300 hover:border-white/10">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-emerald-400/5 blur-2xl transition-opacity duration-300 group-hover:bg-emerald-400/10"
        aria-hidden="true"
      />
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl border',
            toneByIcon[stat.icon] ?? 'border-white/10 bg-white/5 text-slate-300',
          )}
        >
          <Icon name={stat.icon} className="h-5 w-5" />
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
          <Icon name={trendIcon} className="h-3.5 w-3.5" />
          {stat.change}
        </span>
      </div>
      <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
        {stat.label}
      </p>
      <p className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-semibold tracking-tight text-slate-100">
          {stat.value}
        </span>
        {stat.unit ? (
          <span className="text-sm font-medium text-slate-500">{stat.unit}</span>
        ) : null}
      </p>
    </article>
  )
}
