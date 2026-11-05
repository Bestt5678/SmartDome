import type { ActivityEvent } from '../types'
import { cn } from '../lib/utils'
import { Icon } from './Icon'

const toneClasses: Record<ActivityEvent['tone'], string> = {
  accent: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
  info: 'border-sky-400/25 bg-sky-400/10 text-sky-300',
  warn: 'border-amber-400/25 bg-amber-400/10 text-amber-300',
}

interface ActivityListProps {
  events: ActivityEvent[]
}

export function ActivityList({ events }: ActivityListProps) {
  return (
    <ul className="space-y-1">
      {events.map((event) => (
        <li
          key={event.id}
          className="flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-white/[0.03]"
        >
          <span
            className={cn(
              'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border',
              toneClasses[event.tone],
            )}
          >
            <Icon name={event.icon} className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-200">
              {event.title}
            </p>
            <p className="truncate text-xs text-slate-500">{event.description}</p>
          </div>
          <span className="shrink-0 whitespace-nowrap pt-0.5 text-[11px] text-slate-500">
            {event.time}
          </span>
        </li>
      ))}
    </ul>
  )
}
