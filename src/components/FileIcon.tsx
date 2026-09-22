import { FileText, Sheet, Presentation } from 'lucide-react'
import type { DocKind } from '../types'

const KIND_STYLES: Record<
  DocKind,
  { bg: string; fg: string; ring: string; icon: typeof FileText; label: string }
> = {
  pdf: { bg: 'bg-rose-100', fg: 'text-rose-500', ring: 'ring-rose-500/15', icon: FileText, label: 'PDF' },
  word: { bg: 'bg-azure-100', fg: 'text-azure-500', ring: 'ring-azure-500/15', icon: FileText, label: 'DOC' },
  excel: { bg: 'bg-moss-100', fg: 'text-moss-500', ring: 'ring-moss-500/15', icon: Sheet, label: 'TAB' },
  slide: { bg: 'bg-amber-100', fg: 'text-amber-500', ring: 'ring-amber-500/15', icon: Presentation, label: 'SLD' },
}

interface FileIconProps {
  kind: DocKind
  size?: 'sm' | 'lg'
}

export default function FileIcon({ kind, size = 'sm' }: FileIconProps) {
  const s = KIND_STYLES[kind]
  const Icon = s.icon
  const dims = size === 'lg' ? 'h-14 w-14 rounded-2xl' : 'h-11 w-11 rounded-xl'
  const iconSize = size === 'lg' ? 22 : 18

  return (
    <div
      className={`relative shrink-0 ${dims} ${s.bg} ring-1 ${s.ring} flex items-center justify-center`}
    >
      <Icon size={iconSize} className={s.fg} strokeWidth={2} />
      <span
        className={`absolute -top-1 -left-1 px-1 h-4 rounded-md ${s.fg} bg-white text-[8px] font-bold flex items-center justify-center ring-1 ring-black/5`}
      >
        {s.label}
      </span>
    </div>
  )
}

export { KIND_STYLES }
