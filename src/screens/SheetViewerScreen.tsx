import { useState } from 'react'
import { ArrowLeft, Plus } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import type { DocFile } from '../types'

interface SheetViewerScreenProps {
  file: DocFile
  onBack: () => void
}

const ROWS = Array.from({ length: 16 }, (_, i) => i + 1)
const COLS = ['A', 'B', 'C']

export default function SheetViewerScreen({ file, onBack }: SheetViewerScreenProps) {
  const [sheet, setSheet] = useState('Idées')
  const [sheets, setSheets] = useState(['Idées', 'Notes'])
  return (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 py-2.5">
        <button onClick={onBack} className="text-ink-950/70">
          <ArrowLeft size={19} />
        </button>
        <p className="text-[14px] font-semibold text-ink-950 truncate">{file.name}</p>
      </div>

      <div className="flex-1 overflow-auto no-scrollbar">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="sticky top-0 left-0 z-20 bg-paper-100 w-9 h-7 text-[10px] text-ink-800/40 border border-paper-200" />
              {COLS.map((c) => (
                <th
                  key={c}
                  className="sticky top-0 z-10 bg-paper-100 h-7 text-[11px] font-semibold text-ink-800/60 border border-paper-200 min-w-[76px]"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r}>
                <td className="sticky left-0 z-10 bg-paper-100 text-center text-[11px] text-ink-800/50 border border-paper-200 h-8">
                  {r}
                </td>
                <td
                  className={`border border-paper-200 h-8 text-center text-[11.5px] ${
                    r === 1 ? 'bg-moss-100 font-bold text-moss-500' : 'text-ink-950/80'
                  }`}
                >
                  {r === 1 ? 'Rang' : r - 1}
                </td>
                <td className="border border-paper-200 h-8 text-center text-[11.5px] text-ink-950/70">
                  {r === 1 ? 'Idée' : r <= 9 ? `Idée ${r - 1}` : ''}
                </td>
                <td className="border border-paper-200 h-8" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 border-t border-paper-100 overflow-x-auto no-scrollbar">
        {sheets.map((name) => <button key={name} onClick={() => setSheet(name)} className={`px-3 py-1.5 rounded-lg text-[12px] font-bold shrink-0 ${sheet === name ? 'bg-moss-100 text-moss-500' : 'text-ink-800/40'}`}>{name}</button>)}
        <button onClick={() => { const name = `Feuille ${sheets.length + 1}`; setSheets((value) => [...value, name]); setSheet(name) }} aria-label="Ajouter une feuille" className="text-ink-800/40"><Plus size={17} /></button>
      </div>
    </div>
  )
}
