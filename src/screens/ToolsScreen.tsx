import { useState } from 'react'
import {
  Sparkles,
  TypeOutline,
  Highlighter,
  Signature,
  SplitSquareHorizontal,
  Combine,
  ScanLine,
  FileOutput,
  Images,
  ImageDown,
  FolderCog,
  ShieldCheck,
  ShieldOff,
  Printer,
  Share2,
  DownloadCloud,
  Globe,
  MoonStar,
  ChevronRight,
  Check,
} from 'lucide-react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import type { LibraryNav } from '../types'
import type { ToastTone } from '../components/Toast'

interface ToolsScreenProps {
  onOpenSignature: () => void
  onOpenScanner: () => void
  onNavChange: (nav: LibraryNav) => void
  onNotify: (message: string, tone?: ToastTone) => void
  theme: 'light' | 'dark'
  onThemeChange: (theme: 'light' | 'dark') => void
}

const EDIT_TOOLS = [
  { label: 'Résumé par IA', icon: Sparkles, action: 'unavailable' },
  { label: 'Insérer du texte', icon: TypeOutline, action: 'unavailable' },
  { label: 'Annoter', icon: Highlighter, action: 'unavailable' },
  { label: 'Signature', icon: Signature, action: 'signature' },
  { label: 'Diviser un PDF', icon: SplitSquareHorizontal, action: 'unavailable' },
  { label: 'Fusionner des PDF', icon: Combine, action: 'unavailable' },
]

const CONVERT_TOOLS = [
  { label: 'Scanner un document', icon: ScanLine, action: 'scan' },
  { label: 'Word vers PDF', icon: FileOutput, action: 'unavailable' },
  { label: 'PDF vers image longue', icon: Images, action: 'unavailable' },
  { label: 'Convertir en image', icon: ImageDown, action: 'unavailable' },
]

const MANAGE_TOOLS = [
  { label: 'Gestionnaire de fichiers', icon: FolderCog, action: 'unavailable' },
  { label: 'Protéger par mot de passe', icon: ShieldCheck, action: 'unavailable' },
  { label: 'Déverrouiller un PDF', icon: ShieldOff, action: 'unavailable' },
  { label: 'Imprimer', icon: Printer, action: 'unavailable' },
  { label: 'Partager', icon: Share2, action: 'unavailable' },
  { label: 'Télécharger', icon: DownloadCloud, action: 'unavailable' },
]

function ToolTile({
  label,
  icon: Icon,
  badge,
  disabled = false,
  onClick,
}: {
  label: string
  icon: typeof Sparkles
  badge?: 'new' | 'hot'
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <button onClick={onClick} disabled={disabled} className={`relative flex flex-col items-center gap-2 py-1 ${disabled ? 'cursor-not-allowed opacity-45' : ''}`}>
      {badge && (
        <span
          className={`absolute -top-1 right-1.5 text-white text-[8px] font-bold px-1.5 py-[1px] rounded-full ${
            badge === 'new' ? 'bg-iris-500' : 'bg-rose-500'
          }`}
        >
          {badge === 'new' ? 'Nouveau' : 'Tendance'}
        </span>
      )}
      <div className="h-12 w-12 rounded-2xl bg-paper-100 flex items-center justify-center">
        <Icon size={20} className="text-ink-950/75" strokeWidth={1.8} />
      </div>
      <span className="text-[11.5px] font-medium text-ink-950/80 text-center leading-tight px-1">
        {label}
      </span>
    </button>
  )
}

