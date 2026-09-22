import { useEffect } from 'react'
import { Layers } from 'lucide-react'
import StatusBar from '../components/StatusBar'

interface SplashScreenProps {
  onDone: () => void
}

export default function SplashScreen({ onDone }: SplashScreenProps) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-iris-600 to-iris-700 text-white">
      <StatusBar dark />
      <div className="flex-1 flex flex-col items-center justify-center gap-5 px-10">
        <div className="h-20 w-20 rounded-[26px] bg-white/15 backdrop-blur flex items-center justify-center ring-1 ring-white/25 animate-risein">
          <Layers size={34} strokeWidth={2} />
        </div>
        <div className="text-center animate-risein" style={{ animationDelay: '80ms' }}>
          <p className="text-[22px] font-display font-semibold tracking-tight">DocSuite</p>
          <p className="text-[12.5px] text-white/70 mt-1">Vos documents, toujours à portée</p>
        </div>
      </div>
      <div className="px-16 pb-12">
        <div className="h-1 w-full rounded-full bg-white/15 overflow-hidden">
          <div className="h-full w-1/3 rounded-full bg-white animate-loadbar" />
        </div>
      </div>
    </div>
  )
}
