import { Link } from 'react-router-dom'
import {
  Calendar as CalendarIcon,
  MapPin,
  User,
  Plus,
  MoreVertical,
  Bell,
  CalendarPlus,
  Download,
  Mail,
  MessageCircle,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu'
import { MEETINGS } from '@/lib/mock'
import useMainStore from '@/stores/main'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export default function Agenda() {
  const { currentUser } = useMainStore()
  const canStart = ['Moderador', 'Vice-Moderador'].includes(currentUser.role)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Agendada':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Em Andamento':
        return 'bg-amber-100 text-amber-800 border-amber-200 animate-pulse'
      case 'Finalizada':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agenda do Fórum</h1>
          <p className="text-muted-foreground">Acompanhe as reuniões passadas e futuras.</p>
        </div>
        {canStart && (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Reunião
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {MEETINGS.map((meeting) => (
          <Card
            key={meeting.id}
            className={cn(
              'overflow-hidden transition-all hover:shadow-md',
              meeting.status === 'Agendada' ? 'border-blue-200' : '',
            )}
          >
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="bg-slate-50 w-full sm:w-48 p-6 flex flex-col items-center justify-center border-r border-slate-100">
                  <CalendarIcon className="h-8 w-8 text-slate-400 mb-2" />
                  <span className="text-lg font-bold text-slate-900 text-center">
                    {new Date(meeting.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </span>
                  <span className="text-sm text-slate-500">
                    {new Date(meeting.date).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <div className="flex-1 p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <Badge variant="outline" className={getStatusColor(meeting.status)}>
                        {meeting.status}
                      </Badge>
                      <h3 className="font-semibold text-lg">Reunião Mensal #{meeting.id}</h3>
                    </div>
                    <div className="flex gap-2 items-center">
                      {meeting.status === 'Agendada' && canStart && (
                        <Button asChild className="bg-slate-900 hover:bg-slate-800 hidden sm:flex">
                          <Link to={`/meeting/${meeting.id}`}>Iniciar</Link>
                        </Button>
                      )}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuLabel>Ações da Reunião</DropdownMenuLabel>
                          {meeting.status === 'Agendada' && canStart && (
                            <DropdownMenuItem asChild className="sm:hidden">
                              <Link to={`/meeting/${meeting.id}`}>Iniciar Reunião</Link>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />

                          {meeting.status === 'Agendada' && (
                            <>
                              <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                  <Bell className="mr-2 h-4 w-4" />
                                  <span>Enviar Lembrete</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                  <DropdownMenuSubContent>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        toast.success(
                                          'Lembrete enviado via E-mail para os membros.',
                                        )
                                      }
                                    >
                                      <Mail className="mr-2 h-4 w-4" />
                                      E-mail
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        toast.success(
                                          'Lembrete enviado via WhatsApp para os membros.',
                                        )
                                      }
                                    >
                                      <MessageCircle className="mr-2 h-4 w-4" />
                                      WhatsApp
                                    </DropdownMenuItem>
                                  </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                              </DropdownMenuSub>

                              <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                  <CalendarPlus className="mr-2 h-4 w-4" />
                                  <span>Adicionar ao Calendário</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                  <DropdownMenuSubContent>
                                    <DropdownMenuItem asChild>
                                      <a
                                        href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Reunião+Mensal+YPO+${meeting.id}&dates=${meeting.date.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${meeting.date.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&details=Reunião+Mensal+do+Fórum&location=${encodeURIComponent(meeting.location)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Google Calendar
                                      </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                      <a
                                        href={`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${meeting.date.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}%0ADTEND:${meeting.date.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}%0ASUMMARY:Reunião%20Mensal%20YPO%20${meeting.id}%0ALOCATION:${encodeURIComponent(meeting.location)}%0AEND:VEVENT%0AEND:VCALENDAR`}
                                        download={`reuniao-ypo-${meeting.id}.ics`}
                                      >
                                        <Download className="mr-2 h-4 w-4" />
                                        Baixar .ICS
                                      </a>
                                    </DropdownMenuItem>
                                  </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                              </DropdownMenuSub>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      Host: <span className="font-medium text-slate-900">{meeting.host}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium text-slate-900">{meeting.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
