import { useState } from 'react'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EMOTIONS, MEMBERS } from '@/lib/mock'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Step2Updates() {
  const [activeMember, setActiveMember] = useState(MEMBERS[0].id)

  const [level, setLevel] = useState(0)
  const [selectedCore, setSelectedCore] = useState<any>(null)
  const [selectedSecondary, setSelectedSecondary] = useState<any>(null)
  const [selectedTertiary, setSelectedTertiary] = useState<string>('')

  const [memory, setMemory] = useState('')

  const handleCoreSelect = (emotion: any) => {
    setSelectedCore(emotion)
    setLevel(1)
  }

  const handleSecondarySelect = (emotion: any) => {
    setSelectedSecondary(emotion)
    setLevel(2)
  }

  const handleTertiarySelect = (emotion: string) => {
    setSelectedTertiary(emotion)
  }

  const resetEmotion = () => {
    setLevel(0)
    setSelectedCore(null)
    setSelectedSecondary(null)
    setSelectedTertiary('')
  }

  const goBack = () => {
    if (level === 2) {
      setLevel(1)
      setSelectedTertiary('')
      setSelectedSecondary(null)
    } else if (level === 1) {
      setLevel(0)
      setSelectedCore(null)
    }
  }

  const currentEmotionName =
    selectedTertiary || selectedSecondary?.name || selectedCore?.name || '_____'

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Atualizações (5% Form)</h2>
          <p className="text-slate-500">Compartilhe o seu estado emocional atual.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium whitespace-nowrap">Membro Atual:</span>
          <Select value={activeMember} onValueChange={setActiveMember}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MEMBERS.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-2 border-indigo-100 shadow-sm overflow-hidden">
        <div className="bg-indigo-50 p-6 border-b border-indigo-100">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest">
              Frase Guia
            </h3>
            <p className="text-2xl sm:text-3xl font-medium text-slate-800 leading-relaxed">
              "A emoção que estou sentindo é{' '}
              <span className="font-bold text-indigo-600 underline decoration-indigo-200 underline-offset-4">
                {currentEmotionName}
              </span>{' '}
              e isso me faz lembrar{' '}
              <span className="font-bold text-indigo-600 underline decoration-indigo-200 underline-offset-4">
                {memory || '_____'}
              </span>
              ."
            </p>
            <div className="pt-4 max-w-md mx-auto">
              <Input
                placeholder="O que isso te faz lembrar?"
                value={memory}
                onChange={(e) => setMemory(e.target.value)}
                className="bg-white/80 border-indigo-200 focus-visible:ring-indigo-500 text-center"
              />
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-slate-800">Roda de Emoções</h4>
            {level > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={goBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
                </Button>
                <Button variant="ghost" size="sm" onClick={resetEmotion}>
                  Reiniciar
                </Button>
              </div>
            )}
          </div>

          <div className="min-h-[250px] flex flex-col justify-center">
            {level === 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 animate-fade-in">
                {EMOTIONS.map((e) => (
                  <Button
                    key={e.name}
                    variant="outline"
                    className={cn(
                      'h-24 text-base font-bold flex flex-col gap-2 transition-all hover:scale-105',
                      e.color,
                    )}
                    onClick={() => handleCoreSelect(e)}
                  >
                    {e.name}
                  </Button>
                ))}
              </div>
            )}

            {level === 1 && selectedCore && (
              <div className="space-y-6 animate-fade-in">
                <p className="text-center text-sm font-medium text-slate-500">
                  Selecione uma emoção secundária de{' '}
                  <span className="font-bold text-slate-800">{selectedCore.name}</span>:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {selectedCore.sub.map((sec: any) => (
                    <Button
                      key={sec.name}
                      variant="outline"
                      className={cn(
                        'h-16 text-sm font-semibold transition-all hover:scale-105',
                        selectedCore.color,
                      )}
                      onClick={() => handleSecondarySelect(sec)}
                    >
                      {sec.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {level === 2 && selectedSecondary && (
              <div className="space-y-6 animate-fade-in">
                <p className="text-center text-sm font-medium text-slate-500">
                  Você está se sentindo{' '}
                  <span className="font-bold text-slate-800">{selectedSecondary.name}</span>.
                  Especificamente:
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {selectedSecondary.sub.map((ter: string) => (
                    <Button
                      key={ter}
                      variant={selectedTertiary === ter ? 'default' : 'outline'}
                      className={cn(
                        'h-14 px-8 text-sm font-semibold transition-all hover:scale-105',
                        selectedTertiary === ter
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : selectedCore.color,
                      )}
                      onClick={() => handleTertiarySelect(ter)}
                    >
                      {ter}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-slate-900 hover:bg-slate-800" disabled={!selectedTertiary || !memory}>
          Salvar e Próximo Membro <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
