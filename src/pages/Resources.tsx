import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import { EMOTIONS, ICEBREAKERS } from '@/lib/mock'
import { cn } from '@/lib/utils'

export default function Resources() {
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
    setMemory('')
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Recursos do Fórum</h1>
        <p className="text-muted-foreground">
          Ferramentas interativas para apoiar a condução das reuniões.
        </p>
      </div>

      <Tabs defaultValue="emotions" className="space-y-6">
        <TabsList className="bg-slate-100 p-1">
          <TabsTrigger value="emotions" className="rounded-md">
            Roda das Emoções
          </TabsTrigger>
          <TabsTrigger value="icebreakers" className="rounded-md">
            Banco de Quebra-Gelos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="emotions" className="space-y-6">
          <Card className="border-2 border-indigo-100 shadow-sm overflow-hidden">
            <div className="bg-indigo-50 p-6 border-b border-indigo-100">
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest">
                  Frase Guia (5% Form)
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

            <CardContent className="p-6 bg-white min-h-[400px]">
              <div className="mb-6 flex items-center justify-between">
                <h4 className="text-lg font-semibold text-slate-800">
                  Selecione sua Emoção ({level}/3)
                </h4>
                {level > 0 && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={goBack}>
                      <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
                    </Button>
                    <Button variant="ghost" size="sm" onClick={resetEmotion}>
                      <RefreshCw className="h-4 w-4 mr-2" /> Reiniciar
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center items-center py-8">
                {level === 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 animate-fade-in w-full max-w-3xl">
                    {EMOTIONS.map((e) => (
                      <Button
                        key={e.name}
                        variant="outline"
                        className={cn(
                          'h-32 text-lg font-bold flex flex-col gap-2 transition-all hover:scale-105 hover:shadow-lg',
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
                  <div className="space-y-8 animate-fade-in w-full max-w-3xl">
                    <p className="text-center text-lg font-medium text-slate-500">
                      Você selecionou{' '}
                      <span className="font-bold text-slate-800">{selectedCore.name}</span>. Escolha
                      uma emoção secundária:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {selectedCore.sub.map((sec: any) => (
                        <Button
                          key={sec.name}
                          variant="outline"
                          className={cn(
                            'h-20 text-base font-semibold transition-all hover:scale-105',
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
                  <div className="space-y-8 animate-fade-in w-full max-w-4xl">
                    <p className="text-center text-lg font-medium text-slate-500">
                      Você está{' '}
                      <span className="font-bold text-slate-800">{selectedSecondary.name}</span>.
                      Especificamente:
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      {selectedSecondary.sub.map((ter: string) => (
                        <Button
                          key={ter}
                          variant={selectedTertiary === ter ? 'default' : 'outline'}
                          className={cn(
                            'h-16 px-8 text-base font-semibold transition-all hover:scale-105',
                            selectedTertiary === ter
                              ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
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
        </TabsContent>

        <TabsContent value="icebreakers" className="space-y-6">
          {['Pessoal', 'Negócios', 'Impacto'].map((category) => (
            <Card key={category}>
              <CardHeader className="bg-slate-50 border-b pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Badge
                    className={
                      category === 'Pessoal'
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : category === 'Negócios'
                          ? 'bg-amber-500 hover:bg-amber-600'
                          : 'bg-emerald-500 hover:bg-emerald-600'
                    }
                  >
                    {category} ({ICEBREAKERS.filter((i) => i.category === category).length})
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {ICEBREAKERS.filter((i) => i.category === category).map((i, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100 shadow-sm"
                    >
                      <span className="font-bold text-slate-400 min-w-[24px]">{idx + 1}.</span>
                      <span className="font-medium">{i.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
