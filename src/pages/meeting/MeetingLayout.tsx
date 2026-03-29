import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { GlobalTimer } from '@/components/GlobalTimer'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import useMeetingStore from '@/stores/useMeetingStore'

const STEPS = [
  { path: 'step1', title: '1. Abertura' },
  { path: 'step2', title: '2. Updates' },
  { path: 'step3', title: '3. Seleção' },
  { path: 'step4', title: '4. Deep Dive' },
  { path: 'step5', title: '5. Fechamento' },
]

export default function MeetingLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { resetMeeting } = useMeetingStore()

  const currentIdx = STEPS.findIndex((s) => location.pathname.includes(s.path))
  const progress = ((currentIdx + 1) / STEPS.length) * 100

  const isFirst = currentIdx === 0
  const isLast = currentIdx === STEPS.length - 1

  const handleExit = () => {
    resetMeeting()
    navigate('/agenda')
  }

  const handleNext = () => {
    if (!isLast) navigate(STEPS[currentIdx + 1].path)
  }

  const handlePrev = () => {
    if (!isFirst) navigate(STEPS[currentIdx - 1].path)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleExit} className="text-slate-500">
              <X className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-bold text-slate-800 hidden md:block">Modo Reunião</h2>
          </div>
          <GlobalTimer />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto px-4 pb-2 scrollbar-hide">
          {STEPS.map((step, idx) => {
            const isActive = currentIdx === idx
            const isCompleted = currentIdx > idx
            return (
              <Link
                key={step.path}
                to={step.path}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                  isActive
                    ? 'bg-slate-900 text-white'
                    : isCompleted
                      ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      : 'text-slate-400 hover:text-slate-600',
                )}
              >
                {step.title}
              </Link>
            )
          })}
        </div>
        <Progress value={progress} className="h-1 rounded-none bg-slate-100 [&>div]:bg-blue-600" />
      </header>

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      <footer className="bg-white border-t p-4 sticky bottom-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button variant="outline" onClick={handlePrev} disabled={isFirst} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Anterior
          </Button>
          {!isLast && (
            <Button
              onClick={handleNext}
              className="gap-2 bg-slate-900 text-white hover:bg-slate-800"
            >
              Próximo <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </footer>
    </div>
  )
}
