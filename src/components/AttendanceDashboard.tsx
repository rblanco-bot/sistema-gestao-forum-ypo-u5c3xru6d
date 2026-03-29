import { Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { MEMBERS } from '@/lib/mock'
import useAttendanceStore from '@/stores/useAttendanceStore'

export function AttendanceDashboard() {
  const { records } = useAttendanceStore()
  const currentYear = new Date().getFullYear()
  const yearlyRecords = records.filter((r) => new Date(r.meetingDate).getFullYear() === currentYear)

  const stats = MEMBERS.map((m) => {
    let absences = 0
    let fines = 0

    yearlyRecords
      .filter((r) => r.memberId === m.id)
      .forEach((r) => {
        if (r.status === 'ausente') {
          absences += 1.0
        } else if (r.status === 'atrasado') {
          if (r.delayMinutes > 15) {
            absences += 0.5
          } else if (r.delayMinutes > 0) {
            fines += 1
          }
        }
      })

    return { ...m, absences, fines }
  })

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-500" />
          Histórico de Frequência e Penalidades ({currentYear})
        </CardTitle>
        <CardDescription>Acompanhamento de faltas e multas do grupo</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Membro</TableHead>
              <TableHead className="text-center">Faltas</TableHead>
              <TableHead className="text-center">Multas (R$ 500)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.map((s) => {
              let statusLabel = 'Regular'
              let badgeVariant = 'default'
              if (s.absences > 2.0) {
                statusLabel = 'Votação de Expulsão'
                badgeVariant = 'destructive'
              } else if (s.absences >= 1.5) {
                statusLabel = 'Atenção'
                badgeVariant = 'secondary'
              }

              return (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-center">{s.absences.toFixed(1)}</TableCell>
                  <TableCell className="text-center">{s.fines}</TableCell>
                  <TableCell>
                    <Badge variant={badgeVariant as any}>{statusLabel}</Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
