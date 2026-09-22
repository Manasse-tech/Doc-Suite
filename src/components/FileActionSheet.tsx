import { Info, PenLine, Lock, Share2, CloudUpload, Download, Trash2 } from 'lucide-react'
import BottomSheet from './BottomSheet'
import ConfirmDialog from './ConfirmDialog'
import InputDialog from './InputDialog'
import { useEffect, useState } from 'react'
import FileIcon from './FileIcon'
import type { DocFile } from '../types'
import type { ToastTone } from './Toast'

interface FileActionSheetProps {
  file: DocFile | null
  onClose: () => void
  onDelete: (id: string) => void
  onRename: (id: string, name: string) => void
  onNotify: (message: string, tone?: ToastTone) => void
  onExport: (file: DocFile) => void
}

const ACTIONS = [
  { id: 'details', label: 'Détails', icon: Info },
  { id: 'rename', label: 'Renommer', icon: PenLine },
  { id: 'password', label: 'Protéger par mot de passe', icon: Lock },
  { id: 'share', label: 'Partager', icon: Share2 },
  { id: 'upload', label: 'Envoyer vers le cloud', icon: CloudUpload },
  { id: 'export', label: 'Exporter sur l’appareil', icon: Download },
]

export default function FileActionSheet({ file, onClose, onDelete, onRename, onNotify, onExport }: FileActionSheetProps) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [inputMode, setInputMode] = useState<'rename' | 'password' | null>(null)
  useEffect(() => {
    if (!file) {
      setConfirmDelete(false)
      setInputMode(null)
    }
  }, [file])
  return (
    <BottomSheet open={!!file} onClose={onClose}>
      {file && (
        <>
          <div className="mx-4 mb-2 mt-1 flex items-center gap-3 rounded-2xl bg-paper-50 px-3.5 py-3">
            <FileIcon kind={file.kind} size="lg" />
            <div className="min-w-0">
              <p className="text-[14.5px] font-bold text-ink-950 line-clamp-2">{file.name}</p>
              <p className="text-[11.5px] text-ink-800/45 mt-0.5">{file.date}</p>
            </div>
          </div>
          <div className="mt-2">
            {ACTIONS.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  if (a.id === 'details') {
                    onNotify(`${file.name} · ${file.kind.toUpperCase()} · ${file.size}`, 'info')
                  } else if (a.id === 'rename') {
                    setInputMode('rename')
                    return
                  } else if (a.id === 'password') {
                    setInputMode('password')
                    return
                  } else if (a.id === 'share') {
                    void navigator.clipboard?.writeText(file.name)
                    onNotify('Nom du document copié. Le partage cloud sera ajouté plus tard.', 'success')
                  } else if (a.id === 'upload') {
                    onNotify('Document prêt pour la synchronisation.', 'success')
                  } else if (a.id === 'export') {
                    onExport(file)
                  }
                  onClose()
                }}
                className="w-full flex items-center gap-4 px-5 py-3.5 active:bg-paper-100"
              >
                <a.icon size={19} className="text-ink-950/70" strokeWidth={2} />
                <span className="text-[14.5px] font-medium text-ink-950">{a.label}</span>
              </button>
            ))}
            <button
              onClick={() => {
                setConfirmDelete(true)
              }}
              className="w-full flex items-center gap-4 px-5 py-3.5 active:bg-rose-100/40"
            >
              <Trash2 size={19} className="text-rose-500" strokeWidth={2} />
              <span className="text-[14.5px] font-medium text-rose-500">Supprimer</span>
            </button>
            <ConfirmDialog
              open={confirmDelete}
              title="Supprimer ce document ?"
              message="Le document sera retiré de cet appareil. Cette action est irréversible dans la version locale."
              danger
              confirmLabel="Supprimer"
              onCancel={() => setConfirmDelete(false)}
              onConfirm={() => { onDelete(file.id); setConfirmDelete(false); onClose(); onNotify('Document supprimé.', 'success') }}
            />
            <InputDialog
              open={inputMode !== null}
              title={inputMode === 'rename' ? 'Renommer le document' : 'Protéger le document'}
              message={inputMode === 'rename' ? 'Choisissez un nom facile à retrouver.' : 'Cette protection est locale dans la version actuelle.'}
              initialValue={inputMode === 'rename' ? file.name : ''}
              placeholder={inputMode === 'rename' ? 'Nom du document' : 'Mot de passe'}
              type={inputMode === 'password' ? 'password' : 'text'}
              confirmLabel={inputMode === 'rename' ? 'Renommer' : 'Protéger'}
              onCancel={() => setInputMode(null)}
              onConfirm={(value) => {
                if (inputMode === 'rename') onRename(file.id, value)
                else onNotify('Protection locale activée pour cette session.', 'success')
                setInputMode(null)
                onClose()
              }}
            />
          </div>
        </>
      )}
    </BottomSheet>
  )
}
