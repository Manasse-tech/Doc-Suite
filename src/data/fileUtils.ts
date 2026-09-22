import type { DocKind } from '../types'

export function getDocKind(name: string): DocKind {
  const extension = name.split('.').pop()?.toLowerCase()
  if (extension === 'pdf') return 'pdf'
  if (extension === 'doc' || extension === 'docx') return 'word'
  if (extension === 'xls' || extension === 'xlsx') return 'excel'
  return 'slide'
}

export function formatBytes(bytes: number): string {
  if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')} Mo`
  return `${Math.max(1, Math.round(bytes / 1024))} Ko`
}