export default function ToolsScreen({ onOpenSignature, onOpenScanner, onNavChange, onNotify, theme, onThemeChange }: ToolsScreenProps) {
  const [language, setLanguage] = useState(() => localStorage.getItem('docsuite-language') || 'Français')
  const [ethnicity, setEthnicity] = useState(() => localStorage.getItem('docsuite-ethnicity') || 'Non renseignée')
  const [openPreference, setOpenPreference] = useState<'language' | 'ethnicity' | null>(null)
  const languages = ['Français', 'English', 'Português', 'Español', 'Deutsch', 'Baoulé', 'Dioula']
  const ethnicities = ['Non renseignée', 'Baoulé', 'Akan', 'Dioula', 'Bété', 'Sénoufo', 'Guéré', 'Autre']

  const choosePreference = (kind: 'language' | 'ethnicity', value: string) => {
    if (kind === 'language') { setLanguage(value); localStorage.setItem('docsuite-language', value) }
    else { setEthnicity(value); localStorage.setItem('docsuite-ethnicity', value) }
    setOpenPreference(null)
    onNotify(`${kind === 'language' ? 'Langue' : 'Ethnie'} : ${value}`, 'success')
  }

  const handle = (action: string) => {
    if (action === 'signature') onOpenSignature()
    if (action === 'scan') onOpenScanner()
    if (action === 'unavailable') onNotify('Cet outil sera activé avec le moteur PDF du backend.', 'info')
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <div className="px-5 pt-3 pb-2">
        <div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-iris-500">Productivité documentaire</p><h1 className="mt-1 text-[22px] font-display font-semibold text-ink-950">Boîte à outils</h1></div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <section className="px-5 py-4 border-t border-paper-100">
          <h2 className="text-[13px] font-bold text-ink-800/45 uppercase tracking-wide mb-3.5">
            Modifier
          </h2>
          <div className="grid grid-cols-4 gap-y-5 gap-x-2">
            {EDIT_TOOLS.map((t) => (
              <ToolTile key={t.label} {...t} disabled={t.action === 'unavailable'} onClick={() => handle(t.action)} />
            ))}
          </div>
        </section>

        <section className="px-5 py-4 border-t border-paper-100">
          <h2 className="text-[13px] font-bold text-ink-800/45 uppercase tracking-wide mb-3.5">
            Convertir
          </h2>
          <div className="grid grid-cols-4 gap-y-5 gap-x-2">
            {CONVERT_TOOLS.map((t) => (
              <ToolTile key={t.label} {...t} disabled={t.action === 'unavailable'} onClick={() => handle(t.action)} />
            ))}
          </div>
        </section>

        <section className="px-5 py-4 border-t border-paper-100">
          <h2 className="text-[13px] font-bold text-ink-800/45 uppercase tracking-wide mb-3.5">
            Gérer
          </h2>
          <div className="grid grid-cols-4 gap-y-5 gap-x-2">
            {MANAGE_TOOLS.map((t) => (
              <ToolTile key={t.label} {...t} disabled={t.action === 'unavailable'} onClick={() => handle(t.action)} />
            ))}
          </div>
        </section>

        <section className="border-t border-paper-100">
          <button onClick={() => setOpenPreference(openPreference === 'language' ? null : 'language')} className="w-full flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3"><Globe size={18} className="text-iris-500" /><span className="text-[14px] font-medium text-ink-950">Langue</span></div>
            <div className="flex items-center gap-1 text-ink-800/40"><span className="text-[13px]">{language}</span><ChevronRight size={16} className={openPreference === 'language' ? 'rotate-90' : ''} /></div>
          </button>
          {openPreference === 'language' && <div className="grid grid-cols-2 gap-2 px-5 pb-4">{languages.map((item) => <button key={item} onClick={() => choosePreference('language', item)} className="flex items-center justify-between rounded-xl bg-paper-50 px-3 py-2.5 text-left text-[12px] font-semibold text-ink-950">{item}{language === item && <Check size={15} className="text-iris-500" />}</button>)}</div>}
          <button onClick={() => setOpenPreference(openPreference === 'ethnicity' ? null : 'ethnicity')} className="w-full flex items-center justify-between px-5 py-4 border-t border-paper-100">
            <div className="flex items-center gap-3"><span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-teal-500/15 text-[10px] font-bold text-teal-600">A</span><span className="text-[14px] font-medium text-ink-950">Origine culturelle</span></div>
            <div className="flex items-center gap-1 text-ink-800/40"><span className="text-[13px]">{ethnicity}</span><ChevronRight size={16} className={openPreference === 'ethnicity' ? 'rotate-90' : ''} /></div>
          </button>
          {openPreference === 'ethnicity' && <div className="grid grid-cols-2 gap-2 px-5 pb-4">{ethnicities.map((item) => <button key={item} onClick={() => choosePreference('ethnicity', item)} className="flex items-center justify-between rounded-xl bg-paper-50 px-3 py-2.5 text-left text-[12px] font-semibold text-ink-950">{item}{ethnicity === item && <Check size={15} className="text-teal-600" />}</button>)}</div>}
          <button onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')} className="w-full flex items-center justify-between px-5 py-4 border-t border-paper-100">
            <div className="flex items-center gap-3">
              <MoonStar size={18} className="text-ink-950/60" />
              <span className="text-[14px] font-medium text-ink-950">Mode sombre</span>
            </div>
            <span className={`h-5 w-9 rounded-full p-0.5 ${theme === 'dark' ? 'bg-iris-500' : 'bg-paper-200'}`}><span className={`block h-4 w-4 rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-4' : ''}`} /></span>
          </button>
        </section>
      </div>

      <BottomNav active="tools" onChange={onNavChange} />
    </div>
  )
}
