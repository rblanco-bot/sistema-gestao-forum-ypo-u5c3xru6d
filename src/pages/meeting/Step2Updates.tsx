import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useMeetingStore from '@/stores/useMeetingStore'
import { MEMBERS } from '@/lib/mock'
import { cn } from '@/lib/utils'

const FIELDS = [
  { id: 'Pessoal', color: 'border-blue-500', bg: 'bg-blue-50', text: 'text-blue-700' },
  { id: 'Familiar', color: 'border-amber-500', bg: 'bg-amber-50', text: 'text-amber-700' },
  {
    id: 'Profissional',
    color: 'border-emerald-500',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
  },
] as const

export default function Step2Updates() {
  const { attendance, updates, setUpdates } = useMeetingStore()

  const presentMembers = MEMBERS.filter((m) => attendance[m.id] !== 'ausente')

  const handleUpdate = (
    memberId: string,
    field: string,
    key: 'depth' | 'keyword',
    value: string,
  ) => {
    setUpdates((prev) => {
      const memberUpdates = prev[memberId] || {
        Pessoal: { depth: '', keyword: '' },
        Familiar: { depth: '', keyword: '' },
        Profissional: { depth: '', keyword: '' },
      }
      return {
        ...prev,
        [memberId]: {
          ...memberUpdates,
          [field]: { ...memberUpdates[field as keyof typeof memberUpdates], [key]: value },
        },
      }
    })
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Updates (Os 3 Ps)</h2>
        <p className="text-muted-foreground">
          Registre apenas palavras-chave e a profundidade para cada membro.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {presentMembers.map((m) => (
          <Card key={m.id} className="shadow-sm border-t-4 border-t-slate-800">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">{m.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {FIELDS.map((f) => {
                const data = updates[m.id]?.[f.id as keyof (typeof updates)[string]] || {
                  depth: '',
                  keyword: '',
                }
                return (
                  <div key={f.id} className={cn('pl-4 border-l-4 space-y-2 py-1', f.color)}>
                    <Label className={cn('font-bold text-xs uppercase tracking-wider', f.text)}>
                      {f.id}
                    </Label>
                    <div className="flex gap-2">
                      <Select
                        value={data.depth}
                        onValueChange={(v) => handleUpdate(m.id, f.id, 'depth', v)}
                      >
                        <SelectTrigger className="w-[110px] h-9">
                          <SelectValue placeholder="Nível" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0 - Zero</SelectItem>
                          <SelectItem value="1">1 - Leve</SelectItem>
                          <SelectItem value="2">2 - Médio</SelectItem>
                          <SelectItem value="3">3 - Profundo</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Palavra-chave"
                        value={data.keyword}
                        onChange={(e) => handleUpdate(m.id, f.id, 'keyword', e.target.value)}
                        className="h-9"
                      />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        ))}
        {presentMembers.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500">
            Nenhum membro presente marcado na etapa anterior.
          </div>
        )}
      </div>
    </div>
  )
}
