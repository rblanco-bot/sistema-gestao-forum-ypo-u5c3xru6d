import { Users, Mail, Phone, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MEMBERS } from '@/lib/mock'
import { cn } from '@/lib/utils'

export default function Members() {
  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Moderador':
        return 'bg-blue-100 text-blue-800'
      case 'Vice-Moderador':
        return 'bg-indigo-100 text-indigo-800'
      case 'Tesoureiro':
        return 'bg-emerald-100 text-emerald-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestão de Membros</h1>
          <p className="text-muted-foreground">
            Gerencie os {MEMBERS.length} participantes do Fórum.
          </p>
        </div>
      </div>

      <Card className="shadow-sm border-slate-200">
        <CardHeader className="bg-slate-50/50 border-b pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-slate-500" />
            Participantes Atuais
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[250px]">Membro</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Papel Atual</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MEMBERS.map((member) => (
                <TableRow key={member.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border shadow-sm">
                        <AvatarFallback className="bg-white text-slate-700 font-semibold">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-slate-900">{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="h-3 w-3" />
                        {member.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone className="h-3 w-3" />
                        {member.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn('flex w-fit items-center gap-1', getRoleColor(member.role))}
                    >
                      {['Moderador', 'Vice-Moderador', 'Tesoureiro'].includes(member.role) && (
                        <Shield className="h-3 w-3" />
                      )}
                      {member.role}
                    </Badge>
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
