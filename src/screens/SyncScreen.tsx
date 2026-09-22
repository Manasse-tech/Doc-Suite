import { useState } from 'react'
import { ArrowLeft, UploadCloud, DownloadCloud, RefreshCw, Check } from 'lucide-react'
import StatusBar from '../components/StatusBar'

interface SyncScreenProps {
  onBack: () => void
}

export default function SyncScreen({ onBack }: SyncScreenProps) {
  const [syncing, setSyncing] = useState(false)
  const [done, setDone] = useState(false)
  const sync = () => {
    setSyncing(true)
    setDone(false)
    window.setTimeout(() => { setSyncing(false); setDone(true) }, 800)
  }
  return (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 py-3">
        <button onClick={onBack} className="text-ink-950/70">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-[17px] font-bold text-ink-950">Synchronisation</h1>
        <button onClick={sync} disabled={syncing} aria-label="Lancer la synchronisation" className="ml-auto text-iris-500 disabled:opacity-40"><RefreshCw size={18} className={syncing ? 'animate-spin' : ''} /></button>
      </div>

      <div className="px-4 flex gap-3">
        <div className="flex-1 rounded-2xl bg-paper-50 px-3.5 py-3">
          <div className="flex items-center gap-2 text-iris-500">
            <UploadCloud size={15} />
            <span className="text-[11.5px] font-mono">0 Ko / 0 Ko</span>
          </div>
          <div className="h-1 mt-2 rounded-full bg-paper-200 overflow-hidden">
            <div className="h-full w-2/3 rounded-full bg-iris-500 animate-loadbar" />
          </div>
        </div>
        <div className="flex-1 rounded-2xl bg-paper-50 px-3.5 py-3">
          <div className="flex items-center gap-2 text-moss-500">
            <DownloadCloud size={15} />
            <span className="text-[11.5px] font-mono">0 Ko / 0 Ko</span>
          </div>
          <div className="h-1 mt-2 rounded-full bg-paper-200 overflow-hidden">
            <div className="h-full w-1/2 rounded-full bg-moss-500 animate-loadbar" />
          </div>
        </div>
      </div>

      {done && <div className="mx-4 mt-3 rounded-xl bg-moss-100 px-3 py-2 text-[12px] font-semibold text-moss-500 flex items-center gap-2"><Check size={15} /> Tout est à jour sur cet appareil.</div>}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-paper-100 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-2.5 w-3/4 rounded-full bg-paper-100 animate-pulse" />
              <div className="h-2.5 w-1/3 rounded-full bg-paper-100 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
