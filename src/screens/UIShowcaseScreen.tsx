import { useState } from 'react'
import { ArrowLeft, FileText, Upload, Sparkles, Combine, ScanLine, PenLine, LoaderCircle, Check } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import type { ToastTone } from '../components/Toast'

interface UIShowcaseScreenProps {
  onBack: () => void
  onImportFiles: (files: FileList | File[]) => void
  onNotify: (message: string, tone?: ToastTone) => void
}

const TOOLS = [
  { label: 'Importer', icon: Upload, active: true },
  { label: 'Scanner', icon: ScanLine, active: true },
  { label: 'Signer', icon: PenLine, active: true },
  { label: 'Fusionner', icon: Combine, active: false },
]

export default function UIShowcaseScreen({ onBack, onImportFiles, onNotify }: UIShowcaseScreenProps) {
  const [processing, setProcessing] = useState(false)
  const [processed, setProcessed] = useState(false)

  const simulateProcessing = () => {
    setProcessing(true)
    setProcessed(false)
    window.setTimeout(() => { setProcessing(false); setProcessed(true); onNotify('Animation de traitement terminée.', 'success') }, 900)
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-paper-50">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 py-3">
        <button onClick={onBack} aria-label="Retour" className="text-ink-950/70"><ArrowLeft size={20} /></button>
        <div><p className="text-[11px] font-semibold uppercase tracking-wider text-iris-500">UIShowcase</p><h1 className="text-[19px] font-display font-semibold text-ink-950">PDF, en mieux</h1></div>
      </div>
      <main className="space-y-4 px-4 pb-8">
        <section className="showcase-hero relative overflow-hidden rounded-3xl bg-ink-950 p-5 text-white shadow-pop">
          <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-iris-500/40 blur-3xl" />
          <Sparkles size={20} className="text-iris-300" />
          <h2 className="mt-4 max-w-[270px] text-[27px] font-display font-semibold leading-tight">Votre espace PDF, clair et rapide.</h2>
          <p className="mt-2 max-w-[280px] text-[12px] leading-relaxed text-white/60">Une base visuelle pour les futurs écrans, avec des états lisibles et des effets mesurés.</p>
          <label htmlFor="showcase-import" className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[12px] font-bold text-ink-950"><Upload size={15} /> Importer un PDF</label>
          <input id="showcase-import" type="file" accept=".pdf" className="hidden" onChange={(event) => { if (event.target.files) onImportFiles(event.target.files); event.currentTarget.value = '' }} />
        </section>

        <section className="rounded-3xl border border-paper-200 bg-white p-4 shadow-card">
          <div className="flex items-start gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-500"><FileText size={20} /></div><div className="min-w-0 flex-1"><p className="truncate text-[14px] font-bold text-ink-950">Document de démonstration.pdf</p><p className="mt-1 text-[11px] text-ink-800/45">PDF · 2,4 Mo · prêt à traiter</p></div><span className="rounded-full bg-moss-100 px-2 py-1 text-[10px] font-bold text-moss-500">Prêt</span></div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-paper-100"><div className={`h-full rounded-full bg-iris-500 transition-all duration-700 ${processing ? 'w-2/3' : processed ? 'w-full' : 'w-1/4'}`} /></div>
          <button onClick={simulateProcessing} disabled={processing} className="mt-4 flex items-center gap-2 rounded-full bg-iris-500 px-3 py-2 text-[11px] font-bold text-white disabled:opacity-60">{processing ? <LoaderCircle size={14} className="animate-spin" /> : processed ? <Check size={14} /> : <Sparkles size={14} />} {processing ? 'Traitement…' : processed ? 'Terminé' : 'Tester le traitement'}</button>
        </section>

        <section><p className="mb-2 px-1 text-[12px] font-bold uppercase tracking-wider text-ink-800/45">Outils</p><div className="grid grid-cols-4 gap-2">{TOOLS.map(({ label, icon: Icon, active }) => <button key={label} disabled={!active} onClick={() => onNotify(active ? `${label} est prêt dans cette démonstration.` : `${label} nécessite le moteur backend.`, active ? 'success' : 'info')} className={`flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-2xl border bg-white p-2 shadow-card ${active ? 'border-paper-200' : 'cursor-not-allowed border-dashed border-paper-200 opacity-45'}`}><Icon size={19} className="text-iris-500" /><span className="text-center text-[10.5px] font-semibold text-ink-950">{label}</span></button>)}</div></section>
      </main>
    </div>
  )
}
