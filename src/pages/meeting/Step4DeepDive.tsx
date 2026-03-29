import { Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import useMeetingStore from '@/stores/useMeetingStore'
import { MEMBERS } from '@/lib/mock'
import { cn } from '@/lib/utils'

export default function Step4DeepDive() {
  const { selections, presentations, setPresentations } = useMeetingStore()

  const handleUpdate = (index: number, key: string, value: any) => {
    setPresentations((prev) => {
      const newArr = [...prev]
      if (!newArr[index]) newArr[index] = { memberId: '', modality: '', cleared: false }
      newArr[index] = { ...newArr[index], [key]: value }
      return newArr
    })
  }

  const getMemberData = (memberId: string) => {
    const member = MEMBERS.find((m) => m.id === memberId)
    const sel = selections.find((s) => s.memberId === memberId)
    return { member, sel }
  }

  // Only allow selecting members who were given an urgency in Step 3
  const candidates = [...selections]
    .filter((s) => s.category && s.urgency !== '5')
    .sort((a, b) => parseInt(a.urgency) - parseInt(b.urgency))

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
          <Target className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Condução do Deep Dive</h2>
          <p className="text-muted-foreground">Selecione até 3 apresentadores e o formato.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => {
          const pres = presentations[i] || { memberId: '', modality: '', cleared: false }
          const { member, sel } = pres.memberId
            ? getMemberData(pres.memberId)
            : { member: null, sel: null }

          return (
            <Card
              key={i}
              className={cn(
                'border-t-4',
                pres.memberId ? 'border-t-indigo-500 shadow-md' : 'border-t-slate-200',
              )}
            >
              <CardHeader className="bg-slate-50/50 pb-4">
                <CardTitle className="text-lg">Apresentador {i + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label>Membro</Label>
                  <Select
                    value={pres.memberId}
                    onValueChange={(v) => handleUpdate(i, 'memberId', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um membro..." />
                    </SelectTrigger>
                    <SelectContent>
                      {candidates.map((c) => {
                        const mName = MEMBERS.find((m) => m.id === c.memberId)?.name
                        return (
                          <SelectItem key={c.memberId} value={c.memberId}>
                            <div className="flex items-center justify-between w-full">
                              <span>{mName}</span>
                              <span className="text-xs text-muted-foreground ml-2">
                                Nível {c.urgency}
                              </span>
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {member && sel && (
                  <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-100 animate-fade-in">
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">
                        {sel.category}
                      </p>
                      <p className="font-mono mt-1 font-medium">{sel.keyword}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-200">
                      <Label>Modalidade</Label>
                      <Select
                        value={pres.modality}
                        onValueChange={(v) => handleUpdate(i, 'modality', v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Formato..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4SFE">4SFE Clássico</SelectItem>
                          <SelectItem value="Exercicio">Exercício Guiado</SelectItem>
                          <SelectItem value="TemaComum">Tópico Comum</SelectItem>
                          <SelectItem value="MesaRedonda">Mesa Redonda</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-start space-x-3 pt-2">
                      <Checkbox
                        id={`clear-${i}`}
                        checked={pres.cleared}
                        onCheckedChange={(c) => handleUpdate(i, 'cleared', c)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor={`clear-${i}`}
                          className="text-sm font-medium cursor-pointer"
                        >
                          Issue Clearing
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Houve resolução de conflitos?
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
