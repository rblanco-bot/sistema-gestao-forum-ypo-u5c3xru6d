import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useHistoryStore, { MeetingSnapshot } from '@/stores/useHistoryStore'
import { FileText, MapPin, Clock, Users, Download } from 'lucide-react'
import { MEMBERS } from '@/lib/mock'
import { useToast } from '@/hooks/use-toast'

export default function History() {
  const { history } = useHistoryStore()
  const { toast } = useToast()

  const [selectedMeeting, setSelectedMeeting] = useState<MeetingSnapshot | null>(null)
  const [selectedMeetingIds, setSelectedMeetingIds] = useState<string[]>([])
  const [filterPeriod, setFilterPeriod] = useState<string>('all')

  const getMemberName = (id: string) => MEMBERS.find((m) => m.id === id)?.name || id

  const filteredHistory = useMemo(() => {
    return history
      .filter((meeting) => {
        if (filterPeriod === 'all') return true
        const date = new Date(meeting.date + 'T12:00:00')
        const month = date.getMonth()

        switch (filterPeriod) {
          case 'h1':
            return month >= 0 && month <= 5
          case 'h2':
            return month >= 6 && month <= 11
          case 'q1':
            return month >= 0 && month <= 2
          case 'q2':
            return month >= 3 && month <= 5
          case 'q3':
            return month >= 6 && month <= 8
          case 'q4':
            return month >= 9 && month <= 11
          default:
            return true
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [history, filterPeriod])

  useEffect(() => {
    setSelectedMeetingIds([])
  }, [filterPeriod])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMeetingIds(filteredHistory.map((m) => m.id))
    } else {
      setSelectedMeetingIds([])
    }
  }

  const handleSelectMeeting = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedMeetingIds((prev) => [...prev, id])
    } else {
      setSelectedMeetingIds((prev) => prev.filter((mId) => mId !== id))
    }
  }

  const handleExportBatch = () => {
    const selectedMeetingsToExport = filteredHistory.filter((m) =>
      selectedMeetingIds.includes(m.id),
    )

    if (selectedMeetingsToExport.length === 0) return

    let exportContent = `HISTÓRICO DE REUNIÕES YPO FORUM\n`
    exportContent += `Exportado em: ${new Date().toLocaleDateString('pt-BR')}\n\n`
    exportContent += `=================================================\n\n`

    selectedMeetingsToExport.forEach((meeting) => {
      exportContent += `Data: ${new Date(meeting.date + 'T12:00:00').toLocaleDateString('pt-BR')}\n`
      exportContent += `Local: ${meeting.location || 'Não informado'}\n`
      exportContent += `Horário: ${meeting.startTime} - ${meeting.endTime}\n`
      exportContent += `Moderador: ${meeting.moderator}\n\n`

      exportContent += `PRESENÇA:\n`
      Object.entries(meeting.attendance).forEach(([memberId, status]) => {
        exportContent += `- ${getMemberName(memberId)}: ${status.toUpperCase()}\n`
      })
      exportContent += `\n`

      exportContent += `PAPÉIS:\n`
      Object.entries(meeting.roles).forEach(([memberId, role]) => {
        exportContent += `- ${getMemberName(memberId)}: ${role}\n`
      })
      exportContent += `\n`

      exportContent += `DEEP DIVES & APRESENTAÇÕES:\n`
      if (meeting.presentations.length > 0) {
        meeting.presentations.forEach((p) => {
          exportContent += `- ${getMemberName(p.memberId)}: ${p.modality}\n`
        })
      } else {
        exportContent += `- Nenhuma apresentação registrada.\n`
      }
      exportContent += `\n`

      exportContent += `FEEDBACK DO PROCESSADOR:\n`
      exportContent += `${meeting.processorFeedback || 'Nenhum feedback registrado.'}\n`

      exportContent += `\n=================================================\n\n`
    })

    const blob = new Blob([exportContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `ypo_atas_lote_${new Date().getTime()}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast({
      title: 'Exportação Concluída',
      description: `${selectedMeetingsToExport.length} ata(s) exportada(s) com sucesso.`,
    })

    setSelectedMeetingIds([])
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 gap-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Histórico de Reuniões
          </h1>
          <p className="text-slate-500">
            Consulte atas e exporte detalhes de reuniões anteriores em lote.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <Select value={filterPeriod} onValueChange={setFilterPeriod}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtrar por período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os períodos</SelectItem>
              <SelectItem value="h1">1º Semestre</SelectItem>
              <SelectItem value="h2">2º Semestre</SelectItem>
              <SelectItem value="q1">1º Trimestre</SelectItem>
              <SelectItem value="q2">2º Trimestre</SelectItem>
              <SelectItem value="q3">3º Trimestre</SelectItem>
              <SelectItem value="q4">4º Trimestre</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleExportBatch}
            disabled={selectedMeetingIds.length === 0}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar Lote {selectedMeetingIds.length > 0 && `(${selectedMeetingIds.length})`}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reuniões Finalizadas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] text-center">
                  <Checkbox
                    checked={
                      filteredHistory.length > 0 &&
                      selectedMeetingIds.length === filteredHistory.length
                    }
                    onCheckedChange={(checked) => handleSelectAll(!!checked)}
                    aria-label="Selecionar todas as reuniões"
                  />
                </TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Moderador</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-slate-500 py-6">
                    Nenhuma reunião no histórico para o período selecionado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredHistory.map((meeting) => (
                  <TableRow key={meeting.id}>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={selectedMeetingIds.includes(meeting.id)}
                        onCheckedChange={(checked) => handleSelectMeeting(meeting.id, !!checked)}
                        aria-label={`Selecionar reunião de ${meeting.date}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {new Date(meeting.date + 'T12:00:00').toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>{meeting.location || 'Não informado'}</TableCell>
                    <TableCell>{meeting.moderator}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedMeeting(meeting)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Ver Ata
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selectedMeeting} onOpenChange={(open) => !open && setSelectedMeeting(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Ata da Reunião -{' '}
              {selectedMeeting &&
                new Date(selectedMeeting.date + 'T12:00:00').toLocaleDateString('pt-BR')}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4 mt-4">
            {selectedMeeting && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="h-4 w-4" />
                    <span>Local: {selectedMeeting.location || 'Não informado'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="h-4 w-4" />
                    <span>
                      Horário: {selectedMeeting.startTime} - {selectedMeeting.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="h-4 w-4" />
                    <span>Moderador: {selectedMeeting.moderator}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 border-b pb-1">Presença</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedMeeting.attendance).map(([memberId, status]) => (
                      <div
                        key={memberId}
                        className="flex justify-between items-center bg-slate-50 p-2 rounded"
                      >
                        <span className="font-medium">{getMemberName(memberId)}</span>
                        <span className="text-sm uppercase text-slate-500">{status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 border-b pb-1">Papéis</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedMeeting.roles).map(([memberId, role]) => (
                      <div
                        key={memberId}
                        className="flex justify-between items-center bg-slate-50 p-2 rounded"
                      >
                        <span className="font-medium">{getMemberName(memberId)}</span>
                        <span className="text-sm text-blue-600 font-medium">{role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                    Deep Dives & Apresentações
                  </h3>
                  {selectedMeeting.presentations.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedMeeting.presentations.map((p, i) => (
                        <li key={i}>
                          <span className="font-medium">{getMemberName(p.memberId)}</span> -{' '}
                          {p.modality}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-500">Nenhuma apresentação registrada.</p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                    Feedback do Processador
                  </h3>
                  <p className="text-slate-700 whitespace-pre-wrap">
                    {selectedMeeting.processorFeedback || 'Nenhum feedback registrado.'}
                  </p>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
