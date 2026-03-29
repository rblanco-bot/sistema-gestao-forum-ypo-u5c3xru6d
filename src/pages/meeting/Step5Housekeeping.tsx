import { useNavigate } from 'react-router-dom'
import { Flag, CheckCircle, ShieldAlert } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import useMeetingStore from '@/stores/useMeetingStore'

export default function Step5Housekeeping() {
  const navigate = useNavigate()
  const { resetMeeting } = useMeetingStore()

  const checklist = [
    'Definir data, hora e local do próximo Fórum',
    'Feedback sobre o Processador (O que foi bom? O que pode melhorar?)',
    'Housekeeping e recados gerais',
    'Destruir fisicamente todas as anotações (Shredding)',
    "Reafirmar confidencialidade: 'Nunca, Nada, Ninguém'",
    'Check-out: uma palavra de como você sai',
  ]

  const handleFinish = () => {
    toast({
      title: 'Reunião Finalizada com Sucesso!',
      description: 'As atas foram salvas no histórico.',
    })
    resetMeeting()
    navigate('/minutes')
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
      <div className="text-center space-y-2 mb-8">
        <div className="mx-auto w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center mb-4">
          <Flag className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Housekeeping</h2>
        <p className="text-muted-foreground text-lg">
          Últimos passos antes de encerrar o encontro.
        </p>
      </div>

      <Card className="border-2 border-slate-200 shadow-md">
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            Checklist de Fechamento
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {checklist.map((item, i) => (
            <div
              key={i}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Checkbox id={`hk-${i}`} className="mt-1 w-5 h-5" />
              <Label htmlFor={`hk-${i}`} className="text-base cursor-pointer leading-relaxed">
                {item}
              </Label>
            </div>
          ))}

          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-4">
            <ShieldAlert className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-amber-900">Atenção Especial</h4>
              <p className="text-sm text-amber-800 mt-1">
                Lembre-se de que a ata gerada conterá <strong>apenas metadados</strong> (presença,
                categorias e palavras-chave). Todo o conteúdo aprofundado deve permanecer apenas na
                memória dos presentes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-6">
        <Button
          size="lg"
          onClick={handleFinish}
          className="w-full sm:w-auto px-12 h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-2xl transition-all"
        >
          Finalizar Reunião e Gerar Ata
        </Button>
      </div>
    </div>
  )
}
