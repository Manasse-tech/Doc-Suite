import { FolderOpen, History, Star, LayoutGrid } from 'lucide-react'
import type { LibraryNav } from '../types'

interface BottomNavProps {
  active: LibraryNav
  onChange: (nav: LibraryNav) => void
}

const ITEMS: { id: LibraryNav; label: string; icon: typeof FolderOpen }[] = [
  { id: 'files', label: 'Fichiers', icon: FolderOpen },
  { id: 'recent', label: 'Récents', icon: History },
  { id: 'favorites', label: 'Favoris', icon: Star },
  { id: 'tools', label: 'Boîte à outils', icon: LayoutGrid },
]

export default function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <div className="flex items-stretch border-t border-ink-950/[0.06] bg-white/95 backdrop-blur px-2 pb-6 pt-2">
      {ITEMS.map((item) => {
        const isActive = active === item.id
        const Icon = item.icon
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            aria-current={isActive ? 'page' : undefined}
            className={`flex-1 flex flex-col items-center gap-1 py-1.5 relative transition-transform active:scale-95 ${isActive ? 'active-nav' : ''}`}
          >
            {item.id === 'tools' && (
              <span className="absolute top-0 right-[22%] bg-rose-500 text-white text-[8px] font-bold px-1 py-[1px] rounded-full leading-tight">
                Neuf
              </span>
            )}
            <Icon
              size={20}
              strokeWidth={2.2}
              className={isActive ? 'text-iris-500' : 'text-ink-800/40'}
              fill={isActive && item.id === 'favorites' ? 'currentColor' : 'none'}
            />
            <span
              className={`text-[10.5px] font-medium ${
                isActive ? 'text-iris-500' : 'text-ink-800/40'
              }`}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
