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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { MEETINGS } from '@/lib/mock'

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

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Atas e Dashboards</h1>
        <p className="text-muted-foreground">
          Histórico de reuniões e análises de profundidade do grupo.
        </p>
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
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded">4SFE: Profissional</span>
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded">Exercício: Pessoal</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Média de Profundidade por Categoria</CardTitle>
              <CardDescription>
                Nível (0-3) médio alcançado pelos membros nas últimas 3 reuniões.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={depthData}>
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
  )
}
