import { useState } from 'react'
import { X, Undo2, Plus, Move } from 'lucide-react'
import StatusBar from '../components/StatusBar'

interface SignatureScreenProps {
  onClose: () => void
}

const SAVED = ['sig-1', 'sig-2', 'sig-3']

export default function SignatureScreen({ onClose }: SignatureScreenProps) {
  const [placed, setPlaced] = useState(true)
  const [signed, setSigned] = useState(true)
  const [saved, setSaved] = useState(false)

  return (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />
      <div className="flex items-center justify-between px-4 py-2.5">
        <button onClick={onClose} className="h-9 w-9 rounded-full bg-paper-100 flex items-center justify-center">
          <X size={17} className="text-ink-950/70" />
        </button>
        <button onClick={() => setSigned(false)} className="h-9 w-9 rounded-full bg-paper-100 flex items-center justify-center" aria-label="Annuler la signature">
          <Undo2 size={16} className="text-ink-950/70" />
        </button>
        <button onClick={() => setSaved(true)} className="h-9 px-5 rounded-full bg-iris-500 text-white text-[13.5px] font-bold">
          {saved ? 'Enregistré' : 'Enregistrer'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3">
        <div className="rounded-lg border border-paper-200 bg-white shadow-sm px-5 py-6 text-[10.5px] leading-relaxed text-ink-950/70 space-y-4">
          <p className="text-[9px] text-ink-800/35">docsuite.app/modele-competences</p>
          <p className="font-bold text-azure-500 text-[11.5px]">
            Compétences stratégiques &amp; positionnement
          </p>
          {[
            ['Capacité à mobiliser', 'Aptitude à susciter l\u2019adhésion autour d\u2019un projet commun et à motiver une équipe dans la durée.'],
            ['Engagement et fiabilité', 'Respecte les orientations fixées et agit en cohérence avec les valeurs de la structure.'],
            ['Sens de l\u2019initiative', 'Recherche activement de nouvelles pistes et propose des solutions même face à l\u2019inédit.'],
            ['Vision et anticipation', 'Perçoit les évolutions de son environnement et adapte ses choix en conséquence.'],
          ].map(([title, body]) => (
            <div key={title} className="grid grid-cols-2 gap-3">
              <div>
                <p className="font-bold text-azure-500 text-[10.5px]">{title}</p>
                <p className="mt-1">{body}</p>
              </div>
              <ul className="list-disc pl-3 space-y-0.5 text-[10px]">
                <li>Illustration concrète du comportement attendu</li>
                <li>Cohérence dans la durée avec les objectifs fixés</li>
              </ul>
            </div>
          ))}

          {placed && (
            <div className="relative mt-6 h-24 w-52 border-2 border-iris-500 rounded-md">
              <button
                onClick={() => setPlaced(false)}
                className="absolute -top-2.5 -left-2.5 h-5 w-5 rounded-full bg-rose-500 text-white flex items-center justify-center"
              >
                <X size={11} />
              </button>
              <div className="absolute -bottom-2.5 -right-2.5 h-6 w-6 rounded-full bg-iris-500 text-white flex items-center justify-center">
                <Move size={12} />
              </div>
              {signed ? (
                <svg viewBox="0 0 200 90" className="w-full h-full p-2">
                  <path
                    d="M20 60 C 40 20, 60 20, 75 45 C 85 60, 95 35, 105 30 C 120 22, 140 55, 160 40"
                    fill="none"
                    stroke="#12131A"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <button
                  onClick={() => setSigned(true)}
                  className="w-full h-full flex items-center justify-center text-[11px] text-ink-800/40"
                >
                  Toucher pour signer
                </button>
              )}
            </div>
          )}
          <p className="text-[9px] text-ink-800/35 pt-6">docsuite.app/modele-competences</p>
        </div>
      </div>

      <div className="border-t border-paper-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => setSigned(false)} className="flex flex-col items-center gap-1 text-ink-950/70">
          <Undo2 size={18} />
          <span className="text-[10.5px] font-medium">Retour</span>
        </button>
        <button
          onClick={() => {
            setPlaced(true)
            setSigned(false)
          }}
          className="flex flex-col items-center gap-1"
        >
          <div className="h-9 w-9 rounded-full bg-iris-500 flex items-center justify-center">
            <Plus size={18} className="text-white" />
          </div>
          <span className="text-[10.5px] font-medium text-ink-950/70">Ajouter</span>
        </button>
        <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar">
          {SAVED.map((s) => (
            <div
              key={s}
              className="h-12 w-16 rounded-lg border border-paper-200 bg-paper-50 shrink-0 flex items-center justify-center"
            >
              <svg viewBox="0 0 100 40" className="w-4/5 h-3/5">
                <path
                  d="M10 30 C 20 10, 35 10, 42 22 C 48 30, 55 15, 65 12 C 75 10, 85 28, 92 20"
                  fill="none"
                  stroke="#12131A"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
