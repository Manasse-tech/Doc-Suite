import { Search, Crown, CloudUpload, MoreVertical } from 'lucide-react'
import type { ToastTone } from './Toast'

interface TopBarProps {
  onOpenAccount: () => void
  onOpenSync: () => void
  search: string
  onSearchChange: (value: string) => void
  onNotify: (message: string, tone?: ToastTone) => void
}

export default function TopBar({ onOpenAccount, onOpenSync, search, onSearchChange, onNotify }: TopBarProps) {
  return (
    <div className="flex items-center gap-2.5 px-4 pt-2 pb-3">
      <button
        onClick={onOpenAccount}
        aria-label="Ouvrir le compte"
        className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-iris-400 to-iris-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white"
      >
        EK
      </button>
      <label className="flex-1 h-9 rounded-full bg-paper-100 flex items-center gap-2 px-3.5">
        <Search size={16} className="text-ink-800/50" />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Rechercher un document…"
          aria-label="Rechercher un document"
          className="min-w-0 flex-1 bg-transparent text-[13px] text-ink-950 outline-none placeholder:text-ink-800/45"
        />
      </label>
      <button
        onClick={onOpenAccount}
        aria-label="Passer premium"
        className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center text-white"
      >
        <Crown size={16} fill="white" />
      </button>
      <button
        onClick={onOpenSync}
        aria-label="Synchronisation cloud"
        className="text-ink-950/70"
      >
        <CloudUpload size={20} strokeWidth={2} />
      </button>
      <button onClick={() => onNotify('Utilisez la recherche ou la synchronisation depuis cette barre.', 'info')} aria-label="Plus d'options" className="text-ink-950/70">
        <MoreVertical size={19} />
      </button>
    </div>
  )
}
