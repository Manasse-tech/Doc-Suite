import { useEffect, useState } from 'react'
import PhoneShell from './components/PhoneShell'
import SplashScreen from './screens/SplashScreen'
import TodayScreen from './screens/TodayScreen'
import LibraryScreen from './screens/LibraryScreen'
import ToolsScreen from './screens/ToolsScreen'
import SignatureScreen from './screens/SignatureScreen'
import ScannerScreen from './screens/ScannerScreen'
import ScanReviewScreen from './screens/ScanReviewScreen'
import AccountScreen from './screens/AccountScreen'
import SyncScreen from './screens/SyncScreen'
import SlideViewerScreen from './screens/SlideViewerScreen'
import SheetViewerScreen from './screens/SheetViewerScreen'
import PdfViewerScreen from './screens/PdfViewerScreen'
import UnsupportedViewerScreen from './screens/UnsupportedViewerScreen'
import UIShowcaseScreen from './screens/UIShowcaseScreen'
import FileActionSheet from './components/FileActionSheet'
import Toast, { type ToastTone } from './components/Toast'
import { mockFiles } from './data/mockFiles'
import { readFiles, writeFiles } from './data/storage'
import { formatBytes, getDocKind } from './data/fileUtils'
import type { DocFile, LibraryNav, ScreenId } from './types'

