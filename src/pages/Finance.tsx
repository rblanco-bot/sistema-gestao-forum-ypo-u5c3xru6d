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
import { FINANCE_TRANSACTIONS } from '@/lib/mock'
import { ArrowDownRight, ArrowUpRight, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Finance() {
  const balance = FINANCE_TRANSACTIONS.reduce((acc, curr) => acc + curr.value, 0)

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Finanças do Fórum</h1>
        <p className="text-muted-foreground">Controle de arrecadação e despesas do grupo.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-slate-900 text-white shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-slate-300">Saldo Atual</CardTitle>
            <Wallet className="h-5 w-5 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                balance,
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="bg-slate-50 border-b pb-4">
          <CardTitle className="text-lg">Extrato</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {FINANCE_TRANSACTIONS.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="text-slate-500">
                    {new Date(t.date).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="font-medium">{t.description}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        'flex w-fit items-center gap-1',
                        t.type === 'entrada'
                          ? 'text-emerald-700 border-emerald-200 bg-emerald-50'
                          : 'text-red-700 border-red-200 bg-red-50',
                      )}
                    >
                      {t.type === 'entrada' ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {t.type}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={cn(
                      'text-right font-bold',
                      t.type === 'entrada' ? 'text-emerald-600' : 'text-red-600',
                    )}
                  >
                    {t.value > 0 ? '+' : ''}
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      t.value,
                    )}
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
