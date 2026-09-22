export type DocKind = 'pdf' | 'word' | 'excel' | 'slide'

export interface DocFile {
  id: string
  name: string
  kind: DocKind
  date: string
  size: string
  favorite: boolean
  pages?: number
  asset?: Blob
}

export type ScreenId =
  | 'splash'
  | 'today'
  | 'library'
  | 'tools'
  | 'showcase'
  | 'signature'
  | 'scanner'
  | 'scan-detect'
  | 'scan-review'
  | 'account'
  | 'sync'
  | 'viewer-slide'
  | 'viewer-pdf'
  | 'viewer-document'
  | 'viewer-sheet'

export type LibraryTab = DocKind
export type LibraryNav = 'files' | 'recent' | 'favorites' | 'tools'

export interface ToolItem {
  id: string
  label: string
  badge?: 'new' | 'hot'
  icon: string
}
