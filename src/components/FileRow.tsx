import { Star, MoreVertical } from 'lucide-react'
import FileIcon from './FileIcon'
import type { DocFile } from '../types'

interface FileRowProps {
  file: DocFile
  onOpen: (file: DocFile) => void
  onMore: (file: DocFile) => void
  onToggleFavorite: (id: string) => void
}

export default function FileRow({ file, onOpen, onMore, onToggleFavorite }: FileRowProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(file)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') onOpen(file)
      }}
      className="w-full flex items-center gap-3 px-4 py-2.5 active:bg-paper-100/80 transition-colors text-left"
    >
      <FileIcon kind={file.kind} />
      <div className="flex-1 min-w-0">
        <p className="text-[14.5px] font-semibold text-ink-950 leading-snug line-clamp-2">
          {file.name}
        </p>
        <p className="text-[12px] text-ink-800/45 mt-0.5">
          {file.date} · {file.size}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onToggleFavorite(file.id)
        }}
        aria-label="Marquer comme favori"
        className="p-1.5"
      >
        <Star
          size={18}
          className={file.favorite ? 'fill-iris-500 text-iris-500' : 'text-ink-800/25'}
        />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onMore(file)
        }}
        aria-label="Plus d'options"
        className="p-1.5 -ml-1"
      >
        <MoreVertical size={17} className="text-ink-800/45" />
      </button>
    </div>
  )
}
