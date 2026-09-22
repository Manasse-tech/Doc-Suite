import { AlertTriangle, X } from 'lucide-react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  danger?: boolean
  onCancel: () => void
  onConfirm: () => void
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirmer',
  danger = false,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  if (!open) return null
  return (
    <div className="absolute inset-0 z-[55] flex items-center justify-center px-5">
      <button aria-label="Fermer la confirmation" onClick={onCancel} className="absolute inset-0 bg-ink-950/45" />
      <div role="dialog" aria-modal="true" aria-labelledby="confirm-title" className="relative w-full rounded-3xl bg-white p-5 shadow-2xl animate-risein">
        <button onClick={onCancel} aria-label="Annuler" className="absolute right-4 top-4 text-ink-800/40"><X size={18} /></button>
        <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-2xl ${danger ? 'bg-rose-100 text-rose-500' : 'bg-iris-100 text-iris-500'}`}>
          <AlertTriangle size={19} />
        </div>
        <h2 id="confirm-title" className="pr-7 text-[16px] font-bold text-ink-950">{title}</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-800/60">{message}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onCancel} className="rounded-full bg-paper-100 px-4 py-2 text-[12.5px] font-semibold text-ink-800/70">Annuler</button>
          <button onClick={onConfirm} className={`rounded-full px-4 py-2 text-[12.5px] font-bold text-white ${danger ? 'bg-rose-500' : 'bg-iris-500'}`}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}
