import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Calendar,
  ListTodo,
  Banknote,
  BarChart,
  Lightbulb,
} from 'lucide-react'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import useMainStore from '@/stores/main'

export function Layout() {
  const { currentUser } = useMainStore()
  const location = useLocation()

  const navItems = [
    {
      title: 'Dashboard',
      url: '/',
      icon: LayoutDashboard,
      roles: ['Moderador', 'Vice-Moderador', 'Tesoureiro', 'Membro'],
    },
    {
      title: 'Membros',
      url: '/members',
      icon: Users,
      roles: ['Moderador', 'Vice-Moderador', 'Tesoureiro', 'Membro'],
    },
    {
      title: 'Agenda',
      url: '/agenda',
      icon: Calendar,
      roles: ['Moderador', 'Vice-Moderador', 'Tesoureiro', 'Membro'],
    },
    {
      title: 'Atas & Analytics',
      url: '/minutes',
      icon: BarChart,
      roles: ['Moderador', 'Vice-Moderador', 'Tesoureiro', 'Membro'],
    },
    {
      title: 'Parking Lot',
      url: '/parking-lot',
      icon: ListTodo,
      roles: ['Moderador', 'Vice-Moderador'],
    },
    {
      title: 'Finanças',
      url: '/finance',
      icon: Banknote,
      roles: ['Moderador', 'Vice-Moderador', 'Tesoureiro'],
    },
    {
      title: 'Recursos',
      url: '/resources',
      icon: Lightbulb,
      roles: ['Moderador', 'Vice-Moderador', 'Tesoureiro', 'Membro'],
    },
  ]

  const visibleItems = navItems.filter((item) => item.roles.includes(currentUser.role))

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-slate-50">
        <Sidebar className="border-r border-slate-200">
          <SidebarContent>
            <div className="p-6">
              <h1 className="text-2xl font-bold tracking-tighter text-slate-900">YPO Forum</h1>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel className="text-slate-500">Menu Principal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {visibleItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={
                          location.pathname === item.url ||
                          (item.url !== '/' && location.pathname.startsWith(item.url))
                        }
                      >
                        <Link to={item.url} className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h2 className="text-lg font-semibold text-slate-800 capitalize">
                {location.pathname === '/'
                  ? 'Dashboard'
                  : location.pathname.substring(1).replace('-', ' ')}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                {currentUser.role}
              </Badge>
              <Avatar>
                <AvatarFallback className="bg-slate-900 text-white">
                  {getInitials(currentUser.name)}
                </AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
