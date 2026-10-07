import type { ReactNode } from 'react'

interface PhoneShellProps {
  children: ReactNode
}

export default function PhoneShell({ children }: PhoneShellProps) {
  return (
    <main className="min-h-[100svh] w-full overflow-hidden bg-[#0F1017] sm:flex sm:items-center sm:justify-center sm:px-4 sm:py-8">
      <div className="relative h-[100svh] w-full sm:h-[822px] sm:max-h-[calc(100svh-64px)] sm:w-[380px]">
        <div className="absolute -inset-x-10 -inset-y-10 hidden rounded-[64px] bg-iris-600/10 blur-3xl sm:block" />
        <div className="relative h-full w-full overflow-hidden bg-paper-50 sm:rounded-[46px] sm:bg-ink-950 sm:p-[10px] sm:shadow-2xl sm:ring-1 sm:ring-white/10">
          <div className="absolute left-1/2 top-[10px] z-20 hidden h-[24px] w-[110px] -translate-x-1/2 items-center justify-center gap-1.5 rounded-full bg-ink-950 sm:flex">
            <div className="h-1.5 w-1.5 rounded-full bg-ink-800" />
            <div className="h-2 w-2 rounded-full bg-ink-800" />
          </div>
          <div className="relative h-full w-full overflow-hidden bg-paper-50 sm:rounded-[38px]">
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
