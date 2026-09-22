import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Download, Share2, FileWarning, ChevronLeft, ChevronRight } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import type { DocFile } from '../types'
import type { ToastTone } from '../components/Toast'

interface PdfViewerScreenProps {
  file: DocFile
  onBack: () => void
  onNotify: (message: string, tone?: ToastTone) => void
  onExport: (file: DocFile) => void
}

export default function PdfViewerScreen({ file, onBack, onNotify, onExport }: PdfViewerScreenProps) {
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!file.asset) {
      setLoading(false)
      return
    }
    const asset = file.asset
    let cancelled = false
    setLoading(true)
    setFailed(false)
    void (async () => {
      try {
        const pdfjsLib = await import('pdfjs-dist')
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()
        const pdf = await pdfjsLib.getDocument({ data: await asset.arrayBuffer() }).promise
        if (cancelled) { await pdf.destroy(); return }
        setPageCount(pdf.numPages)
        const page = await pdf.getPage(pageNumber)
        const baseViewport = page.getViewport({ scale: 1 })
        const width = viewportRef.current?.clientWidth ?? 340
        const cssScale = Math.max(0.5, (width - 24) / baseViewport.width)
        const pixelRatio = Math.min(3, Math.max(1, window.devicePixelRatio || 1))
        const viewport = page.getViewport({ scale: cssScale * pixelRatio })
        const canvas = canvasRef.current
        if (!canvas || cancelled) { await pdf.destroy(); return }
        canvas.width = viewport.width
        canvas.height = viewport.height
        canvas.style.width = `${viewport.width / pixelRatio}px`
        canvas.style.height = `${viewport.height / pixelRatio}px`
        await page.render({ canvasContext: canvas.getContext('2d')!, viewport }).promise
        if (!cancelled) setLoading(false)
        await pdf.destroy()
      } catch {
        if (!cancelled) { setLoading(false); setFailed(true) }
      }
    })()
    return () => { cancelled = true }
  }, [file.asset, pageNumber])

  return (
    <div className="flex h-full flex-col bg-paper-100">
      <StatusBar />
      <div className="flex items-center justify-between px-4 py-2.5">
        <button onClick={onBack} aria-label="Retour" className="text-ink-950/70"><ArrowLeft size={20} /></button>
        <p className="min-w-0 flex-1 truncate px-3 text-center text-[13px] font-semibold text-ink-950">{file.name}</p>
        <div className="flex items-center gap-3 text-ink-950/70">
          <button onClick={() => onNotify('Partage local prêt.', 'success')} aria-label="Partager"><Share2 size={18} /></button>
          <button onClick={() => onExport(file)} aria-label="Exporter"><Download size={18} /></button>
        </div>
      </div>
      <div className="relative flex-1 overflow-hidden bg-ink-800/10">
        {file.asset && !failed && <div ref={viewportRef} className="flex h-full items-start justify-center overflow-auto p-3"><canvas ref={canvasRef} className="max-w-full rounded-md bg-white shadow-card" /></div>}
        {loading && file.asset && <div className="absolute inset-0 flex items-center justify-center bg-paper-100/90"><div className="rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-ink-800/60 shadow-card">Chargement du PDF…</div></div>}
        {(!file.asset || failed) && (
          <div className="flex h-full flex-col items-center justify-center px-8 text-center">
            <FileWarning size={28} className="mb-3 text-amber-500" />
            <p className="text-[14px] font-semibold text-ink-950">Aperçu indisponible</p>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-800/50">Ce document ne contient pas encore de binaire local. Exportez-le ou importez à nouveau le PDF pour l’afficher.</p>
            <button onClick={() => onExport(file)} className="mt-4 rounded-full bg-iris-500 px-4 py-2 text-[12px] font-bold text-white">Exporter</button>
          </div>
        )}
      </div>
      {file.asset && !failed && pageCount > 0 && <div className="flex items-center justify-center gap-5 border-t border-paper-200 bg-white py-2"><button disabled={pageNumber <= 1} onClick={() => setPageNumber((value) => Math.max(1, value - 1))} aria-label="Page précédente" className="disabled:opacity-25"><ChevronLeft size={18} /></button><span className="font-mono text-[11px] text-ink-800/60">{pageNumber} / {pageCount}</span><button disabled={pageNumber >= pageCount} onClick={() => setPageNumber((value) => Math.min(pageCount, value + 1))} aria-label="Page suivante" className="disabled:opacity-25"><ChevronRight size={18} /></button></div>}
    </div>
  )
}
