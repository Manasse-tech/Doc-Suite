import { ArrowLeft, CloudUpload, ChevronDown, Check } from 'lucide-react'
import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import type { ToastTone } from '../components/Toast'
import ConfirmDialog from '../components/ConfirmDialog'

interface AccountScreenProps {
  onBack: () => void
  onLogout: () => void
  theme: 'light' | 'dark'
  onThemeChange: (theme: 'light' | 'dark') => void
  onNotify: (message: string, tone?: ToastTone) => void
}

export default function AccountScreen({ onBack, onLogout, theme, onThemeChange, onNotify }: AccountScreenProps) {
  const [confirmLogout, setConfirmLogout] = useState(false)
  const [language, setLanguage] = useState(() => localStorage.getItem('docsuite-language') || 'Français')
  const [ethnicity, setEthnicity] = useState(() => localStorage.getItem('docsuite-ethnicity') || 'Non renseignée')
  const [openPreference, setOpenPreference] = useState<'language' | 'ethnicity' | null>(null)

  const updatePreference = (key: 'language' | 'ethnicity', value: string) => {
    if (key === 'language') {
      setLanguage(value)
      localStorage.setItem('docsuite-language', value)
    } else {
      setEthnicity(value)
      localStorage.setItem('docsuite-ethnicity', value)
    }
    setOpenPreference(null)
    onNotify('Préférence enregistrée.', 'success')
  }

  const preferences = {
    language: ['Français', 'English', 'Español', 'Português', 'Deutsch', 'Italiano', 'العربية', '中文简体', '日本語', 'Nouchi'],
    ethnicity: ['Non renseignée', 'Baoulé', 'Bété', 'Dida', 'Gouro', 'Sénoufo', 'Dioula', 'Agni', 'Abron', 'Attié', 'Wê', 'Autre'],
  }

  return (
    <div className="flex flex-col h-full bg-paper-50">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 py-3">
        <button onClick={onBack} className="text-ink-950/70">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-[17px] font-bold text-ink-950">Compte</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-6 space-y-4">
        <div className="rounded-2xl bg-white shadow-card px-4 py-4">
          <div className="flex items-center gap-2.5">
            <CloudUpload size={17} className="text-iris-500" />
            <div>
              <p className="text-[14px] font-semibold text-ink-950">Stockage local</p>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-800/55">Vos documents restent sur cet appareil. Exportez-les régulièrement : le stockage du navigateur n&apos;est pas une sauvegarde garantie.</p>
            </div>
          </div>
          <button onClick={() => onNotify('La sauvegarde cloud nécessite une connexion configurée.', 'info')} className="mt-3 text-[12.5px] font-semibold text-iris-500">
            Connecter un espace cloud
          </button>
        </div>

        <section className="rounded-2xl bg-white shadow-card overflow-hidden">
          <p className="px-4 pt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-800/45">Préférences personnelles</p>
          <button onClick={() => setOpenPreference(openPreference === 'language' ? null : 'language')} className="flex w-full items-center justify-between px-4 py-4 text-left">
            <span className="text-[13px] font-semibold text-ink-950">Langue de l&apos;interface</span>
            <span className="flex items-center gap-2 text-[12px] text-ink-800/55">{language}<ChevronDown size={16} className={openPreference === 'language' ? 'rotate-180' : ''} /></span>
          </button>
          {openPreference === 'language' && <div className="grid grid-cols-2 gap-2 border-t border-paper-100 px-4 pb-4 pt-3">{preferences.language.map((item) => <button key={item} onClick={() => updatePreference('language', item)} className="flex items-center justify-between rounded-xl bg-paper-50 px-3 py-2.5 text-left text-[12px] font-semibold text-ink-950">{item}{language === item && <Check size={14} className="text-iris-500" />}</button>)}</div>}
          <button onClick={() => setOpenPreference(openPreference === 'ethnicity' ? null : 'ethnicity')} className="flex w-full items-center justify-between border-t border-paper-100 px-4 py-4 text-left">
            <span className="text-[13px] font-semibold text-ink-950">Origine culturelle</span>
            <span className="flex items-center gap-2 text-[12px] text-ink-800/55">{ethnicity}<ChevronDown size={16} className={openPreference === 'ethnicity' ? 'rotate-180' : ''} /></span>
          </button>
          {openPreference === 'ethnicity' && <div className="grid grid-cols-2 gap-2 border-t border-paper-100 px-4 pb-4 pt-3">{preferences.ethnicity.map((item) => <button key={item} onClick={() => updatePreference('ethnicity', item)} className="flex items-center justify-between rounded-xl bg-paper-50 px-3 py-2.5 text-left text-[12px] font-semibold text-ink-950">{item}{ethnicity === item && <Check size={14} className="text-iris-500" />}</button>)}</div>}
        </section>
        <button onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')} className="w-full rounded-2xl bg-white px-4 py-3 text-left text-[13px] font-semibold text-ink-950 shadow-card">
          Thème : {theme === 'light' ? 'Clair' : 'Sombre'}
        </button>
        <button onClick={() => setConfirmLogout(true)} className="w-full h-12 rounded-2xl bg-white shadow-card text-[14px] font-semibold text-rose-500">
          Réinitialiser les données locales
        </button>
      </div>
      <ConfirmDialog
        open={confirmLogout}
        title="Réinitialiser la session ?"
        message="Les documents locaux et la session actuelle seront retirés de cet appareil."
        danger
        confirmLabel="Réinitialiser"
        onCancel={() => setConfirmLogout(false)}
        onConfirm={() => { setConfirmLogout(false); onLogout() }}
      />
    </div>
  )
}
