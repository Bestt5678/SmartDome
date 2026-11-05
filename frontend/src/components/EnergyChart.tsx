import type { EnergyPoint } from '../types'
import { cn } from '../lib/utils'

interface EnergyChartProps {
  points: EnergyPoint[]
}

export function EnergyChart({ points }: EnergyChartProps) {
  const max = Math.max(...points.map((point) => point.value), 1)
  const lastIndex = points.length - 1

  return (
    <div>
      <div className="flex h-44 items-end gap-2 sm:gap-3">
        {points.map((point, index) => {
          const height = Math.max((point.value / max) * 100, 6)
          const isToday = index === lastIndex

          return (
            <div
              key={point.label}
              className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <span className="text-[10px] font-medium text-slate-500 opacity-0 transition-opacity group-hover:opacity-100">
                {point.value.toFixed(1)}
              </span>
              <div className="flex w-full flex-1 items-end">
                <div
                  className={cn(
                    'w-full rounded-t-lg transition-all duration-300 group-hover:brightness-125',
                    isToday
                      ? 'bg-gradient-to-t from-emerald-500/30 to-emerald-400 shadow-[0_0_18px_-4px_rgba(52,211,153,0.7)]'
                      : 'bg-gradient-to-t from-slate-700/40 to-slate-500/50',
                  )}
                  style={{ height: `${height}%` }}
                  title={`${point.label}: ${point.value.toFixed(1)} kWh`}
                />
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium',
                  isToday ? 'text-emerald-300' : 'text-slate-500',
                )}
              >
                {point.label}
              </span>
            </div>
          )
        })}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3 text-[11px] text-slate-500">
        <span>Last 7 days</span>
        <span>kWh / day</span>
      </div>
    </div>
  )
}
