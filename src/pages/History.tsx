import { useState } from 'react'
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
import useHistoryStore, { MeetingSnapshot } from '@/stores/useHistoryStore'
import { FileText, MapPin, Clock, Users } from 'lucide-react'
import { MEMBERS } from '@/lib/mock'

export default function History() {
  const { history } = useHistoryStore()
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingSnapshot | null>(null)

  const getMemberName = (id: string) => MEMBERS.find((m) => m.id === id)?.name || id

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Histórico de Reuniões</h1>
        <p className="text-slate-500">Consulte atas e detalhes de reuniões anteriores.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reuniões Finalizadas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Moderador</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-slate-500 py-6">
                    Nenhuma reunião no histórico.
                  </TableCell>
                </TableRow>
              ) : (
                history.map((meeting) => (
                  <TableRow key={meeting.id}>
                    <TableCell className="font-medium">
                      {new Date(meeting.date).toLocaleDateString('pt-BR')}
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
              {selectedMeeting && new Date(selectedMeeting.date).toLocaleDateString('pt-BR')}
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
