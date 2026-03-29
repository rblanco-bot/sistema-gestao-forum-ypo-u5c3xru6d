import { useState } from 'react'
import { RefreshCw, UserCheck, CheckSquare } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import useMeetingStore from '@/stores/useMeetingStore'
import { MEMBERS, ICEBREAKERS } from '@/lib/mock'

export default function Step1Opening() {
  const {
    roles,
    setRoles,
    attendance,
    setAttendance,
    usedIcebreakers,
    setUsedIcebreakers,
    meetingDetails,
    setMeetingDetails,
    attendanceTimes,
    setAttendanceTimes,
  } = useMeetingStore()
  const [icebreaker, setIcebreaker] = useState<(typeof ICEBREAKERS)[0] | null>(null)

  const handleShuffle = () => {
    let available = ICEBREAKERS.filter((ib) => !usedIcebreakers.includes(ib.text))
    if (available.length === 0) {
      setUsedIcebreakers([])
      available = ICEBREAKERS
    }
    const random = available[Math.floor(Math.random() * available.length)]
    setIcebreaker(random)
    setUsedIcebreakers((prev) => [...prev, random.text])
  }

  const checklist = [
    'Centralização finalizada (2 min)',
    'Check-in individual realizado (30s cada)',
    'Regras e Housekeeping lidos',
    'Starter de Comunicação feito (1 min cada)',
  ]

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Card className="bg-red-50 border-red-200 shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-center text-red-700 font-black text-2xl uppercase tracking-[0.3em]">
            Nunca, Nada, Ninguém
          </h2>
          <p className="text-center text-red-600/80 text-sm mt-2 font-medium">
            Confidencialidade absoluta sobre o que for discutido hoje.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-blue-500" /> Papéis e Presença
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 border-b pb-6">
              <div className="space-y-2">
                <Label className="text-xs text-slate-500 uppercase">Data</Label>
                <Input
                  type="date"
                  value={meetingDetails.date}
                  onChange={(e) => setMeetingDetails((p) => ({ ...p, date: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-slate-500 uppercase">Local</Label>
                <Input
                  placeholder="Sede YPO..."
                  value={meetingDetails.location}
                  onChange={(e) => setMeetingDetails((p) => ({ ...p, location: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-slate-500 uppercase">Início</Label>
                <Input
                  type="time"
                  value={meetingDetails.startTime}
                  onChange={(e) => setMeetingDetails((p) => ({ ...p, startTime: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-slate-500 uppercase">Término (Previsto)</Label>
                <Input
                  type="time"
                  value={meetingDetails.endTime}
                  onChange={(e) => setMeetingDetails((p) => ({ ...p, endTime: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {['Moderador', 'Vice-Moderador', 'Timekeeper', 'Processador', 'Anotador'].map(
                (role) => (
                  <div key={role} className="space-y-2">
                    <Label className="text-xs text-slate-500 uppercase">{role}</Label>
                    <Select
                      value={roles[role] || ''}
                      onValueChange={(v) => setRoles((p) => ({ ...p, [role]: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
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
                ),
              )}
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Membro</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MEMBERS.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Select
                          value={attendance[m.id] || 'presente'}
                          onValueChange={(v) => setAttendance((p) => ({ ...p, [m.id]: v }))}
                        >
                          <SelectTrigger className="w-[140px] h-8 text-xs shrink-0">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="presente">No horário</SelectItem>
                            <SelectItem value="atrasado">Atrasado</SelectItem>
                            <SelectItem value="saiu_cedo">Saiu Cedo</SelectItem>
                            <SelectItem value="ausente">Ausente</SelectItem>
                          </SelectContent>
                        </Select>
                        {(attendance[m.id] === 'atrasado' || attendance[m.id] === 'saiu_cedo') && (
                          <Input
                            type="time"
                            className="h-8 text-xs w-[100px]"
                            placeholder={attendance[m.id] === 'atrasado' ? 'Chegada' : 'Saída'}
                            value={attendanceTimes[m.id] || ''}
                            onChange={(e) =>
                              setAttendanceTimes((p) => ({ ...p, [m.id]: e.target.value }))
                            }
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg text-blue-900">Quebra-Gelo</CardTitle>
              <Button
                size="sm"
                variant="outline"
                onClick={handleShuffle}
                className="bg-white hover:bg-slate-50"
              >
                <RefreshCw className="h-4 w-4 mr-2" /> Sortear
              </Button>
            </CardHeader>
            <CardContent>
              {icebreaker ? (
                <div className="space-y-2 mt-4">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-white px-2 py-1 rounded-md shadow-sm">
                    {icebreaker.category}
                  </span>
                  <p className="text-xl font-medium text-slate-800 leading-relaxed mt-2">
                    "{icebreaker.text}"
                  </p>
                </div>
              ) : (
                <div className="text-center text-slate-400 py-8">
                  Clique em sortear para gerar uma pergunta.
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-emerald-500" /> Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {checklist.map((item, i) => (
                <div key={i} className="flex items-center space-x-3 bg-slate-50 p-2 rounded-md">
                  <Checkbox id={`check-${i}`} />
                  <Label htmlFor={`check-${i}`} className="text-sm font-medium cursor-pointer">
                    {item}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
