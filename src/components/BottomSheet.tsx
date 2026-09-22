import type { ReactNode } from 'react'
import { X } from 'lucide-react'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

export default function BottomSheet({ open, onClose, children, title }: BottomSheetProps) {
  if (!open) return null
  return (
    <div className="absolute inset-0 z-30">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/40 animate-[risein_0.2s_ease-out_both]"
      />
      <div className="absolute bottom-0 left-0 right-0 rounded-t-[28px] bg-white shadow-2xl animate-sheetup max-h-[85%] flex flex-col">
        <div className="flex items-center justify-center pt-3 pb-1 relative">
          <div className="h-1 w-9 rounded-full bg-ink-950/15" />
          {title && (
            <button onClick={onClose} className="absolute right-4 top-2.5 text-ink-800/40">
              <X size={18} />
            </button>
          )}
        </div>
        {title && (
          <p className="px-5 pb-2 pt-1 text-[13px] font-bold uppercase tracking-wide text-ink-800/40">
            {title}
          </p>
        )}
        <div className="overflow-y-auto no-scrollbar pb-6">{children}</div>
      </div>
    </div>
  )
}
