import { Wifi, BatteryFull } from 'lucide-react'
import { useEffect, useState } from 'react'

interface StatusBarProps {
  dark?: boolean
}

export default function StatusBar({ dark = false }: StatusBarProps) {
  const [time, setTime] = useState(() => new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(new Date()))
  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(new Date())), 30000)
    return () => window.clearInterval(timer)
  }, [])
  const color = dark ? 'text-white' : 'text-ink-950'
  return (
    <div
      className={`flex items-center justify-between px-5 pt-3 pb-1 text-[13px] font-semibold ${color}`}
    >
      <span className="tabular-nums" aria-label={`Heure ${time}`}>{time}</span>
      <div className="flex items-center gap-1.5">
        <Wifi size={14} strokeWidth={2.5} />
        <BatteryFull size={18} strokeWidth={2} />
      </div>
    </div>
  )
}
