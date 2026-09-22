import type { LibraryTab } from '../types'

const TABS: { id: LibraryTab; label: string; accent: string }[] = [
  { id: 'pdf', label: 'PDF', accent: 'border-rose-500 text-rose-500' },
  { id: 'word', label: 'Word', accent: 'border-azure-500 text-azure-500' },
  { id: 'excel', label: 'Tableur', accent: 'border-moss-500 text-moss-500' },
  { id: 'slide', label: 'Diapos', accent: 'border-amber-500 text-amber-500' },
]

interface LibraryTabsProps {
  active: LibraryTab
  onChange: (tab: LibraryTab) => void
}

export default function LibraryTabs({ active, onChange }: LibraryTabsProps) {
  return (
    <div className="flex items-center border-b border-ink-950/[0.06] px-2">
      {TABS.map((tab) => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 py-2.5 text-[14px] font-bold border-b-[2.5px] transition-colors ${
              isActive ? tab.accent : 'border-transparent text-ink-800/40'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
