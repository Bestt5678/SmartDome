import type { Device, DeviceKind, IconName } from '../types'
import { cn } from '../lib/utils'
import { Icon } from './Icon'
import { Toggle } from './Toggle'

const iconByKind: Record<DeviceKind, IconName> = {
  light: 'lightbulb',
  thermostat: 'thermometer',
  fan: 'fan',
  lock: 'lock',
  camera: 'camera',
  plug: 'plug',
  speaker: 'speaker',
}

interface DeviceCardProps {
  device: Device
  roomName: string
  onToggle: () => void
}

export function DeviceCard({ device, roomName, onToggle }: DeviceCardProps) {
  const isOffline = device.status === 'offline'
  const isActive = device.isOn && !isOffline

  const detail = isOffline
    ? 'Unavailable'
    : device.kind === 'lock'
      ? device.isOn
        ? 'Locked'
        : 'Unlocked'
      : device.isOn
        ? device.detail
        : 'Off'

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-2xl border p-5 transition-all duration-200',
        isActive
          ? 'border-emerald-400/25 bg-emerald-400/[0.05]'
          : 'border-white/5 bg-panel/70 hover:border-white/10',
        isOffline && 'opacity-60',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl border transition-colors',
            isActive
              ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
              : 'border-white/5 bg-white/[0.03] text-slate-400',
          )}
        >
          <Icon name={iconByKind[device.kind]} className="h-5 w-5" />
        </span>
        <Toggle
          checked={device.isOn}
          onChange={onToggle}
          label={`Turn ${device.name} ${device.isOn ? 'off' : 'on'}`}
          disabled={isOffline}
        />
      </div>

      <h3 className="mt-4 truncate text-sm font-semibold text-slate-100">
        {device.name}
      </h3>
      <p className="mt-0.5 text-xs text-slate-500">{roomName}</p>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/5 pt-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              isOffline
                ? 'bg-slate-600'
                : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]',
            )}
          />
          {isOffline ? 'Offline' : 'Online'}
        </span>
        <span className="truncate text-[11px] text-slate-500">{detail}</span>
      </div>

      {typeof device.battery === 'number' ? (
        <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-slate-500">
          <Icon name="energy" className="h-3 w-3 text-amber-400/70" />
          Battery {device.battery}%
        </span>
      ) : null}
    </article>
  )
}
