import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

interface InputDialogProps {
  open: boolean
  title: string
  message: string
  initialValue?: string
  placeholder?: string
  type?: 'text' | 'password'
  confirmLabel?: string
  onCancel: () => void
  onConfirm: (value: string) => void
}

export default function InputDialog({ open, title, message, initialValue = '', placeholder, type = 'text', confirmLabel = 'Valider', onCancel, onConfirm }: InputDialogProps) {
  const [value, setValue] = useState(initialValue)
  useEffect(() => { if (open) setValue(initialValue) }, [open, initialValue])
  if (!open) return null
  return (
    <div className="absolute inset-0 z-[58] flex items-center justify-center px-5">
      <button aria-label="Fermer la fenêtre" onClick={onCancel} className="absolute inset-0 bg-ink-950/45" />
      <form role="dialog" aria-modal="true" onSubmit={(event) => { event.preventDefault(); if (value.trim()) onConfirm(value.trim()) }} className="relative w-full rounded-3xl bg-white p-5 shadow-2xl animate-risein">
        <button type="button" onClick={onCancel} aria-label="Annuler" className="absolute right-4 top-4 text-ink-800/40"><X size={18} /></button>
        <h2 className="pr-7 text-[16px] font-bold text-ink-950">{title}</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-800/60">{message}</p>
        <input autoFocus type={type} value={value} onChange={(event) => setValue(event.target.value)} placeholder={placeholder} className="mt-4 h-11 w-full rounded-xl bg-paper-100 px-3 text-[13px] text-ink-950 outline-none ring-iris-500 focus:ring-2" />
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="rounded-full bg-paper-100 px-4 py-2 text-[12.5px] font-semibold text-ink-800/70">Annuler</button>
          <button type="submit" className="rounded-full bg-iris-500 px-4 py-2 text-[12.5px] font-bold text-white">{confirmLabel}</button>
        </div>
      </form>
    </div>
  )
}
