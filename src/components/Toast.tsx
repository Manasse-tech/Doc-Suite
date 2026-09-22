import { Check, Info, X } from 'lucide-react'
import type { ReactNode } from 'react'

export type ToastTone = 'success' | 'error' | 'info'

interface ToastProps {
  tone: ToastTone
  message: string
  onClose: () => void
}

const ICONS: Record<ToastTone, ReactNode> = {
  success: <Check size={16} />,
  error: <X size={16} />,
  info: <Info size={16} />,
}

export default function Toast({ tone, message, onClose }: ToastProps) {
  return (
    <div
      role="status"
      className={`toast fixed bottom-5 left-4 right-4 z-[60] flex items-center gap-2 rounded-2xl px-4 py-3 text-[13px] font-semibold text-white shadow-2xl ${
        tone === 'success' ? 'bg-moss-500' : tone === 'error' ? 'bg-rose-500' : 'bg-ink-900'
      }`}
    >
      {ICONS[tone]}
      <span className="min-w-0 flex-1">{message}</span>
      <button onClick={onClose} aria-label="Fermer la notification" className="opacity-70 hover:opacity-100">
        <X size={15} />
      </button>
    </div>
  )
}
