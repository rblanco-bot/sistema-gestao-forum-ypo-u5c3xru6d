import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EMOTIONS, ICEBREAKERS } from '@/lib/mock'

export default function Resources() {
  const getEmotionColor = (name: string) => {
    const map: Record<string, string> = {
      Felicidade: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
      Surpresa: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200',
      Tristeza: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
      Raiva: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
      Medo: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200',
      Desprezo: 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200',
    }
    return map[name] || 'bg-slate-100 text-slate-800 border-slate-200'
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Recursos do Fórum</h1>
        <p className="text-muted-foreground">
          Ferramentas para apoiar a condução e profundidade das reuniões.
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
          <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute -right-10 -top-10 text-[10rem] opacity-5 font-bold">
              EMOÇÃO
            </div>
            <h3 className="text-xl font-bold mb-2">Exercício de Identificação</h3>
            <p className="text-slate-300 italic text-lg">
              "A emoção que estou sentindo é ______ e isso me faz lembrar ______."
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EMOTIONS.map((e) => (
              <Card
                key={e.name}
                className={`border-2 transition-all hover:-translate-y-1 ${getEmotionColor(e.name).split(' ')[2]}`}
              >
                <CardHeader className="pb-3">
                  <CardTitle className={`text-xl ${getEmotionColor(e.name).split(' ')[1]}`}>
                    {e.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {e.sub.map((s) => (
                      <Badge
                        key={s}
                        variant="outline"
                        className={`cursor-default ${getEmotionColor(e.name)}`}
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="icebreakers" className="space-y-6">
          {['Pessoal', 'Negócios', 'Impacto'].map((category) => (
            <Card key={category}>
              <CardHeader className="bg-slate-50 border-b pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Badge
                    className={
                      category === 'Pessoal'
                        ? 'bg-blue-500'
                        : category === 'Negócios'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                    }
                  >
                    {category}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {ICEBREAKERS.filter((i) => i.category === category).map((i, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100"
                    >
                      <span className="font-bold text-slate-400">{idx + 1}.</span>
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