export default function App() {
  const [screen, setScreen] = useState<ScreenId>('splash')
  const [nav, setNav] = useState<LibraryNav>('files')
  const [files, setFiles] = useState<DocFile[]>(mockFiles)
  const [storageReady, setStorageReady] = useState(false)
  const [recentIds, setRecentIds] = useState<string[]>(() => JSON.parse(localStorage.getItem('docsuite-recent') ?? '[]'))
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('docsuite-theme') as 'light' | 'dark') || 'light')
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null)
  const [activeFile, setActiveFile] = useState<DocFile | null>(null)
  const [sheetFile, setSheetFile] = useState<DocFile | null>(null)

  useEffect(() => {
    let cancelled = false
    void readFiles().then((saved) => {
      if (cancelled) return
      if (saved) setFiles(saved)
      else {
        try {
          const legacy = localStorage.getItem('docsuite-files')
          if (legacy) setFiles(JSON.parse(legacy) as DocFile[])
        } catch {
          setFiles(mockFiles)
        }
      }
      setStorageReady(true)
    })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('docsuite-theme', theme)
  }, [theme])

  useEffect(() => {
    if (!storageReady) return
    const timer = window.setTimeout(() => { void writeFiles(files) }, 250)
    return () => window.clearTimeout(timer)
  }, [files, storageReady])

  useEffect(() => {
    localStorage.setItem('docsuite-recent', JSON.stringify(recentIds))
  }, [recentIds])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const notify = (message: string, tone: ToastTone = 'info') => setToast({ message, tone })

  const toggleFavorite = (id: string) =>
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, favorite: !f.favorite } : f)))

  const deleteFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id))

  const renameFile = (id: string, name: string) =>
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)))

  const addScannedFile = (name: string) => {
    const file: DocFile = {
      id: `scan-${Date.now()}`,
      name: name.trim() || 'Document scanné',
      kind: 'pdf',
      date: new Intl.DateTimeFormat('fr-FR').format(new Date()),
      size: '1,2 Mo',
      favorite: false,
      pages: 1,
    }
    setFiles((prev) => [file, ...prev])
  }

  const importFiles = (incoming: FileList | File[]) => {
    const imported = Array.from(incoming).map<DocFile>((file) => {
      return {
        id: `local-${crypto.randomUUID()}`,
        name: file.name,
        kind: getDocKind(file.name),
        date: new Intl.DateTimeFormat('fr-FR').format(new Date()),
        size: formatBytes(file.size),
        favorite: false,
        asset: file,
      }
    })
    if (imported.length) {
      setFiles((prev) => [...imported, ...prev])
      notify(`${imported.length} document${imported.length > 1 ? 's' : ''} importé${imported.length > 1 ? 's' : ''}.`, 'success')
    }
  }

  const openFile = (file: DocFile) => {
    setActiveFile(file)
    setRecentIds((prev) => [file.id, ...prev.filter((id) => id !== file.id)].slice(0, 12))
    setScreen(file.kind === 'excel' ? 'viewer-sheet' : file.kind === 'pdf' ? 'viewer-pdf' : file.kind === 'slide' ? 'viewer-slide' : 'viewer-document')
  }

  const exportFile = (file: DocFile) => {
    const blob = file.asset ?? new Blob([`${file.name}\n${file.kind.toUpperCase()} · ${file.size}`], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = file.name
    anchor.click()
    URL.revokeObjectURL(url)
    notify('Export prêt.', 'success')
  }

  return (
    <PhoneShell>
      <div className="relative h-full w-full">
        <div key={screen} className="page-enter h-full">
        {screen === 'splash' && <SplashScreen onDone={() => setScreen('today')} />}

        {screen === 'today' && <TodayScreen onEnterLibrary={() => setScreen('library')} />}

        {screen === 'library' && (
          <LibraryScreen
            files={files}
            activeNav={nav}
            onNavChange={(n) => {
              setNav(n)
              setScreen(n === 'tools' ? 'tools' : 'library')
            }}
            onOpenFile={openFile}
            onMoreFile={setSheetFile}
            onToggleFavorite={toggleFavorite}
            onOpenAccount={() => setScreen('account')}
            onOpenSync={() => setScreen('sync')}
            onOpenScanner={() => setScreen('scanner')}
            recentIds={recentIds}
            onNotify={notify}
            onImportFiles={importFiles}
            storageReady={storageReady}
          />
        )}

        {screen === 'tools' && (
          <ToolsScreen
            onOpenSignature={() => setScreen('signature')}
            onOpenScanner={() => setScreen('scanner')}
            onNavChange={(n) => {
              setNav(n)
              setScreen(n === 'tools' ? 'tools' : 'library')
            }}
            onNotify={notify}
            theme={theme}
            onThemeChange={(nextTheme) => {
              setTheme(nextTheme)
              notify(nextTheme === 'dark' ? 'Mode sombre activé.' : 'Mode clair activé.', 'success')
            }}
            onOpenShowcase={() => setScreen('showcase')}
          />
        )}

        {screen === 'showcase' && <UIShowcaseScreen onBack={() => setScreen('tools')} onImportFiles={importFiles} onNotify={notify} />}

        {screen === 'signature' && (
          <SignatureScreen
            onClose={() => {
              setScreen('tools')
              setNav('tools')
            }}
          />
        )}

        {screen === 'scanner' && (
          <ScannerScreen
            onClose={() => setScreen(nav === 'tools' ? 'tools' : 'library')}
            onCaptured={() => setScreen('scan-review')}
          />
        )}

        {screen === 'scan-review' && (
          <ScanReviewScreen
            onBack={() => setScreen('scanner')}
            onDone={(name) => {
              addScannedFile(name)
              setScreen('library')
              setNav('files')
            }}
          />
        )}

        {screen === 'account' && (
          <AccountScreen
            onBack={() => setScreen('library')}
            theme={theme}
            onThemeChange={setTheme}
            onNotify={notify}
            onLogout={() => {
              void writeFiles(mockFiles)
              setFiles(mockFiles)
              setScreen('today')
              notify('Session locale réinitialisée.', 'success')
            }}
          />
        )}
        {screen === 'sync' && <SyncScreen onBack={() => setScreen('library')} />}

        {screen === 'viewer-slide' && activeFile && (
          <SlideViewerScreen file={activeFile} onBack={() => setScreen('library')} onNotify={notify} />
        )}
        {screen === 'viewer-pdf' && activeFile && (
          <PdfViewerScreen file={activeFile} onBack={() => setScreen('library')} onNotify={notify} onExport={exportFile} />
        )}
        {screen === 'viewer-document' && activeFile && (
          <UnsupportedViewerScreen file={activeFile} onBack={() => setScreen('library')} onExport={exportFile} />
        )}
        {screen === 'viewer-sheet' && activeFile && (
          <SheetViewerScreen file={activeFile} onBack={() => setScreen('library')} />
        )}
        </div>

        <FileActionSheet
          file={sheetFile}
          onClose={() => setSheetFile(null)}
          onDelete={deleteFile}
          onRename={renameFile}
          onNotify={notify}
          onExport={exportFile}
        />
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </div>
    </PhoneShell>
  )
}
