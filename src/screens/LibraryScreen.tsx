import { useMemo, useState } from 'react'
import { ScanLine, Sparkles } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import TopBar from '../components/TopBar'
import LibraryTabs from '../components/LibraryTabs'
import FileRow from '../components/FileRow'
import BottomNav from '../components/BottomNav'
import type { DocFile, LibraryNav, LibraryTab } from '../types'
import type { ToastTone } from '../components/Toast'

interface LibraryScreenProps {
  files: DocFile[]
  onOpenFile: (file: DocFile) => void
  onMoreFile: (file: DocFile) => void
  onToggleFavorite: (id: string) => void
  onOpenAccount: () => void
  onOpenSync: () => void
  onOpenScanner: () => void
  onNavChange: (nav: LibraryNav) => void
  activeNav: LibraryNav
  recentIds: string[]
  onNotify: (message: string, tone?: ToastTone) => void
  onImportFiles: (files: FileList | File[]) => void
  storageReady: boolean
}

export default function LibraryScreen({
  files,
  onOpenFile,
  onMoreFile,
  onToggleFavorite,
  onOpenAccount,
  onOpenSync,
  onOpenScanner,
  onNavChange,
  activeNav,
  recentIds,
  onNotify,
  onImportFiles,
  storageReady,
}: LibraryScreenProps) {
  const [tab, setTab] = useState<LibraryTab>('pdf')
  const [search, setSearch] = useState('')
  const [dragging, setDragging] = useState(false)

  const visible = useMemo(() => {
    let list = files.filter((f) => f.kind === tab)
    if (activeNav === 'favorites') list = files.filter((f) => f.favorite)
    if (activeNav === 'recent') {
      const recent = new Map(recentIds.map((id, index) => [id, index]))
      list = files.filter((file) => recent.has(file.id)).sort((a, b) => (recent.get(a.id) ?? 0) - (recent.get(b.id) ?? 0))
    }
    if (search.trim()) {
      const query = search.trim().toLocaleLowerCase('fr-FR')
      list = list.filter((file) => file.name.toLocaleLowerCase('fr-FR').includes(query))
    }
    return list
  }, [files, tab, activeNav, search, recentIds])

  return (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />
      <TopBar
        onOpenAccount={onOpenAccount}
        onOpenSync={onOpenSync}
        search={search}
        onSearchChange={setSearch}
        onNotify={onNotify}
      />
      {activeNav === 'files' && <LibraryTabs active={tab} onChange={setTab} />}
      {activeNav !== 'files' && (
        <div className="px-4 py-2.5 border-b border-ink-950/[0.06]">
          <p className="text-[14px] font-bold text-ink-950">
            {activeNav === 'recent' ? 'Récemment ouverts' : 'Vos favoris'}
          </p>
        </div>
      )}

      <div
        className={`flex-1 overflow-y-auto no-scrollbar relative ${dragging ? 'ring-2 ring-inset ring-iris-500 bg-iris-100/30' : ''}`}
        onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => { event.preventDefault(); setDragging(false); onImportFiles(event.dataTransfer.files) }}
      >
        <input id="file-import" type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" className="hidden" onChange={(event) => { if (event.target.files) onImportFiles(event.target.files); event.currentTarget.value = '' }} />
        <div className="mx-4 my-3 rounded-2xl border border-dashed border-ink-950/10 bg-paper-50 px-4 py-3 flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-iris-100 flex items-center justify-center shrink-0">
            <Sparkles size={18} className="text-iris-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12.5px] font-semibold text-ink-950">
              Essayez le résumé par IA
            </p>
            <p className="text-[11px] text-ink-800/45">
              Obtenez l'essentiel d'un document en 10 secondes
            </p>
          </div>
          <button
            onClick={() => onNotify('Sélectionnez un document pour préparer son résumé.', 'info')}
            className="shrink-0 rounded-full bg-iris-500 px-3 py-1.5 text-[11px] font-bold text-white"
          >
            Essayer
          </button>
        </div>
        <div className="mx-4 mb-2 flex items-center justify-between rounded-xl bg-paper-50 px-3 py-2">
          <span className="text-[11px] text-ink-800/45">Importez depuis votre appareil</span>
          <label htmlFor="file-import" className="cursor-pointer rounded-full bg-ink-950 px-3 py-1.5 text-[11px] font-bold text-white">Importer</label>
        </div>

        {!storageReady && (
          <div className="space-y-3 px-4 py-5" aria-live="polite" aria-label="Chargement des documents">
            {[...Array(4)].map((_, index) => <div key={index} className="flex items-center gap-3"><div className="h-11 w-11 animate-pulse rounded-xl bg-paper-100" /><div className="flex-1 space-y-2"><div className="h-3 w-3/4 animate-pulse rounded-full bg-paper-100" /><div className="h-2.5 w-1/3 animate-pulse rounded-full bg-paper-100" /></div></div>)}
          </div>
        )}

        {storageReady && visible.length === 0 && (
          <div className="px-8 py-16 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-100 text-ink-800/40"><ScanLine size={20} /></div>
            <p className="text-[13.5px] text-ink-800/40">
              {search ? 'Aucun document ne correspond à votre recherche.' : 'Aucun document ici pour le moment.'}
            </p>
          </div>
        )}

        <div className="pb-2">
          {visible.map((f) => (
            <FileRow
              key={f.id}
              file={f}
              onOpen={onOpenFile}
              onMore={onMoreFile}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>

        <button
          onClick={onOpenScanner}
          aria-label="Scanner un document"
          className="absolute bottom-5 right-4 h-14 w-14 rounded-full bg-iris-500 shadow-pop flex items-center justify-center active:scale-95 transition-transform"
        >
          <ScanLine size={22} className="text-white" strokeWidth={2.2} />
        </button>
      </div>

      <BottomNav active={activeNav} onChange={onNavChange} />
    </div>
  )
}
