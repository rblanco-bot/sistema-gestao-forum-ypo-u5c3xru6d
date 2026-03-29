import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Edit2, CheckCircle2 } from 'lucide-react'
import { PARKING_LOT } from '@/lib/mock'
import { cn } from '@/lib/utils'

export default function ParkingLot() {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Crítica':
        return 'bg-red-100 text-red-800'
      case 'Alta':
        return 'bg-orange-100 text-orange-800'
      case 'Média':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Parking Lot</h1>
          <p className="text-muted-foreground">Tópicos pendentes para discussão futura.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Novo Tópico
        </Button>
      </div>

      <Card>
        <CardHeader className="bg-slate-50 border-b pb-4">
          <CardTitle className="text-lg">Tópicos Registrados</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tópico</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Urgência</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PARKING_LOT.map((item) => (
                <TableRow
                  key={item.id}
                  className={item.status === 'Resolvido' ? 'opacity-60 bg-slate-50' : ''}
                >
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.owner}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getUrgencyColor(item.urgency)}>
                      {item.urgency}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        item.status === 'Resolvido' ? 'border-emerald-500 text-emerald-700' : '',
                      )}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {item.status !== 'Resolvido' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
