import { useNavigate } from 'react-router-dom'
import { Flag, CheckCircle, ShieldAlert } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import useMeetingStore from '@/stores/useMeetingStore'
import { MEMBERS } from '@/lib/mock'

export default function Step5Housekeeping() {
  const navigate = useNavigate()
  const {
    resetMeeting,
    processorFeedback,
    setProcessorFeedback,
    meetingDetails,
    roles,
    attendance,
    attendanceTimes,
    updates,
    selections,
    presentations,
    usedIcebreakers,
  } = useMeetingStore()

  const checklist = [
    'Definir data, hora e local do próximo Fórum',
    'Feedback sobre o Processador (O que foi bom? O que pode melhorar?)',
    'Housekeeping e recados gerais',
    'Destruir fisicamente todas as anotações (Shredding)',
    "Reafirmar confidencialidade: 'Nunca, Nada, Ninguém'",
    'Check-out: uma palavra de como você sai',
  ]

  const generateICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Próximo Fórum YPO
DTSTART:${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
END:VEVENT
END:VCALENDAR`
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'proximo_forum.ics')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleFinish = () => {
    if (!processorFeedback.trim()) {
      toast({
        title: 'Feedback Obrigatório',
        description: 'Por favor, preencha o Feedback do Processador antes de finalizar.',
        variant: 'destructive',
      })
      return
    }

    toast({
      title: 'Reunião Finalizada com Sucesso!',
      description: 'As atas foram salvas no histórico. O download foi iniciado.',
    })
    generateICS()
    setTimeout(() => {
      window.print() // Simplest way to trigger PDF export for metadata-only minutes
      resetMeeting()
      navigate('/minutes')
    }, 1000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up print:m-0 print:max-w-full">
      <div className="text-center space-y-2 mb-8 print:hidden">
        <div className="mx-auto w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center mb-4">
          <Flag className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Housekeeping</h2>
        <p className="text-muted-foreground text-lg">
          Últimos passos antes de encerrar o encontro.
        </p>
      </div>

      <Card className="border-2 border-slate-200 shadow-md print:hidden">
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            Checklist de Fechamento
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {checklist.map((item, i) => (
            <div
              key={i}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Checkbox id={`hk-${i}`} className="mt-1 w-5 h-5" />
              <Label htmlFor={`hk-${i}`} className="text-base cursor-pointer leading-relaxed">
                {item}
              </Label>
            </div>
          ))}

          <div className="mt-8 space-y-3">
            <Label className="text-base font-semibold text-slate-800 flex items-center gap-2">
              Feedback do Processador <span className="text-red-500">*</span>
            </Label>
            <Textarea
              placeholder="Avaliação da reunião, o que foi bom e o que pode melhorar..."
              className="min-h-[120px]"
              value={processorFeedback}
              onChange={(e) => setProcessorFeedback(e.target.value)}
            />
          </div>

          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-4">
            <ShieldAlert className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-amber-900">Atenção Especial</h4>
              <p className="text-sm text-amber-800 mt-1">
                Lembre-se de que a ata gerada conterá <strong>apenas metadados</strong> (presença,
                categorias e palavras-chave). Todo o conteúdo aprofundado deve permanecer apenas na
                memória dos presentes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-6 print:hidden">
        <Button
          size="lg"
          onClick={handleFinish}
          className="w-full sm:w-auto px-12 h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-2xl transition-all"
        >
          Finalizar Reunião e Gerar Ata
        </Button>
      </div>

      {/* PRINT ONLY ATA */}
      <div className="hidden print:block space-y-6 text-black p-8">
        <div className="border-b-2 border-slate-800 pb-4 mb-6">
          <h1 className="text-3xl font-bold uppercase tracking-widest">Ata de Reunião de Fórum</h1>
          <p className="text-slate-600 mt-2">
            Documento estritamente confidencial - Nunca, Nada, Ninguém
          </p>
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-bold bg-slate-100 p-2 mb-3">1. Dados Gerais</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <strong>Data:</strong>{' '}
              {meetingDetails.date
                ? new Date(meetingDetails.date).toLocaleDateString('pt-BR')
                : '-'}
            </p>
            <p>
              <strong>Local:</strong> {meetingDetails.location || '-'}
            </p>
            <p>
              <strong>Horário de Início:</strong> {meetingDetails.startTime || '-'}
            </p>
            <p>
              <strong>Horário de Término:</strong> {meetingDetails.endTime || '-'}
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold bg-slate-100 p-2 mb-3">2. Papéis da Reunião</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <strong>Moderador:</strong>{' '}
              {MEMBERS.find((m) => m.id === roles['Moderador'])?.name || '-'}
            </p>
            <p>
              <strong>Vice-Moderador:</strong>{' '}
              {MEMBERS.find((m) => m.id === roles['Vice-Moderador'])?.name || '-'}
            </p>
            <p>
              <strong>Timekeeper:</strong>{' '}
              {MEMBERS.find((m) => m.id === roles['Timekeeper'])?.name || '-'}
            </p>
            <p>
              <strong>Processador:</strong>{' '}
              {MEMBERS.find((m) => m.id === roles['Processador'])?.name || '-'}
            </p>
            <p>
              <strong>Anotador:</strong>{' '}
              {MEMBERS.find((m) => m.id === roles['Anotador'])?.name || '-'}
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
                <th className="text-left py-2">Horário (Chegada/Saída)</th>
              </tr>
            </thead>
            <tbody>
              {MEMBERS.map((m) => {
                const status = attendance[m.id] || 'presente'
                let statusLabel = 'No horário'
                if (status === 'atrasado') statusLabel = 'Atrasado'
                if (status === 'saida_antecipada') statusLabel = 'Saída Antecipada'
                if (status === 'ausente') statusLabel = 'Ausente'
                return (
                  <tr key={m.id} className="border-b border-slate-100">
                    <td className="py-2">{m.name}</td>
                    <td className="py-2">{statusLabel}</td>
                    <td className="py-2">{attendanceTimes[m.id] || '-'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold bg-slate-100 p-2 mb-3">4. Metadados de Updates</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-300">
                <th className="text-left py-2">Membro</th>
                <th className="text-left py-2">Pessoal (Nível / Palavra)</th>
                <th className="text-left py-2">Familiar (Nível / Palavra)</th>
                <th className="text-left py-2">Profissional (Nível / Palavra)</th>
              </tr>
            </thead>
            <tbody>
              {MEMBERS.map((m) => {
                const u = updates[m.id]
                if (!u) return null
                return (
                  <tr key={m.id} className="border-b border-slate-100">
                    <td className="py-2 font-medium">{m.name}</td>
                    <td className="py-2">
                      {u.Pessoal?.depth || '0'} - {u.Pessoal?.keyword || '-'}
                    </td>
                    <td className="py-2">
                      {u.Familiar?.depth || '0'} - {u.Familiar?.keyword || '-'}
                    </td>
                    <td className="py-2">
                      {u.Profissional?.depth || '0'} - {u.Profissional?.keyword || '-'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold bg-slate-100 p-2 mb-3">
            5. Mergulho Profundo (Deep Dive)
          </h2>
          {presentations.filter((p) => p.memberId).length === 0 ? (
            <p className="text-sm">Nenhum deep dive registrado.</p>
          ) : (
            <div className="space-y-4">
              {presentations
                .filter((p) => p.memberId)
                .map((p, i) => {
                  const mName = MEMBERS.find((m) => m.id === p.memberId)?.name
                  const sel = selections.find((s) => s.memberId === p.memberId)
                  return (
                    <div key={i} className="text-sm border p-3 rounded-md">
                      <p>
                        <strong>Apresentador:</strong> {mName}
                      </p>
                      <p>
                        <strong>Área:</strong> {sel?.category || '-'} ({sel?.keyword || '-'})
                      </p>
                      <p>
                        <strong>Modalidade:</strong> {p.modality || '-'}
                      </p>
                      <p>
                        <strong>Issue Clearing (Resolução):</strong> {p.cleared ? 'Sim' : 'Não'}
                      </p>
                    </div>
                  )
                })}
            </div>
          )}
        </section>

        <section className="mb-6 break-inside-avoid">
          <h2 className="text-xl font-bold bg-slate-100 p-2 mb-3">6. Avaliação e Fechamento</h2>
          <div className="text-sm space-y-4">
            <div>
              <strong className="block mb-1">Quebra-Gelo Utilizado:</strong>
              <p>{usedIcebreakers[usedIcebreakers.length - 1] || '-'}</p>
            </div>
            <div>
              <strong className="block mb-1">Feedback do Processador:</strong>
              <p className="whitespace-pre-wrap">{processorFeedback || '-'}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
