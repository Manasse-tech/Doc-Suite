import type { ReactNode } from 'react'

interface PhoneShellProps {
  children: ReactNode
}

export default function PhoneShell({ children }: PhoneShellProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0F1017] px-3 py-3 sm:px-4 sm:py-8">
      <div className="relative">
        <div className="absolute -inset-x-10 -inset-y-10 rounded-[64px] bg-iris-600/10 blur-3xl" />
        <div className="relative h-[calc(100svh-24px)] max-h-[822px] w-[min(380px,calc(100vw-24px))] min-h-[620px] rounded-[46px] bg-ink-950 p-[10px] shadow-2xl ring-1 ring-white/10 sm:h-[822px]">
          <div className="absolute left-1/2 top-[10px] -translate-x-1/2 h-[24px] w-[110px] rounded-full bg-ink-950 z-20 flex items-center justify-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-ink-800" />
            <div className="h-2 w-2 rounded-full bg-ink-800" />
          </div>
          <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-paper-50 flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
