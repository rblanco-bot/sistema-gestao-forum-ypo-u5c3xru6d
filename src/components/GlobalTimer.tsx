import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export function GlobalTimer() {
  const [timeLeft, setTimeLeft] = useState(120)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  const presets = [2, 5, 10, 30, 40, 60]

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const osc = ctx.createOscillator()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(440, ctx.currentTime)
      osc.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.5)
      setIsRunning(false)
    }
  }, [timeLeft, isRunning])

  return (
    <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-xl border border-slate-700 shadow-lg">
      <span
        className={cn(
          'text-3xl font-mono font-bold tracking-widest transition-colors',
          timeLeft <= 10 && isRunning ? 'text-red-500 animate-pulse' : 'text-white',
        )}
      >
        {formatTime(timeLeft)}
      </span>
      <div className="flex items-center gap-1 border-l border-slate-700 pl-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsRunning(!isRunning)}
          className="hover:bg-slate-800"
        >
          {isRunning ? (
            <Pause className="h-5 w-5 text-white" />
          ) : (
            <Play className="h-5 w-5 text-green-400" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setIsRunning(false)
            setTimeLeft(120)
          }}
          className="hover:bg-slate-800"
        >
          <RotateCcw className="h-5 w-5 text-slate-300" />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-slate-800">
              <TimerIcon className="h-5 w-5 text-blue-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 border-slate-200 bg-white">
            <div className="grid grid-cols-3 gap-2">
              {presets.map((m) => (
                <Button
                  key={m}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTimeLeft(m * 60)
                    setIsRunning(false)
                  }}
                  className="text-xs"
                >
                  {m}m
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
