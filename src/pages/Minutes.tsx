import { useState, useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import { Download, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MEETINGS } from '@/lib/mock'
import { toast } from 'sonner'

const depthData = [
  { name: 'Rafael', Pessoal: 2.5, Familiar: 1.5, Profissional: 3.0 },
  { name: 'Barbara', Pessoal: 1.0, Familiar: 3.0, Profissional: 2.0 },
  { name: 'Guilherme', Pessoal: 3.0, Familiar: 2.5, Profissional: 1.0 },
  { name: 'Andres', Pessoal: 2.0, Familiar: 1.0, Profissional: 3.0 },
  { name: 'Elias', Pessoal: 1.5, Familiar: 2.0, Profissional: 2.5 },
]

const pieData = [
  { name: 'Pessoal', value: 30 },
  { name: 'Familiar', value: 20 },
  { name: 'Profissional', value: 50 },
]

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))']

const chartConfig = {
  Pessoal: { label: 'Pessoal', color: 'hsl(var(--chart-1))' },
  Familiar: { label: 'Familiar', color: 'hsl(var(--chart-2))' },
  Profissional: { label: 'Profissional', color: 'hsl(var(--chart-3))' },
}

export default function Minutes() {
  const finalized = MEETINGS.filter((m) => m.status === 'Finalizada')
  const [viewMode, setViewMode] = useState('series')
  const [selectedMeeting, setSelectedMeeting] = useState<string>(finalized[0]?.id || '')
  const [selectedSeries, setSelectedSeries] = useState<string[]>(finalized.map((m) => m.id))
  const [meetingToPrint, setMeetingToPrint] = useState<any>(null)

  const activeData = useMemo(() => {
    const factor = viewMode === 'single' ? parseInt(selectedMeeting || '1') : selectedSeries.length
    return depthData.map((d) => ({
      ...d,
      Pessoal: Math.max(0, Math.min(3, d.Pessoal * (factor * 0.5 + 0.5))),
      Familiar: Math.max(0, Math.min(3, d.Familiar * (factor * 0.4 + 0.6))),
      Profissional: Math.max(0, Math.min(3, d.Profissional * (factor * 0.3 + 0.7))),
    }))
  }, [viewMode, selectedMeeting, selectedSeries])

  const handleExportPDF = (meeting: any) => {
    setMeetingToPrint(meeting)
    toast.success('Gerando PDF da Ata...', {
      description: 'O download iniciará em instantes.',
    })
    setTimeout(() => {
      window.print()
      setTimeout(() => setMeetingToPrint(null), 1000)
    }, 500)
  }

  const chartTitle =
    viewMode === 'single'
      ? `Profundidade - Reunião #${selectedMeeting}`
      : 'Média de Profundidade (Série)'

  return (
    <>
      <div className="space-y-8 animate-fade-in-up print:hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Atas e Dashboards</h1>
            <p className="text-muted-foreground">
              Histórico de reuniões e análises de profundidade do grupo.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(v) => v && setViewMode(v)}
              className="bg-white border rounded-md"
            >
              <ToggleGroupItem value="single" aria-label="Uma Reunião" className="px-3 text-sm">
                Uma Reunião
              </ToggleGroupItem>
              <ToggleGroupItem
                value="series"
                aria-label="Série de Reuniões"
                className="px-3 text-sm"
              >
                Série de Reuniões
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg border">
          <Filter className="h-4 w-4 text-slate-500" />
          {viewMode === 'single' ? (
            <Select value={selectedMeeting} onValueChange={setSelectedMeeting}>
              <SelectTrigger className="w-[250px] bg-white">
                <SelectValue placeholder="Selecione a reunião" />
              </SelectTrigger>
              <SelectContent>
                {finalized.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    Reunião #{m.id} - {new Date(m.date).toLocaleDateString('pt-BR')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-slate-500 mr-2">Reuniões:</span>
              {finalized.map((m) => (
                <Button
                  key={m.id}
                  variant={selectedSeries.includes(m.id) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setSelectedSeries((prev) =>
                      prev.includes(m.id) && prev.length > 1
                        ? prev.filter((id) => id !== m.id)
                        : [...prev.filter((id) => id !== m.id), m.id],
                    )
                  }}
                  className={
                    selectedSeries.includes(m.id)
                      ? 'bg-slate-800 text-white'
                      : 'bg-white text-slate-700'
                  }
                >
                  #{m.id}
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <h3 className="font-semibold text-lg">Reuniões Passadas</h3>
            {finalized.map((m) => (
              <Card key={m.id} className="cursor-pointer hover:border-blue-300 transition-colors">
                <CardContent className="p-4 space-y-1">
                  <p className="font-bold text-slate-800">Fórum #{m.id}</p>
                  <p className="text-sm text-slate-500">
                    {new Date(m.date).toLocaleDateString('pt-BR')} • Host: {m.host}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                      4SFE: Profissional
                    </span>
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                      Exercício: Pessoal
                    </span>
                  </div>
                  <div className="pt-3 mt-3 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => handleExportPDF(m)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Exportar Ata (PDF)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{chartTitle}</CardTitle>
                <CardDescription>
                  Nível (0-3){' '}
                  {viewMode === 'series'
                    ? 'médio alcançado nas últimas reuniões.'
                    : `alcançado na reunião selecionada.`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <BarChart data={activeData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} domain={[0, 3]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="Pessoal" fill="var(--color-Pessoal)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Familiar" fill="var(--color-Familiar)" radius={[4, 4, 0, 0]} />
                    <Bar
                      dataKey="Profissional"
                      fill="var(--color-Profissional)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Deep Dives</CardTitle>
                <CardDescription>Foco das apresentações do ano (%).</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-[250px] w-full max-w-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center gap-2 ml-4">
                  {pieData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2 text-sm">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span>
                        {entry.name} ({entry.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* PRINT ONLY ATA FOR PAST MEETINGS */}
      {meetingToPrint && (
        <div className="hidden print:block space-y-6 text-black p-8">
          <div className="border-b-2 border-slate-800 pb-4 mb-6">
            <h1 className="text-3xl font-bold uppercase tracking-widest">
              Ata de Reunião de Fórum
            </h1>
            <p className="text-slate-600 mt-2">
              Documento estritamente confidencial - Nunca, Nada, Ninguém
            </p>
          </div>

          <section className="mb-6">
            <h2 className="text-xl font-bold bg-slate-100 p-2 mb-3">1. Dados Gerais</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <strong>Data:</strong> {new Date(meetingToPrint.date).toLocaleDateString('pt-BR')}
              </p>
              <p>
                <strong>Local:</strong> {meetingToPrint.location || 'Sede YPO'}
              </p>
              <p>
                <strong>Horário de Início:</strong> 18:00
              </p>
              <p>
                <strong>Horário de Término:</strong> 22:00
              </p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold bg-slate-100 p-2 mb-3">2. Papéis da Reunião</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <strong>Moderador:</strong> {meetingToPrint.host}
              </p>
              <p>
                <strong>Vice-Moderador:</strong> Barbara
              </p>
              <p>
                <strong>Timekeeper:</strong> Guilherme
              </p>
              <p>
                <strong>Processador:</strong> Andres
              </p>
              <p>
                <strong>Anotador:</strong> Elias
              </p>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold bg-slate-100 p-2 mb-3">3. Controle de Presença</h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-300">
                  <th className="text-left py-2">Membro</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Horário</th>
                </tr>
              </thead>
              <tbody>
                {['Rafael', 'Barbara', 'Guilherme', 'Andres', 'Elias'].map((name) => (
                  <tr key={name} className="border-b border-slate-100">
                    <td className="py-2">{name}</td>
                    <td className="py-2">No horário</td>
                    <td className="py-2">-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold bg-slate-100 p-2 mb-3">
              4. Mergulho Profundo (Deep Dive)
            </h2>
            <div className="space-y-4 text-sm">
              <div className="border p-3 rounded-md">
                <p>
                  <strong>Apresentador:</strong> Barbara
                </p>
                <p>
                  <strong>Área:</strong> Pessoal (Transição)
                </p>
                <p>
                  <strong>Modalidade:</strong> Exercício Guiado
                </p>
                <p>
                  <strong>Issue Clearing:</strong> Não
                </p>
              </div>
              <div className="border p-3 rounded-md">
                <p>
                  <strong>Apresentador:</strong> Guilherme
                </p>
                <p>
                  <strong>Área:</strong> Profissional (M&A)
                </p>
                <p>
                  <strong>Modalidade:</strong> 4SFE Clássico
                </p>
                <p>
                  <strong>Issue Clearing:</strong> Sim
                </p>
              </div>
            </div>
          </section>

          <section className="mb-6 break-inside-avoid">
            <h2 className="text-xl font-bold bg-slate-100 p-2 mb-3">5. Avaliação e Fechamento</h2>
            <div className="text-sm space-y-4">
              <div>
                <strong className="block mb-1">Feedback do Processador:</strong>
                <p>
                  Reunião produtiva, com excelente profundidade nos deep dives. O tempo foi bem
                  gerenciado, mas podemos melhorar o foco durante as atualizações iniciais.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  )
}
