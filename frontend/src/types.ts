export type IconName =
  | 'home'
  | 'devices'
  | 'rooms'
  | 'energy'
  | 'shield'
  | 'settings'
  | 'bell'
  | 'search'
  | 'menu'
  | 'close'
  | 'plus'
  | 'thermometer'
  | 'droplet'
  | 'wifi'
  | 'lock'
  | 'lightbulb'
  | 'fan'
  | 'plug'
  | 'camera'
  | 'speaker'
  | 'sun'
  | 'moon'
  | 'arrow-up'
  | 'arrow-down'
  | 'chevron-right'
  | 'sparkles'
  | 'sofa'
  | 'kitchen'
  | 'bed'
  | 'desk'
  | 'bath'
  | 'car'
  | 'check'
  | 'gauge'
  | 'leaf'

export type SectionId =
  | 'overview'
  | 'devices'
  | 'rooms'
  | 'energy'
  | 'security'
  | 'settings'

export type DeviceKind =
  | 'light'
  | 'thermostat'
  | 'fan'
  | 'lock'
  | 'camera'
  | 'plug'
  | 'speaker'

export type DeviceStatus = 'online' | 'offline'

export interface Device {
  id: string
  name: string
  roomId: string
  kind: DeviceKind
  isOn: boolean
  detail: string
  status: DeviceStatus
  battery?: number
}

export interface Room {
  id: string
  name: string
  icon: IconName
  temperature: number
  humidity: number
}

export interface Stat {
  id: string
  label: string
  value: string
  unit?: string
  icon: IconName
  change: string
  direction: 'up' | 'down' | 'flat'
}

export interface ActivityEvent {
  id: string
  title: string
  description: string
  time: string
  icon: IconName
  tone: 'accent' | 'info' | 'warn'
}

export interface EnergyPoint {
  label: string
  value: number
}
