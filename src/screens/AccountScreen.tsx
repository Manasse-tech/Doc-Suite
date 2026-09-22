import { ArrowLeft, CloudUpload, Activity } from 'lucide-react'
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
  const [premium, setPremium] = useState(false)
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
        <div className="rounded-2xl bg-white shadow-card px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-[11.5px] text-ink-800/45">Abonnement</p>
            <p className="text-[14.5px] font-bold text-ink-950 mt-0.5">{premium ? 'Formule premium' : 'Formule gratuite'}</p>
          </div>
          <button onClick={() => setPremium((value) => !value)} className="h-9 px-4 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[12.5px] font-bold">
            {premium ? 'Premium activé' : 'Passer premium'}
          </button>
        </div>

        <div className="rounded-2xl bg-white shadow-card px-4 py-4">
          <div className="flex items-center gap-2.5 mb-3">
            <CloudUpload size={17} className="text-iris-500" />
            <p className="text-[14px] font-semibold text-ink-950">Espace cloud utilisé</p>
            <span className="ml-auto text-[12.5px] font-mono text-ink-800/50">0 / 2 Go</span>
          </div>
          <div className="h-1.5 rounded-full bg-paper-100 overflow-hidden">
            <div className="h-full w-0 rounded-full bg-iris-500" />
          </div>
          <button onClick={() => onNotify('L’espace cloud sera connecté au backend dans la prochaine étape.', 'info')} className="mt-3 text-[12.5px] font-semibold text-iris-500">
            Augmenter l'espace cloud
          </button>
        </div>

        <div className="rounded-2xl bg-white shadow-card px-4 py-4">
          <div className="flex items-center gap-2.5 mb-3">
            <Activity size={17} className="text-iris-500" />
            <p className="text-[14px] font-semibold text-ink-950">Trafic de synchronisation</p>
            <span className="ml-auto text-[12.5px] font-mono text-ink-800/50">0 / 5 Go</span>
          </div>
          <div className="h-1.5 rounded-full bg-paper-100 overflow-hidden">
            <div className="h-full w-0 rounded-full bg-iris-500" />
          </div>
        </div>

        <p className="text-[11.5px] leading-relaxed text-ink-800/45 px-1">
          Au-delà de votre quota gratuit, vos fichiers restent disponibles 60 jours
          avant suppression automatique. Téléchargez-les à temps si besoin.
        </p>

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
