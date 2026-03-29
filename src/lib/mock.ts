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
    name: 'MEDO',
    color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800 border-yellow-300',
    sub: [
      { name: 'Assustado', sub: ['Desamparado', 'Amedrontado'] },
      { name: 'Ansioso', sub: ['Sobrecarregado', 'Preocupado'] },
      { name: 'Inseguro', sub: ['Inadequado', 'Inferior'] },
      { name: 'Fraco', sub: ['Inútil', 'Insignificante'] },
      { name: 'Rejeitado', sub: ['Excluído', 'Perseguido'] },
      { name: 'Ameaçado', sub: ['Nervoso', 'Exposto'] },
    ],
  },
  {
    name: 'RAIVA',
    color: 'bg-red-100 hover:bg-red-200 text-red-800 border-red-300',
    sub: [
      { name: 'Decepcionado', sub: ['Traído', 'Ressentido'] },
      { name: 'Humilhado', sub: ['Desrespeitado', 'Ridicularizado'] },
      { name: 'Amargo', sub: ['Indignado', 'Violado'] },
      { name: 'Louco', sub: ['Furioso', 'Invejoso'] },
      { name: 'Agressivo', sub: ['Provocado', 'Hostil'] },
      { name: 'Frustrado', sub: ['Enfurecido', 'Irritado'] },
      { name: 'Distante', sub: ['Afastado', 'Entorpecido'] },
      { name: 'Crítico', sub: ['Cético', 'Depreciativo'] },
    ],
  },
  {
    name: 'TRISTEZA',
    color: 'bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300',
    sub: [
      { name: 'Machucado', sub: ['Desapontado', 'Envergonhado'] },
      { name: 'Depressivo', sub: ['Inferior', 'Vazio'] },
      { name: 'Culpado', sub: ['Arrependido', 'Envergonhado'] },
      { name: 'Desespero', sub: ['Impotente', 'Enlutado'] },
      { name: 'Vulnerável', sub: ['Frágil', 'Vitimizado'] },
      { name: 'Solitário', sub: ['Abandonado', 'Isolado'] },
    ],
  },
  {
    name: 'FELICIDADE',
    color: 'bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300',
    sub: [
      { name: 'Otimista', sub: ['Inspirado', 'Esperançoso'] },
      { name: 'Confiante', sub: ['Íntimo', 'Sensível'] },
      { name: 'Pacífico', sub: ['Grato', 'Amoroso'] },
      { name: 'Poderoso', sub: ['Criativo', 'Corajoso'] },
      { name: 'Aceito', sub: ['Valorizado', 'Respeitado'] },
      { name: 'Orgulhoso', sub: ['Confiante', 'Bem-Sucedido'] },
      { name: 'Interessado', sub: ['Inquisitivo', 'Curioso'] },
      { name: 'Contente', sub: ['Alegre', 'Livre'] },
      { name: 'Brincalhão', sub: ['Atrevido', 'Estimulado'] },
    ],
  },
  {
    name: 'SURPRESA',
    color: 'bg-purple-100 hover:bg-purple-200 text-purple-800 border-purple-300',
    sub: [
      { name: 'Animado', sub: ['Energizado', 'Ansioso'] },
      { name: 'Maravilhado', sub: ['Temeroso', 'Surpreso'] },
      { name: 'Confuso', sub: ['Perplexo', 'Desiludido'] },
      { name: 'Alarmado', sub: ['Chocado', 'Desanimado'] },
    ],
  },
  {
    name: 'DESPREZO',
    color: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border-emerald-300',
    sub: [
      { name: 'Cansado', sub: ['Sem Foco', 'Sonolento'] },
      { name: 'Estressado', sub: ['Descontrolado', 'Sobrecarregado'] },
      { name: 'Ocupado', sub: ['Apressado', 'Pressionado'] },
      { name: 'Entediado', sub: ['Apático', 'Indiferente'] },
    ],
  },
]

