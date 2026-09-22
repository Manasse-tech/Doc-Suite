import { useEffect } from 'react'
import { Layers, ArrowRight } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import FileIcon from '../components/FileIcon'
import { statCounts } from '../data/mockFiles'

interface TodayScreenProps {
  onEnterLibrary: () => void
}

const DOW = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(new Date())
const MONTH = new Intl.DateTimeFormat('fr-FR', { month: 'short' })
  .format(new Date())
  .replace('.', '')
const DAY = new Date().getDate().toString().padStart(2, '0')

const STAT_ITEMS = [
  { kind: 'pdf' as const, label: 'PDF', value: statCounts.pdf },
  { kind: 'excel' as const, label: 'Tableurs', value: statCounts.excel },
  { kind: 'word' as const, label: 'Documents', value: statCounts.word },
  { kind: 'slide' as const, label: 'Diapos', value: statCounts.slide },
]

export default function TodayScreen({ onEnterLibrary }: TodayScreenProps) {
  useEffect(() => {
    const timer = window.setTimeout(onEnterLibrary, 1400)
    return () => window.clearTimeout(timer)
  }, [onEnterLibrary])

  return (
    <div className="page-enter flex flex-col h-full bg-paper-50 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, #12131A 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />
      <StatusBar />
      <div className="flex-1 px-6 pt-4 relative">
        <div className="logo-mark h-14 w-14 rounded-2xl bg-iris-500 flex items-center justify-center shadow-pop">
          <Layers size={24} className="text-white" strokeWidth={2} />
        </div>

        <p className="mt-9 text-[15px] text-ink-800/50 capitalize">{DOW}</p>
        <h1 className="font-display font-semibold text-[56px] leading-[0.95] text-ink-950 tracking-tight uppercase">
          {MONTH} {DAY}
        </h1>

        <button
          onClick={onEnterLibrary}
          className="mt-8 flex items-center gap-3 text-ink-800/60 group transition-colors hover:text-iris-500"
        >
          <span className="h-px w-8 bg-ink-950/25" />
          <span className="text-[15px] font-medium">Ouvrir ma bibliothèque</span>
          <ArrowRight
            size={15}
            className="group-active:translate-x-1 transition-transform"
          />
        </button>

        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7">
          {STAT_ITEMS.map((s, index) => (
            <div key={s.kind} className="stagger-in flex flex-col gap-2.5" style={{ animationDelay: `${index * 70 + 120}ms` }}>
              <span className="text-[12.5px] font-semibold text-ink-800/45 tracking-wide uppercase">
                {s.label}
              </span>
              <FileIcon kind={s.kind} />
              <span className="font-mono text-[26px] font-semibold text-ink-950 tabular-nums">
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-10">
        <div className="h-1 w-full rounded-full bg-ink-950/[0.06] overflow-hidden">
          <div className="h-full w-1/4 rounded-full bg-iris-500 animate-loadbar" />
        </div>
      </div>
    </div>
  )
}
