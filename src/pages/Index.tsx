import { useEffect, useState } from 'react'
import {
  Calendar,
  AlertTriangle,
  Database,
  Plus,
  RefreshCw,
  Loader2,
  MoreVertical,
  Pencil,
  Trash2,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/hooks/use-auth'
import { useRealtime } from '@/hooks/use-realtime'
import pb from '@/lib/pocketbase/client'
import type { RecordModel } from 'pocketbase'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/hooks/use-toast'

export default function Index() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [dbRecords, setDbRecords] = useState<RecordModel[]>([])
  const [isDbLoading, setIsDbLoading] = useState(true)
  const [dbError, setDbError] = useState<string | null>(null)

  // Dialog States
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const [selectedRecord, setSelectedRecord] = useState<RecordModel | null>(null)

  // Form States
  const [formData, setFormData] = useState({ title: '', description: '', status: 'Agendada' })
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const resetForm = () => {
    setFormData({ title: '', description: '', status: 'Agendada' })
    setSelectedRecord(null)
  }

  const handleCreate = async () => {
    if (!formData.title.trim()) {
      toast({ title: 'Erro', description: 'O título é obrigatório.', variant: 'destructive' })
      return
    }
    try {
      setIsSubmitting(true)
      await pb.collection('basereuniaoypo').create(formData)
      toast({ title: 'Sucesso', description: 'Reunião criada com sucesso.' })
      setIsCreateOpen(false)
      resetForm()
    } catch (err: any) {
      toast({ title: 'Erro ao criar', description: err.message, variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = async () => {
    if (!selectedRecord) return
    if (!formData.title.trim()) {
      toast({ title: 'Erro', description: 'O título é obrigatório.', variant: 'destructive' })
      return
    }
    try {
      setIsSubmitting(true)
      await pb.collection('basereuniaoypo').update(selectedRecord.id, formData)
      toast({ title: 'Sucesso', description: 'Reunião atualizada com sucesso.' })
      setIsEditOpen(false)
      resetForm()
    } catch (err: any) {
      toast({ title: 'Erro ao atualizar', description: err.message, variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedRecord) return
    try {
      setIsSubmitting(true)
      await pb.collection('basereuniaoypo').delete(selectedRecord.id)
      toast({ title: 'Sucesso', description: 'Reunião excluída com sucesso.' })
      setIsDeleteOpen(false)
      resetForm()
    } catch (err: any) {
      toast({ title: 'Erro ao excluir', description: err.message, variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const openEdit = (record: RecordModel) => {
    setSelectedRecord(record)
    setFormData({
      title: record.title || '',
      description: record.description || '',
      status: record.status || 'Agendada',
    })
    setIsEditOpen(true)
  }

  const openDelete = (record: RecordModel) => {
    setSelectedRecord(record)
    setIsDeleteOpen(true)
  }

  const userName = user?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'Usuário'

  if (isDbLoading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[200px] rounded-xl" />
          <Skeleton className="h-[200px] rounded-xl" />
          <Skeleton className="h-[200px] rounded-xl" />
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
            <p>Erro ao carregar dados. Verifique sua conexão ou permissões.</p>
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

  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Olá, {userName}</h1>
        <p className="text-slate-500">Gerencie as reuniões e tópicos do seu Fórum YPO.</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-500" />
            Reuniões
          </h2>

          <Dialog
            open={isCreateOpen}
            onOpenChange={(open) => {
              setIsCreateOpen(open)
              if (!open) resetForm()
            }}
          >
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Nova Reunião
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Reunião</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes para agendar uma nova reunião no fórum.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Título <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Reunião Mensal - Abril"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Descrição</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Pauta ou detalhes da reunião..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={formData.status}
                    onValueChange={(v) => setFormData({ ...formData, status: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rascunho">Rascunho</SelectItem>
                      <SelectItem value="Agendada">Agendada</SelectItem>
                      <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                      <SelectItem value="Finalizada">Finalizada</SelectItem>
                      <SelectItem value="Cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreate} disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {dbRecords.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
            <div className="bg-indigo-100 p-3 rounded-full mb-4">
              <Database className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              Nenhuma reunião encontrada
            </h3>
            <p className="text-sm text-slate-500 text-center max-w-md mb-6">
              Você ainda não possui nenhuma reunião registrada. Clique no botão acima para criar a
              primeira.
            </p>
            <Button onClick={() => setIsCreateOpen(true)} variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Criar Primeira Reunião
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {dbRecords.map((record) => (
              <Card
                key={record.id}
                className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow relative group flex flex-col"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-base font-semibold text-slate-800 leading-tight">
                      {record.title || `Registro #${record.id.slice(0, 5)}`}
                    </CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 -mr-2 -mt-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                        >
                          <MoreVertical className="h-4 w-4 text-slate-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(record)}>
                          <Pencil className="mr-2 h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openDelete(record)}
                          className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="flex items-center mt-1.5">
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                        record.status === 'Agendada'
                          ? 'bg-blue-100 text-blue-700'
                          : record.status === 'Finalizada'
                            ? 'bg-emerald-100 text-emerald-700'
                            : record.status === 'Em Andamento'
                              ? 'bg-amber-100 text-amber-700'
                              : record.status === 'Cancelada'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {record.status || 'Sem status'}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-slate-600 line-clamp-3 min-h-[60px]">
                    {record.description || (
                      <span className="text-slate-400 italic">Sem descrição fornecida.</span>
                    )}
                  </p>
                </CardContent>
                <CardFooter className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex justify-between shrink-0">
                  <span>Criado: {new Date(record.created).toLocaleDateString('pt-BR')}</span>
                  <span>Modificado: {new Date(record.updated).toLocaleDateString('pt-BR')}</span>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open)
          if (!open) resetForm()
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Reunião</DialogTitle>
            <DialogDescription>Atualize os detalhes da reunião selecionada.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Título <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Descrição</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={formData.status}
                onValueChange={(v) => setFormData({ ...formData, status: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rascunho">Rascunho</SelectItem>
                  <SelectItem value="Agendada">Agendada</SelectItem>
                  <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                  <SelectItem value="Finalizada">Finalizada</SelectItem>
                  <SelectItem value="Cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEdit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Reunião</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a reunião "{selectedRecord?.title}"? Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleDelete()
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Excluir'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
