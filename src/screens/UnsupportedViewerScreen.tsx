import { ArrowLeft, Download, FileText } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import type { DocFile } from '../types'

interface UnsupportedViewerScreenProps {
  file: DocFile
  onBack: () => void
  onExport: (file: DocFile) => void
}

export default function UnsupportedViewerScreen({ file, onBack, onExport }: UnsupportedViewerScreenProps) {
  return (
    <div className="flex h-full flex-col bg-paper-50">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 py-2.5">
        <button onClick={onBack} aria-label="Retour" className="text-ink-950/70"><ArrowLeft size={20} /></button>
        <p className="truncate text-[14px] font-semibold text-ink-950">{file.name}</p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-iris-100 text-iris-500"><FileText size={28} /></div>
        <h1 className="text-[17px] font-bold text-ink-950">Aperçu à venir</h1>
        <p className="mt-2 text-[12.5px] leading-relaxed text-ink-800/55">Le format {file.kind === 'word' ? 'Word' : 'PowerPoint'} est bien importé, mais son rendu nécessite le moteur de conversion du backend.</p>
        <button onClick={() => onExport(file)} className="mt-5 flex items-center gap-2 rounded-full bg-ink-950 px-4 py-2.5 text-[12px] font-bold text-white"><Download size={15} /> Télécharger le fichier</button>
      </div>
    </div>
  )
}
