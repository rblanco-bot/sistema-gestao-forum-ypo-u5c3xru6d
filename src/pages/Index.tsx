import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  CheckCircle2,
  ListTodo,
  Wallet,
  AlertTriangle,
  Database,
  Plus,
  RefreshCw,
  Loader2,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/hooks/use-auth'
import { useRealtime } from '@/hooks/use-realtime'
import pb from '@/lib/pocketbase/client'
import type { RecordModel } from 'pocketbase'

import useMainStore from '@/stores/main'
import useAttendanceStore from '@/stores/useAttendanceStore'

// Fallback mocks to prevent missing module errors
const MEETINGS: any[] = []
const PARKING_LOT: any[] = []
const FINANCE_TRANSACTIONS: any[] = []
const MEMBERS: any[] = []

const AttendanceDashboard = () => (
  <Card className="shadow-sm">
    <CardHeader>
      <CardTitle className="text-lg">Frequência</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-slate-500">Módulo de frequência em desenvolvimento.</p>
    </CardContent>
  </Card>
)

export default function Index() {
  const { user } = useAuth()
  const { currentUser } = useMainStore()
  const { records } = useAttendanceStore()

  const [dbRecords, setDbRecords] = useState<RecordModel[]>([])
  const [isDbLoading, setIsDbLoading] = useState(true)
  const [dbError, setDbError] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const loadBaseData = async (showLoading = true) => {
    try {
      if (showLoading) setIsDbLoading(true)
      setDbError(null)
      const data = await pb.collection('basereuniaoypo').getFullList({
        sort: '-created',
      })
      setDbRecords(data || [])
    } catch (err: any) {
      console.error('Failed to load basereuniaoypo data:', err)
      setDbError(err?.message || 'Erro de conexão ou permissão ao acessar os dados.')
    } finally {
      if (showLoading) setIsDbLoading(false)
    }
  }

  useEffect(() => {
    loadBaseData(true)
  }, [])

  useRealtime('basereuniaoypo', () => {
    loadBaseData(false)
  })

  const handleCreateRecord = async () => {
    try {
      setIsCreating(true)
      await pb.collection('basereuniaoypo').create({})
    } catch (err: any) {
      console.error('Failed to create basereuniaoypo record:', err)
      setDbError(err?.message || 'Erro ao criar o registro.')
    } finally {
      setIsCreating(false)
    }
  }

  const userName = user?.name || currentUser?.name?.split(' ')[0] || 'Usuário'

  if (isDbLoading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-[180px] col-span-2 rounded-xl" />
          <Skeleton className="h-[180px] rounded-xl" />
          <Skeleton className="h-[180px] rounded-xl" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px] rounded-xl" />
          <Skeleton className="h-[300px] rounded-xl" />
        </div>
      </div>
    )
  }

  if (dbError) {
    return (
      <div className="p-8 max-w-2xl mx-auto mt-10 animate-fade-in">
        <Alert variant="destructive" className="bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Falha ao carregar dados</AlertTitle>
          <AlertDescription className="mt-2 space-y-4 text-red-700">
            <p>
              Ocorreu um erro ao tentar conectar com a nuvem ou você não tem as permissões
              necessárias.
            </p>
            <div className="bg-white/60 p-2 rounded text-xs font-mono border border-red-100 break-words">
              {dbError}
            </div>
            <Button
              onClick={() => loadBaseData(true)}
              variant="outline"
              size="sm"
              className="bg-white hover:bg-slate-50 text-red-600 border-red-200"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Tentar Novamente
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (dbRecords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 animate-fade-in">
        <Card className="max-w-md w-full border-dashed border-2 bg-slate-50 shadow-sm">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-indigo-100 p-3 rounded-full w-fit mb-4">
              <Database className="h-8 w-8 text-indigo-600" />
            </div>
            <CardTitle className="text-xl">Nenhum registro encontrado</CardTitle>
            <CardDescription className="text-base mt-2">
              Nenhum registro base encontrado na coleção basereuniaoypo. Para começar a utilizar o
              sistema, crie o primeiro registro.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pt-4 pb-6">
            <Button
              size="lg"
              onClick={handleCreateRecord}
              disabled={isCreating}
              className="w-full sm:w-auto"
            >
              {isCreating ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Plus className="mr-2 h-5 w-5" />
              )}
              Criar Primeiro Registro
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const safeRecords = records || []
  const nextMeeting = (MEETINGS || []).find((m) => m.status === 'Agendada')
  const pastMeetings = (MEETINGS || []).filter((m) => m.status === 'Finalizada').slice(0, 3)
  const pendingTopics = (PARKING_LOT || []).filter((p) => p.status === 'Pendente').length

  const balance = (FINANCE_TRANSACTIONS || []).reduce((acc, curr) => acc + (curr.value || 0), 0)
  const currentYear = new Date().getFullYear()
  const totalFinesValue =
    safeRecords.filter(
      (r) =>
        r.meetingDate &&
        new Date(r.meetingDate).getFullYear() === currentYear &&
        r.status === 'atrasado' &&
        r.delayMinutes > 0 &&
        r.delayMinutes <= 15,
    ).length * 500

  const memberAbsences = (MEMBERS || [])
    .map((member) => {
      const totalAbsences = safeRecords
        .filter((r) => r.memberId === member.id)
        .reduce((acc, curr) => {
          if (curr.status === 'ausente') return acc + 1
          if (curr.status === 'parcial') return acc + 0.5
          return acc
        }, 0)
      return { ...member, totalAbsences }
    })
    .filter((m) => m.totalAbsences > 2)

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Olá, {userName}</h1>
        <p className="text-slate-500">Aqui está o resumo do seu Fórum YPO hoje.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-500" />
            Registros Base
          </h2>
          <Button onClick={handleCreateRecord} disabled={isCreating} size="sm" variant="outline">
            {isCreating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Novo Registro
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dbRecords.map((record) => (
            <Card
              key={record.id}
              className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-700 flex justify-between items-center">
                  <span className="truncate">Registro #{record.id.slice(0, 5)}</span>
                  <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    Ativo
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Criado em:</span>
                    <span className="font-medium text-slate-900">
                      {new Date(record.created).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Última mod.:</span>
                    <span className="font-medium text-slate-900">
                      {new Date(record.updated).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {memberAbsences.length > 0 && (
        <div className="space-y-4">
          {memberAbsences.map((member) => (
            <Alert
              key={member.id}
              variant="destructive"
              className="bg-red-50 border-red-200 text-red-800"
            >
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800 font-semibold">
                Alerta Crítico de Frequência
              </AlertTitle>
              <AlertDescription className="text-red-700 mt-1">
                O membro <strong>{member.name}</strong> atingiu{' '}
                <strong>{member.totalAbsences} faltas</strong> e está agora sujeito a uma votação de
                expulsão.
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" /> Próxima Reunião
            </CardTitle>
            <CardDescription className="text-slate-300">
              Prepare-se para o próximo encontro
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {nextMeeting ? (
              <>
                <div className="space-y-1">
                  <p className="text-2xl font-semibold">
                    {new Date(nextMeeting.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p className="text-sm text-slate-300">
                    Host: {nextMeeting.host} • Local: {nextMeeting.location}
                  </p>
                </div>
                {currentUser?.role &&
                  ['Moderador', 'Vice-Moderador'].includes(currentUser.role) && (
                    <Button
                      asChild
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0"
                    >
                      <Link to={`/meeting/${nextMeeting.id}`}>Iniciar Reunião</Link>
                    </Button>
                  )}
              </>
            ) : (
              <p className="text-slate-300">Nenhuma reunião agendada.</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Caixa do Fórum</CardTitle>
            <Wallet className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                balance + totalFinesValue,
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Inclui{' '}
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                totalFinesValue,
              )}{' '}
              em multas
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Parking Lot</CardTitle>
            <ListTodo className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{pendingTopics}</div>
            <p className="text-xs text-slate-500 mt-1">Tópicos pendentes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AttendanceDashboard />
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-500" /> Atas Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pastMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-900">
                      {new Date(meeting.date).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-xs text-slate-500">Host: {meeting.host}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/minutes">Ver Resumo</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
