import { useEffect, useState } from 'react'
import { X, ZapOff, Images, Circle } from 'lucide-react'
import StatusBar from '../components/StatusBar'

interface ScannerScreenProps {
  onClose: () => void
  onCaptured: () => void
}

export default function ScannerScreen({ onClose, onCaptured }: ScannerScreenProps) {
  const [detecting, setDetecting] = useState(false)
  const [flash, setFlash] = useState(false)
  const [mode, setMode] = useState<'manual' | 'auto'>('auto')

  useEffect(() => {
    const t = setTimeout(() => setDetecting(true), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <StatusBar dark />
      <div className="flex items-center justify-between px-4 pt-2">
        <button onClick={onClose} aria-label="Fermer le scanner">
          <X size={22} />
        </button>
        <button onClick={() => setFlash((value) => !value)} aria-label="Activer le flash">
          <ZapOff size={20} className={flash ? 'text-amber-300' : 'opacity-70'} />
        </button>
      </div>

      <div className="flex-1 relative flex items-center justify-center px-8">
        {!detecting && (
          <span className="absolute top-6 bg-black/60 rounded-full px-4 py-2 text-[12.5px]">
            Cadrez le document dans le repère
          </span>
        )}
        <div className="relative w-full h-[62%] rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] overflow-hidden">
          {detecting && (
            <>
              <div className="absolute inset-4 rounded-xl border-2 border-iris-400 animate-scanpulse" />
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 rounded-full px-4 py-1.5 text-[11.5px] whitespace-nowrap">
                Analyse en cours, veuillez patienter…
              </span>
            </>
          )}
        </div>
      </div>

      <div className="px-8 pb-10 pt-3 flex flex-col items-center gap-5">
        <div className="flex items-center justify-between w-full">
          <button
            onClick={onCaptured}
            className="h-11 w-11 rounded-full border border-white/25 flex items-center justify-center"
            aria-label="Importer une image"
          >
            <Images size={18} />
          </button>
          <button
            onClick={onCaptured}
            aria-label="Capturer"
            className="h-[70px] w-[70px] rounded-full bg-white flex items-center justify-center active:scale-95 transition-transform"
          >
            <Circle size={58} className="text-white fill-white" strokeWidth={1} />
          </button>
          <div className="h-11 w-11" />
        </div>
        <div className="flex items-center gap-1 bg-white/10 rounded-full p-1">
          <button onClick={() => setMode('manual')} className={`px-4 py-1.5 text-[12.5px] rounded-full ${mode === 'manual' ? 'bg-white text-ink-950 font-semibold' : 'text-white/60'}`}>Manuel</button>
          <button onClick={() => setMode('auto')} className={`px-4 py-1.5 text-[12.5px] rounded-full ${mode === 'auto' ? 'bg-white text-ink-950 font-semibold' : 'text-white/60'}`}>
            Capture auto
          </button>
        </div>
        <p className="text-[10.5px] text-white/40 text-center px-6">
          DocSuite n'accède qu'aux pages que vous scannez.
        </p>
      </div>
    </div>
  )
}
