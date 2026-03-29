export const MEMBERS = [
  {
    id: '1',
    name: 'Rafael B',
    email: 'rafael@exemplo.com',
    phone: '(11) 99999-9999',
    role: 'Moderador',
  },
  {
    id: '2',
    name: 'Barbara F',
    email: 'barbara@exemplo.com',
    phone: '(11) 99999-9998',
    role: 'Vice-Moderador',
  },
  {
    id: '3',
    name: 'Guilherme M',
    email: 'guilherme@exemplo.com',
    phone: '(11) 99999-9997',
    role: 'Tesoureiro',
  },
  {
    id: '4',
    name: 'Andres M',
    email: 'andres@exemplo.com',
    phone: '(11) 99999-9996',
    role: 'Membro',
  },
  {
    id: '5',
    name: 'Elias M',
    email: 'elias@exemplo.com',
    phone: '(11) 99999-9995',
    role: 'Membro',
  },
  {
    id: '6',
    name: 'Fernanda B',
    email: 'fernandab@exemplo.com',
    phone: '(11) 99999-9994',
    role: 'Membro',
  },
  {
    id: '7',
    name: 'Fernanda M',
    email: 'fernandam@exemplo.com',
    phone: '(11) 99999-9993',
    role: 'Membro',
  },
  { id: '8', name: 'Joao B', email: 'joao@exemplo.com', phone: '(11) 99999-9992', role: 'Membro' },
  {
    id: '9',
    name: 'Tomas M',
    email: 'tomas@exemplo.com',
    phone: '(11) 99999-9991',
    role: 'Membro',
  },
]

export const EMOTIONS = [
  {
    name: 'Felicidade',
    sub: ['Alegre', 'Orgulhoso', 'Aceito', 'Poderoso', 'Pacífico', 'Íntimo', 'Otimista'],
  },
  { name: 'Surpresa', sub: ['Assustado', 'Confuso', 'Espantado', 'Animado'] },
  {
    name: 'Tristeza',
    sub: ['Culpado', 'Abandonado', 'Desesperado', 'Deprimido', 'Solitário', 'Entediado'],
  },
  {
    name: 'Raiva',
    sub: ['Ameaçado', 'Odioso', 'Louco', 'Agressivo', 'Frustrado', 'Distante', 'Crítico'],
  },
  { name: 'Medo', sub: ['Assustado', 'Ansioso', 'Inseguro', 'Submisso', 'Rejeitado', 'Humilhado'] },
  { name: 'Desprezo', sub: ['Desrespeitoso', 'Repugnante', 'Revoltado'] },
]

export const ICEBREAKERS = [
  { category: 'Pessoal', text: 'Qual foi o melhor momento da sua semana e por quê?' },
  {
    category: 'Pessoal',
    text: 'Se você pudesse aprender uma nova habilidade instantaneamente, qual seria?',
  },
  { category: 'Negócios', text: 'Qual é o maior gargalo da sua empresa hoje?' },
  {
    category: 'Negócios',
    text: 'Qual decisão de negócios você tomou recentemente da qual mais se orgulha?',
  },
  { category: 'Impacto', text: 'Como você fez a diferença na vida de alguém recentemente?' },
  { category: 'Impacto', text: 'Qual causa social mais ressoa com seus valores atuais?' },
]

export const MEETINGS = [
  {
    id: '1',
    date: '2023-11-15T19:00:00Z',
    host: 'Rafael B',
    location: 'Sede YPO',
    status: 'Agendada',
  },
  {
    id: '2',
    date: '2023-10-15T19:00:00Z',
    host: 'Barbara F',
    location: 'Restaurante Central',
    status: 'Finalizada',
  },
  {
    id: '3',
    date: '2023-09-15T19:00:00Z',
    host: 'Guilherme M',
    location: 'Escritório Alfa',
    status: 'Finalizada',
  },
]

export const PARKING_LOT = [
  {
    id: 1,
    title: 'Planejamento do Retiro Anual',
    owner: 'Rafael B',
    urgency: 'Alta',
    status: 'Pendente',
  },
  {
    id: 2,
    title: 'Revisão das Regras de Confidencialidade',
    owner: 'Barbara F',
    urgency: 'Média',
    status: 'Pendente',
  },
  {
    id: 3,
    title: 'Definição do Orçamento 2024',
    owner: 'Guilherme M',
    urgency: 'Crítica',
    status: 'Resolvido',
  },
]

export const FINANCE_TRANSACTIONS = [
  { id: 1, date: '2023-10-01', description: 'Mensalidade Outubro', value: 5000, type: 'entrada' },
  { id: 2, date: '2023-10-15', description: 'Jantar Reunião #2', value: -1200, type: 'saida' },
  { id: 3, date: '2023-11-01', description: 'Mensalidade Novembro', value: 4500, type: 'entrada' },
  { id: 4, date: '2023-11-10', description: 'Reserva Espaço Retiro', value: -3000, type: 'saida' },
]
