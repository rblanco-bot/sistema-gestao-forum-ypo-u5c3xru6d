import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { MEMBERS } from '@/lib/mock'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useMeetingStore from '@/stores/useMeetingStore'

const CATEGORIES = [
  {
    id: 'Pessoal',
    label: 'Pessoal',
    color: 'bg-blue-600',
    text: 'text-blue-600',
    border: 'border-blue-200',
    bgLight: 'bg-blue-50',
  },
  {
    id: 'Familiar',
    label: 'Familiar',
    color: 'bg-amber-500',
    text: 'text-amber-600',
    border: 'border-amber-200',
    bgLight: 'bg-amber-50',
  },
  {
    id: 'Profissional',
    label: 'Profissional',
    color: 'bg-emerald-500',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    bgLight: 'bg-emerald-50',
  },
] as const

export default function Step2Updates() {
  const [activeMember, setActiveMember] = useState(MEMBERS[0].id)
  const { updates, setUpdates } = useMeetingStore()

  const memberUpdates = updates[activeMember] || {
    Pessoal: { depth: '0', keyword: '' },
    Familiar: { depth: '0', keyword: '' },
    Profissional: { depth: '0', keyword: '' },
  }

  const handleUpdate = (cat: string, field: 'depth' | 'keyword', val: string) => {
    setUpdates((prev) => ({
      ...prev,
      [activeMember]: {
        ...(prev[activeMember] || {
          Pessoal: { depth: '0', keyword: '' },
          Familiar: { depth: '0', keyword: '' },
          Profissional: { depth: '0', keyword: '' },
        }),
        [cat]: {
          ...(prev[activeMember]?.[cat as keyof typeof memberUpdates] || {
            depth: '0',
            keyword: '',
          }),
          [field]: val,
        },
      },
    }))
  }

  const nextMember = () => {
    const idx = MEMBERS.findIndex((m) => m.id === activeMember)
    if (idx < MEMBERS.length - 1) setActiveMember(MEMBERS[idx + 1].id)
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Atualizações (Updates)</h2>
          <p className="text-slate-500">Registre o nível de profundidade e palavra-chave.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium whitespace-nowrap">Membro:</span>
          <Select value={activeMember} onValueChange={setActiveMember}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue />
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
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const data = memberUpdates[cat.id as keyof typeof memberUpdates]
          return (
            <Card
              key={cat.id}
              className={cn('border-t-4 shadow-sm', `border-t-${cat.color.split('-')[1]}-500`)}
            >
              <CardHeader className={cn('pb-4 border-b', cat.bgLight)}>
                <CardTitle className={cn('text-lg', cat.text)}>{cat.label}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-slate-600 font-semibold">Profundidade (0-3)</Label>
                    <span className={cn('text-xl font-bold', cat.text)}>{data.depth}</span>
                  </div>
                  <Slider
                    defaultValue={[parseInt(data.depth)]}
                    value={[parseInt(data.depth)]}
                    max={3}
                    step={1}
                    onValueChange={(v) => handleUpdate(cat.id, 'depth', v[0].toString())}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-medium">
                    <span>0 (Não mencionado)</span>
                    <span>3 (Muito Profundo)</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label className="text-slate-600 font-semibold">Palavra-Chave</Label>
                  <Input
                    placeholder={`Ex: Casamento, Promoção...`}
                    value={data.keyword}
                    onChange={(e) => handleUpdate(cat.id, 'keyword', e.target.value)}
                    className={cn(
                      'focus-visible:ring-1',
                      `focus-visible:ring-${cat.color.split('-')[1]}-500`,
                      cat.border,
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={nextMember} className="bg-slate-900 hover:bg-slate-800">
          Salvar e Próximo <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
