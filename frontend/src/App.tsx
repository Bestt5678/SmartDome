import { useState } from 'react'
import { ActivityList } from './components/ActivityList'
import { DeviceCard } from './components/DeviceCard'
import { EnergyChart } from './components/EnergyChart'
import { Icon } from './components/Icon'
import { RoomCard } from './components/RoomCard'
import { SectionHeader } from './components/SectionHeader'
import { Sidebar } from './components/Sidebar'
import { StatCard } from './components/StatCard'
import { Toggle } from './components/Toggle'
import { Topbar } from './components/Topbar'
import { activity, devices as initialDevices, energy, rooms } from './data/mock'
import type { SectionId, Stat } from './types'

const energyBreakdown = [
  { label: 'Climate', value: 38, bar: 'bg-sky-400' },
  { label: 'Lighting', value: 22, bar: 'bg-emerald-400' },
  { label: 'Appliances', value: 27, bar: 'bg-amber-400' },
  { label: 'Other', value: 13, bar: 'bg-slate-500' },
]

function App() {
  const [devices, setDevices] = useState(() => initialDevices)
  const [activeSection, setActiveSection] = useState<SectionId>('overview')
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [roomFilter, setRoomFilter] = useState<string | null>(null)
  const [awayMode, setAwayMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [energySaving, setEnergySaving] = useState(true)

  const roomNameById = new Map(rooms.map((room) => [room.id, room.name]))

  const onlineDevices = devices.filter((device) => device.status === 'online')
  const activeDevices = devices.filter(
    (device) => device.isOn && device.status === 'online',
  )

  const avgTemperature =
    rooms.reduce((sum, room) => sum + room.temperature, 0) / rooms.length
  const avgHumidity =
    rooms.reduce((sum, room) => sum + room.humidity, 0) / rooms.length
  const todayEnergy = energy[energy.length - 1]?.value ?? 0

  const stats: Stat[] = [
    {
      id: 'temperature',
      label: 'Avg. temperature',
      value: avgTemperature.toFixed(1),
      unit: '°C',
      icon: 'thermometer',
      change: '+0.4° vs yesterday',
      direction: 'up',
    },
    {
      id: 'humidity',
      label: 'Avg. humidity',
      value: String(Math.round(avgHumidity)),
      unit: '%',
      icon: 'droplet',
      change: 'Optimal range',
      direction: 'flat',
    },
    {
      id: 'energy',
      label: 'Energy today',
      value: todayEnergy.toFixed(1),
      unit: 'kWh',
      icon: 'energy',
      change: '12% below average',
      direction: 'down',
    },
    {
      id: 'devices',
      label: 'Devices active',
      value: String(activeDevices.length),
      unit: `of ${devices.length}`,
      icon: 'devices',
      change: `${onlineDevices.length} online`,
      direction: 'flat',
    },
  ]

  const normalizedQuery = query.trim().toLowerCase()
  const filteredDevices = devices.filter((device) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      device.name.toLowerCase().includes(normalizedQuery) ||
      (roomNameById.get(device.roomId) ?? '')
        .toLowerCase()
        .includes(normalizedQuery)
    const matchesRoom = roomFilter === null || device.roomId === roomFilter
    return matchesQuery && matchesRoom
  })

  const hasFilters = roomFilter !== null || normalizedQuery.length > 0
  const securityDevices = devices.filter(
    (device) => device.kind === 'lock' || device.kind === 'camera',
  )
  const locks = devices.filter((device) => device.kind === 'lock')
  const cameras = devices.filter((device) => device.kind === 'camera')
  const lockedCount = locks.filter((lock) => lock.isOn).length
  const recordingCount = cameras.filter(
    (camera) => camera.isOn && camera.status === 'online',
  ).length

  function toggleDevice(id: string) {
    setDevices((previous) =>
      previous.map((device) =>
        device.id === id ? { ...device, isOn: !device.isOn } : device,
      ),
    )
  }

  function navigate(section: SectionId) {
    setActiveSection(section)
    setMenuOpen(false)
    document
      .getElementById(section)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function selectRoom(roomId: string) {
    setRoomFilter((previous) => (previous === roomId ? null : roomId))
    navigate('devices')
  }

  function clearFilters() {
    setRoomFilter(null)
    setQuery('')
  }

  function roomCounts(roomId: string) {
    const roomDevices = devices.filter((device) => device.roomId === roomId)
    return {
      total: roomDevices.length,
      active: roomDevices.filter((device) => device.isOn).length,
    }
  }

  return (
    <div className="min-h-screen bg-ink">
      <Sidebar
        active={activeSection}
        onNavigate={navigate}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onlineCount={onlineDevices.length}
        totalCount={devices.length}
      />

      <div className="lg:pl-72">
        <Topbar
          onOpenMenu={() => setMenuOpen(true)}
          query={query}
          onQueryChange={setQuery}
          activeCount={activeDevices.length}
        />

        <main className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
          <section
            id="overview"
            className="animate-fade-in scroll-mt-24"

          >
            <SectionHeader
              eyebrow="Dashboard"
              title="Welcome home"
              description="Everything is running smoothly. Here is what is happening across your home right now."
              action={
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                  <Icon name="shield" className="h-3.5 w-3.5" />
                  All systems normal
                </span>
              }
            />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <StatCard key={stat.id} stat={stat} />
              ))}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-white/5 bg-panel/70 p-5 lg:col-span-2">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-100">
                      Energy consumption
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {todayEnergy.toFixed(1)} kWh used today
                    </p>
                  </div>
                  <span className="rounded-full border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-slate-400">
                    This week
                  </span>
                </div>
                <EnergyChart points={energy} />
              </div>

              <div className="rounded-2xl border border-white/5 bg-panel/70 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-100">
                    Recent activity
                  </h3>
                  <span className="text-[11px] text-slate-500">Live</span>
                </div>
                <ActivityList events={activity} />
              </div>
            </div>
          </section>

          <section
            id="devices"
            className="mt-10 scroll-mt-24"

          >
            <SectionHeader
              eyebrow="Devices"
              title="Connected devices"
              description="Control lights, climate, security and appliances from one place."
              action={
                hasFilters ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-white/[0.06]"
                  >
                    <Icon name="close" className="h-3.5 w-3.5" />
                    Clear filters
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-400">
                    <Icon name="wifi" className="h-3.5 w-3.5 text-emerald-400" />
                    {onlineDevices.length} online
                  </span>
                )
              }
            />

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRoomFilter(null)}
                  className={
                    roomFilter === null
                      ? 'rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300'
                      : 'rounded-full border border-white/5 bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-white/[0.05]'
                  }
                >
                  All rooms
                </button>
                {rooms.map((room) => (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => setRoomFilter(room.id)}
                    className={
                      roomFilter === room.id
                        ? 'rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300'
                        : 'rounded-full border border-white/5 bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-white/[0.05]'
                    }
                  >
                    {room.name}
                  </button>
                ))}
              </div>

              <label className="relative sm:hidden">
                <span className="sr-only">Search devices</span>
                <Icon
                  name="search"
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search devices…"
                  className="w-full rounded-xl border border-white/5 bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                />
              </label>
            </div>

            {filteredDevices.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredDevices.map((device) => (
                  <DeviceCard
                    key={device.id}
                    device={device}
                    roomName={roomNameById.get(device.roomId) ?? 'Unknown room'}
                    onToggle={() => toggleDevice(device.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.01] px-6 py-12 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/5 bg-white/[0.03] text-slate-400">
                  <Icon name="search" className="h-5 w-5" />
                </span>
                <p className="mt-3 text-sm font-medium text-slate-200">
                  No devices found
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Try a different search or clear the room filter.
                </p>
              </div>
            )}
          </section>

          <section
            id="rooms"
            className="mt-10 scroll-mt-24"

          >
            <SectionHeader
              eyebrow="Rooms"
              title="Spaces at a glance"
              description="Tap a room to filter its devices and review the climate in each space."
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {rooms.map((room) => {
                const counts = roomCounts(room.id)
                return (
                  <RoomCard
                    key={room.id}
                    room={room}
                    deviceCount={counts.total}
                    activeCount={counts.active}
                    selected={roomFilter === room.id}
                    onSelect={() => selectRoom(room.id)}
                  />
                )
              })}
            </div>
          </section>

          <section
            id="energy"
            className="mt-10 scroll-mt-24"

          >
            <SectionHeader
              eyebrow="Energy"
              title="Usage and savings"
              description="Track consumption trends and see where energy is being used across the home."
            />
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-white/5 bg-panel/70 p-5 lg:col-span-2">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-100">
                      Weekly consumption
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Average{' '}
                      {(
                        energy.reduce((sum, point) => sum + point.value, 0) /
                        energy.length
                      ).toFixed(1)}{' '}
                      kWh per day
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                    <Icon name="leaf" className="h-3.5 w-3.5" />
                    Efficient
                  </span>
                </div>
                <EnergyChart points={energy} />
              </div>

              <div className="rounded-2xl border border-white/5 bg-panel/70 p-5">
                <h3 className="text-sm font-semibold text-slate-100">
                  Breakdown
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Estimated share this week
                </p>
                <ul className="mt-5 space-y-4">
                  {energyBreakdown.map((item) => (
                    <li key={item.label}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-300">
                          {item.label}
                        </span>
                        <span className="text-slate-500">{item.value}%</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/5">
                        <div
                          className={`h-full rounded-full ${item.bar}`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section
            id="security"
            className="mt-10 scroll-mt-24"

          >
            <SectionHeader
              eyebrow="Security"
              title="Doors and cameras"
              description="Monitor entry points and keep an eye on your home whenever you are away."
            />
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                  <Icon name="shield" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-slate-100">
                  All secure
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  No alerts in the last 24 hours.
                </p>
                <dl className="mt-5 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <dt className="text-slate-400">Doors locked</dt>
                    <dd className="font-medium text-slate-200">
                      {lockedCount}/{locks.length}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-slate-400">Cameras recording</dt>
                    <dd className="font-medium text-slate-200">
                      {recordingCount}/{cameras.length}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-slate-400">Away mode</dt>
                    <dd
                      className={
                        awayMode
                          ? 'font-medium text-emerald-300'
                          : 'font-medium text-slate-500'
                      }
                    >
                      {awayMode ? 'Armed' : 'Disarmed'}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
                {securityDevices.map((device) => (
                  <DeviceCard
                    key={device.id}
                    device={device}
                    roomName={roomNameById.get(device.roomId) ?? 'Unknown room'}
                    onToggle={() => toggleDevice(device.id)}
                  />
                ))}
              </div>
            </div>
          </section>

          <section
            id="settings"
            className="mt-10 scroll-mt-24"

          >
            <SectionHeader
              eyebrow="Settings"
              title="Home preferences"
              description="Fine-tune how SmartDome behaves. Changes are saved automatically."
            />
            <div className="rounded-2xl border border-white/5 bg-panel/70">
              <div className="divide-y divide-white/5">
                {[
                  {
                    id: 'away',
                    title: 'Away mode',
                    description:
                      'Lock doors and dim lights automatically when everyone leaves.',
                    checked: awayMode,
                    onChange: () => setAwayMode((value) => !value),
                  },
                  {
                    id: 'notifications',
                    title: 'Push notifications',
                    description:
                      'Get alerts for motion, door activity and device issues.',
                    checked: notifications,
                    onChange: () => setNotifications((value) => !value),
                  },
                  {
                    id: 'energy-saving',
                    title: 'Energy saving',
                    description:
                      'Shift high-power devices away from peak tariff hours.',
                    checked: energySaving,
                    onChange: () => setEnergySaving((value) => !value),
                  },
                ].map((setting) => (
                  <div
                    key={setting.id}
                    className="flex items-center justify-between gap-4 p-5"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-200">
                        {setting.title}
                      </p>
                      <p className="mt-0.5 max-w-xl text-xs text-slate-500">
                        {setting.description}
                      </p>
                    </div>
                    <Toggle
                      checked={setting.checked}
                      onChange={setting.onChange}
                      label={setting.title}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/5 px-4 py-6 text-center text-xs text-slate-600 sm:px-6 lg:px-8">
          SmartDome · Demo dashboard with local mock data
        </footer>
      </div>
    </div>
  )
}

export default App
