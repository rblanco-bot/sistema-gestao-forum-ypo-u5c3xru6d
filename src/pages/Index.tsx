import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {
  Calendar,
  CheckCircle2,
  ListTodo,
  Wallet,
  AlertTriangle,
  Database,
  Plus,
  RefreshCw,
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
import { MEETINGS, PARKING_LOT, FINANCE_TRANSACTIONS, MEMBERS } from '@/lib/mock'
import { AttendanceDashboard } from '@/components/AttendanceDashboard'
import useAttendanceStore from '@/stores/useAttendanceStore'

export default function Index() {
  const { user, loading: authLoading } = useAuth()
  const { currentUser } = useMainStore()

  const [dbRecords, setDbRecords] = useState<RecordModel[]>([])
  const [isDbLoading, setIsDbLoading] = useState(true)
  const [dbError, setDbError] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const { records } = useAttendanceStore()

  const loadBaseData = async () => {
    try {
      setIsDbLoading(true)
      setDbError(null)
      const records = await pb.collection('basereuniaoypo').getFullList({
        sort: '-created',
      })
      setDbRecords(records)
    } catch (err: any) {
      setDbError(err?.message || 'Erro ao carregar os dados base do fórum.')
    } finally {
      setIsDbLoading(false)
    }
  }

  useEffect(() => {
    if (pb.authStore.isValid) {
      loadBaseData()
    }
  }, [])

  useRealtime('basereuniaoypo', () => {
    if (pb.authStore.isValid) {
      loadBaseData()
    }
  })

  const handleCreateRecord = async () => {
    try {
      setIsCreating(true)
      await pb.collection('basereuniaoypo').create({})
      // The realtime hook will automatically refresh the list
    } catch (err: any) {
      setDbError(err?.message || 'Erro ao criar o registro.')
    } finally {
      setIsCreating(false)
    }
  }

  // Verification & Loading Experience
  if (authLoading) {
    return (
      <div className="space-y-8 animate-pulse">
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

  if (!pb.authStore.isValid || !user) {
    return <Navigate to="/login" replace />
  }

  const nextMeeting = MEETINGS.find((m) => m.status === 'Agendada')
  const pastMeetings = MEETINGS.filter((m) => m.status === 'Finalizada').slice(0, 3)
  const pendingTopics = PARKING_LOT.filter((p) => p.status === 'Pendente').length

  const balance = FINANCE_TRANSACTIONS.reduce((acc, curr) => acc + curr.value, 0)
  const currentYear = new Date().getFullYear()
  const totalFinesValue =
    records.filter(
      (r) =>
        new Date(r.meetingDate).getFullYear() === currentYear &&
        r.status === 'atrasado' &&
        r.delayMinutes > 0 &&
        r.delayMinutes <= 15,
    ).length * 500

  const memberAbsences = MEMBERS.map((member) => {
    const memberRecords = records.filter((r) => r.memberId === member.id)
    const totalAbsences = memberRecords.reduce((acc, curr) => {
      if (curr.status === 'ausente') return acc + 1
      if (curr.status === 'parcial') return acc + 0.5
      return acc
    }, 0)
    return { ...member, totalAbsences }
  }).filter((m) => m.totalAbsences > 2)

  const userName = user.name || currentUser?.name?.split(' ')[0] || 'Usuário'

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Olá, {userName}</h1>
        <p className="text-slate-500">Aqui está o resumo do seu Fórum YPO hoje.</p>
      </div>

      <div className="w-full">
        {isDbLoading ? (
          <Skeleton className="h-[120px] w-full rounded-xl" />
        ) : dbError ? (
          <Alert variant="destructive" className="bg-red-50 border-red-200">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Erro de Conexão</AlertTitle>
            <AlertDescription className="mt-2 flex flex-col gap-3">
              <p>{dbError}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={loadBaseData}
                className="w-fit bg-white text-slate-900 hover:bg-slate-100 border-red-200"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Tentar Novamente
              </Button>
            </AlertDescription>
          </Alert>
        ) : dbRecords.length === 0 ? (
          <Card className="border-dashed border-2 bg-slate-50">
            <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-4">
              <Database className="h-10 w-10 text-slate-400" />
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-900">Nenhum dado encontrado</h3>
                <p className="text-sm text-slate-500 max-w-sm">
                  O seu fórum ainda não possui registros na base principal. Crie o primeiro registro
                  para começar.
                </p>
              </div>
              <Button onClick={handleCreateRecord} disabled={isCreating}>
                {isCreating ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                Criar Primeiro Registro
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-emerald-50 border-emerald-100 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-emerald-800 flex items-center gap-2">
                <Database className="h-4 w-4" />
                Status da Base do Fórum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-emerald-900">{dbRecords.length}</p>
                  <p className="text-xs text-emerald-600 mt-1">Registros ativos sincronizados</p>
                </div>
                <div className="text-right text-xs text-emerald-600">
                  <p>Última atualização:</p>
                  <p className="font-medium">
                    {new Date(dbRecords[0].updated || dbRecords[0].created).toLocaleDateString(
                      'pt-BR',
                      {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      },
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
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
              <Calendar className="h-5 w-5 text-blue-400" />
              Próxima Reunião
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
                {['Moderador', 'Vice-Moderador'].includes(currentUser.role) && (
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
              <CheckCircle2 className="h-5 w-5 text-blue-500" />
              Atas Recentes
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
