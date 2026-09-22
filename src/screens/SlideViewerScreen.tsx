import { useState } from 'react'
import { ArrowLeft, UploadCloud, Share2, ChevronLeft, ChevronRight } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import type { DocFile } from '../types'
import type { ToastTone } from '../components/Toast'

interface SlideViewerScreenProps {
  file: DocFile
  onBack: () => void
  onNotify: (message: string, tone?: ToastTone) => void
}

export default function SlideViewerScreen({ file, onBack, onNotify }: SlideViewerScreenProps) {
  const total = file.pages ?? 24
  const [page, setPage] = useState(Math.min(6, total))

  return (
    <div className="flex flex-col h-full bg-paper-100">
      <StatusBar />
      <div className="flex items-center justify-between px-4 py-2">
        <button onClick={onBack} className="text-ink-950/70">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-4 text-ink-950/70">
          <button onClick={() => onNotify('Document marqué pour synchronisation.', 'success')} aria-label="Synchroniser"><UploadCloud size={18} /></button>
          <button onClick={() => onNotify(`Partage local prêt pour ${file.name}.`, 'success')} aria-label="Partager"><Share2 size={18} /></button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-5">
        <div className="w-full aspect-[4/3] bg-white rounded-md shadow-card px-6 py-7 flex flex-col">
          <p className="text-[11px] font-bold text-ink-950/70">
            I — Contexte et enjeux de l'entrepreneuriat
          </p>
          <p className="text-[10px] text-ink-800/50 mt-0.5 pl-2">2) Enjeux · 2-2 Enjeux sociaux</p>
          <div className="flex-1 flex flex-col justify-center gap-2.5 pl-4 mt-2">
            {['Réduction du chômage local', 'Amélioration du bien-être collectif', 'Réduction des inégalités sociales'].map(
              (t) => (
                <div key={t} className="flex items-center gap-2">
                  <span className="text-moss-500 text-[13px]">✓</span>
                  <span className="text-[11.5px] text-ink-950/80">{t}</span>
                </div>
              ),
            )}
          </div>
          <div className="flex items-center justify-between text-[9px] text-ink-800/35 mt-3">
            <span>Session 2</span>
            <span>{page}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-6">
        <div className="flex items-center gap-5">
          <button disabled={page <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} aria-label="Page précédente" className="disabled:opacity-20"><ChevronLeft size={20} /></button>
        <span className="bg-ink-950 text-white text-[11px] font-mono px-3 py-1 rounded-full">
          {page} / {total}
        </span>
          <button disabled={page >= total} onClick={() => setPage((value) => Math.min(total, value + 1))} aria-label="Page suivante" className="disabled:opacity-20"><ChevronRight size={20} /></button>
        </div>
      </div>
    </div>
  )
}
