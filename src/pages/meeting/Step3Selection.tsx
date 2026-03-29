import { Trophy, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import useMeetingStore from '@/stores/useMeetingStore'
import { MEMBERS } from '@/lib/mock'
import { cn } from '@/lib/utils'

export default function Step3Selection() {
  const { updates, selections, setSelections } = useMeetingStore()

  // Only show members who have at least one keyword filled
  const eligibleMembers = MEMBERS.filter((m) => {
    const u = updates[m.id]
    return u && (u.Pessoal?.keyword || u.Familiar?.keyword || u.Profissional?.keyword)
  })

  const handleSelect = (memberId: string, key: 'category' | 'urgency', val: string) => {
    setSelections((prev) => {
      const existing = prev.find((p) => p.memberId === memberId) || {
        memberId,
        category: '',
        keyword: '',
        urgency: '5',
      }
      const updated = { ...existing, [key]: val }

      if (key === 'category') {
        const u = updates[memberId]
        if (u && u[val as keyof typeof u]) {
          updated.keyword = u[val as keyof typeof u].keyword
        }
      }
      return [...prev.filter((p) => p.memberId !== memberId), updated]
    })
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case '1':
        return 'bg-red-100 text-red-800 border-red-200'
      case '2':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case '3':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case '4':
        return 'bg-green-100 text-green-800 border-green-200'
      case '5':
        return 'bg-slate-100 text-slate-800 border-slate-200'
      default:
        return ''
    }
  }

  const sortedMembers = [...eligibleMembers].sort((a, b) => {
    const urgA = parseInt(selections.find((s) => s.memberId === a.id)?.urgency || '5')
    const urgB = parseInt(selections.find((s) => s.memberId === b.id)?.urgency || '5')
    return urgA - urgB
  })

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
          <Trophy className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Ranking & Seleção</h2>
          <p className="text-muted-foreground">Defina a categoria e urgência para o Deep Dive.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Membros com Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Membro</TableHead>
                <TableHead>Tópico Foco (P/F/P)</TableHead>
                <TableHead>Palavra-chave</TableHead>
                <TableHead className="w-[200px]">Nível de Urgência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMembers.map((m) => {
                const sel = selections.find((s) => s.memberId === m.id) || {
                  category: '',
                  keyword: '',
                  urgency: '5',
                }
                return (
                  <TableRow
                    key={m.id}
                    className={cn('transition-colors', sel.urgency === '1' ? 'bg-red-50/50' : '')}
                  >
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell>
                      <Select
                        value={sel.category}
                        onValueChange={(v) => handleSelect(m.id, 'category', v)}
                      >
                        <SelectTrigger className="w-[160px]">
                          <SelectValue placeholder="Selecionar..." />
                        </SelectTrigger>
                        <SelectContent>
                          {['Pessoal', 'Familiar', 'Profissional'].map((c) => {
                            const hasKw =
                              updates[m.id]?.[c as keyof (typeof updates)[string]]?.keyword
                            return hasKw ? (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ) : null
                          })}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      {sel.keyword ? (
                        <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded">
                          {sel.keyword}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Select
                          value={sel.urgency}
                          onValueChange={(v) => handleSelect(m.id, 'urgency', v)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Urgência" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 - Crítico</SelectItem>
                            <SelectItem value="2">2 - Alta</SelectItem>
                            <SelectItem value="3">3 - Média</SelectItem>
                            <SelectItem value="4">4 - Baixa</SelectItem>
                            <SelectItem value="5">5 - Nenhuma</SelectItem>
                          </SelectContent>
                        </Select>
                        {sel.urgency !== '5' && (
                          <Badge variant="outline" className={getUrgencyColor(sel.urgency)}>
                            Nível {sel.urgency}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {eligibleMembers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
              <AlertCircle className="h-8 w-8 mb-2 text-slate-300" />
              <p>Nenhum membro possui updates registrados com palavras-chave.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