export const ICEBREAKERS = [
  // Pessoal
  { category: 'Pessoal', text: 'O que te faz sentir orgulho de si mesmo?' },
  { category: 'Pessoal', text: 'Qual é a sua forma favorita de se acalmar quando está irritado?' },
  { category: 'Pessoal', text: 'Qual foi a última coisa que te fez gargalhar?' },
  { category: 'Pessoal', text: 'Como você lida com sentimentos de culpa?' },
  { category: 'Pessoal', text: 'Como você conforta outras pessoas quando estão mal?' },
  { category: 'Pessoal', text: 'Quando foi a última vez que você sentiu orgulho de outra pessoa?' },
  { category: 'Pessoal', text: 'Qual é uma música que sempre levanta o seu astral?' },
  { category: 'Pessoal', text: 'Como você sabe quando pode confiar em alguém?' },
  {
    category: 'Pessoal',
    text: 'Como você mantém contato com amigos ou familiares que moram longe?',
  },
  { category: 'Pessoal', text: 'Qual é a sua forma favorita de passar tempo com amigos?' },
  { category: 'Pessoal', text: 'Qual situação recente fez você se sentir humilde?' },
  {
    category: 'Pessoal',
    text: 'O que você mais gosta no seu melhor amigo? O que essa pessoa diria sobre você?',
  },
  { category: 'Pessoal', text: 'O que sempre te dá nostalgia?' },
  { category: 'Pessoal', text: 'Qual é a emoção que você acha mais difícil de expressar?' },
  { category: 'Pessoal', text: 'Quão fácil é para você fazer novas amizades?' },
  { category: 'Pessoal', text: 'Qual é o melhor conselho de relacionamento que você já recebeu?' },
  { category: 'Pessoal', text: 'O que recentemente fez você se sentir grato?' },
  { category: 'Pessoal', text: 'Qual é a sua lembrança favorita com um familiar?' },
  { category: 'Pessoal', text: 'O que recentemente fez você se sentir vulnerável?' },
  { category: 'Pessoal', text: 'O que sempre te faz sentir inspirado?' },
  // Negócios
  { category: 'Negócios', text: 'Qual foi o melhor investimento que você fez na sua carreira?' },
  { category: 'Negócios', text: 'Como você celebra conquistas importantes nos negócios?' },
  { category: 'Negócios', text: 'Qual é uma habilidade que você está trabalhando para melhorar?' },
  {
    category: 'Negócios',
    text: 'Como você faz para que sua empresa ou equipe se mantenha adaptável a mudanças?',
  },
  {
    category: 'Negócios',
    text: 'Se você pudesse jantar com qualquer líder empresarial, vivo ou falecido, quem seria?',
  },
  {
    category: 'Negócios',
    text: 'Qual é um erro que você cometeu nos negócios e o que aprendeu com ele?',
  },
  { category: 'Negócios', text: 'Qual é o seu livro de negócios favorito e por quê?' },
  { category: 'Negócios', text: 'Qual é a habilidade de negócios mais subestimada?' },
  { category: 'Negócios', text: 'Você já passou por burnout? Como lidou com isso?' },
  { category: 'Negócios', text: 'Como você prioriza tarefas quando tudo parece urgente?' },
  { category: 'Negócios', text: 'Como você mantém sua equipe motivada em tempos difíceis?' },
  {
    category: 'Negócios',
    text: 'Como você mantém o equilíbrio entre vida pessoal e profissional?',
  },
  { category: 'Negócios', text: 'Como você se mantém atualizado com as tendências do seu setor?' },
  {
    category: 'Negócios',
    text: 'Qual é a primeira coisa que você busca em um potencial parceiro de negócios?',
  },
  { category: 'Negócios', text: 'Qual é o melhor conselho de negócios que você já recebeu?' },
  { category: 'Negócios', text: 'Como você se mantém motivado no trabalho?' },
  {
    category: 'Negócios',
    text: 'Qual é a maior tendência que você vê moldando o futuro dos negócios?',
  },
  {
    category: 'Negócios',
    text: 'Qual é a sua estratégia favorita para se manter produtivo em um dia corrido?',
  },
  { category: 'Negócios', text: 'Qual é o seu processo para gerar novas ideias ou soluções?' },
  // Impacto
  {
    category: 'Impacto',
    text: 'Qual papel a mentoria desempenha no seu desenvolvimento profissional?',
  },
  { category: 'Impacto', text: 'Qual legado você quer deixar?' },
  {
    category: 'Impacto',
    text: 'Como você faz para que seu negócio se mantenha alinhado com sua missão e valores?',
  },
  {
    category: 'Impacto',
    text: 'Quais valores você acredita serem essenciais para construir um legado duradouro?',
  },
  { category: 'Impacto', text: 'Como você incentiva a criatividade na sua equipe ou negócio?' },
  { category: 'Impacto', text: 'Qual é a qualidade mais importante que um líder deveria ter?' },
  { category: 'Impacto', text: 'O que você diria ao seu eu de 20 anos?' },
  {
    category: 'Impacto',
    text: 'Você pode compartilhar um momento na sua carreira em que sentiu que fez diferença?',
  },
  { category: 'Impacto', text: 'Qual foi o maior risco que você correu na sua carreira?' },
  { category: 'Impacto', text: 'Qual foi o projeto mais gratificante em que você trabalhou?' },
  {
    category: 'Impacto',
    text: 'Quais tendências recentes no seu setor vão moldar o futuro do seu trabalho?',
  },
  {
    category: 'Impacto',
    text: 'Como você acha que seu trabalho vai impactar as gerações futuras?',
  },
  {
    category: 'Impacto',
    text: 'Qual é o melhor conselho que você recebeu sobre criar impacto nos negócios?',
  },
  { category: 'Impacto', text: 'Como você define ‘impacto nos negócios’ na sua função?' },
  {
    category: 'Impacto',
    text: 'Como você equilibra inovação com a necessidade de estabilidade nos negócios?',
  },
  {
    category: 'Impacto',
    text: 'Qual é uma coisa que você acha que vai transformar seu setor nos próximos cinco anos?',
  },
  { category: 'Impacto', text: 'Qual é a empresa mais inovadora, na sua opinião, atualmente?' },
  {
    category: 'Impacto',
    text: 'Você pode compartilhar um projeto em que trabalhou que teve um impacto significativo na sua organização?',
  },
  { category: 'Impacto', text: 'Qual é o maior desafio que você enfrenta ao medir impacto?' },
  { category: 'Impacto', text: 'Como você define sucesso nos negócios?' },
]

export const USED_ICEBREAKERS = [
  'O que te faz sentir orgulho de si mesmo?',
  'Qual foi o melhor investimento que você fez na sua carreira?',
  'Qual papel a mentoria desempenha no seu desenvolvimento profissional?',
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
