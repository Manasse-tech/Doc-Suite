import { ArrowLeft, CloudUpload } from 'lucide-react'
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

        <button onClick={() => setConfirmLogout(true)} className="w-full h-12 rounded-2xl bg-white shadow-card text-[14px] font-semibold text-rose-500">
          Se déconnecter
        </button>
        <button onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')} className="w-full rounded-2xl bg-white px-4 py-3 text-left text-[13px] font-semibold text-ink-950 shadow-card">
          Thème : {theme === 'light' ? 'Clair' : 'Sombre'}
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
