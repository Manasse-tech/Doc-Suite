import { useState } from 'react'
import { ArrowLeft, Crop, Trash2, Wand2, SlidersHorizontal, Plus } from 'lucide-react'
import StatusBar from '../components/StatusBar'

interface ScanReviewScreenProps {
  onBack: () => void
  onDone: (name: string) => void
}

const FILTERS = [
  { id: 'enhance', label: 'Améliorer', icon: Wand2 },
  { id: 'filters', label: 'Filtres', icon: SlidersHorizontal },
  { id: 'crop', label: 'Recadrer', icon: Crop },
]

export default function ScanReviewScreen({ onBack, onDone }: ScanReviewScreenProps) {
  const [active, setActive] = useState('enhance')
  const [name, setName] = useState('Document scanné')

  return (
    <div className="flex flex-col h-full bg-ink-950 text-white">
      <StatusBar dark />
      <div className="px-4 pt-2">
        <button onClick={onBack} className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center">
          <ArrowLeft size={17} />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-10 relative">
        <div className={`relative w-full aspect-[3/4] rounded-lg bg-gradient-to-br from-white via-paper-100 to-white shadow-2xl overflow-hidden ${active === 'filters' ? 'grayscale' : ''}`}>
          <div className="absolute inset-0 p-5 opacity-70">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="h-2 rounded-full bg-ink-950/10 mb-3"
                style={{ width: `${70 + (i % 3) * 8}%` }}
              />
            ))}
          </div>
        </div>
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button className="h-9 w-9 rounded-full bg-black/50 flex items-center justify-center">
            <Crop size={15} />
          </button>
          <button className="h-9 w-9 rounded-full bg-black/50 flex items-center justify-center">
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 py-4 border-t border-white/10">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setActive(f.id)}
            className="flex flex-col items-center gap-1.5"
          >
            <f.icon
              size={18}
              className={active === f.id ? 'text-iris-400' : 'text-white/50'}
            />
            <span
              className={`text-[11px] font-medium ${
                active === f.id ? 'text-iris-400' : 'text-white/50'
              }`}
            >
              {f.label}
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 px-4 pb-8 pt-1">
        <div className="relative h-14 w-11 rounded-md bg-white shrink-0 ring-2 ring-iris-400">
          <span className="absolute -bottom-1.5 -right-1.5 h-4 w-4 rounded-full bg-iris-500 text-[9px] font-bold flex items-center justify-center">
            1
          </span>
        </div>
        <button className="h-14 w-11 rounded-md border border-dashed border-white/25 flex items-center justify-center shrink-0">
          <Plus size={16} className="text-white/50" />
        </button>
        <div className="flex-1" />
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-label="Nom du document scanné"
            className="min-w-0 w-32 rounded-full bg-white/10 px-3 py-2 text-[11px] text-white outline-none placeholder:text-white/40"
            placeholder="Nom du document"
          />
        <button
          onClick={() => onDone(name)}
          className="h-11 px-7 rounded-full bg-iris-500 text-white text-[14px] font-bold"
        >
          Suivant
        </button>
      </div>
    </div>
  )
}
