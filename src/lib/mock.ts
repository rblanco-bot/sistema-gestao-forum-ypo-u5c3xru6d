export const MEMBERS = [
  { id: '1', name: 'Rafael', role: 'Moderador' },
  { id: '2', name: 'Barbara', role: 'Vice-Moderador' },
  { id: '3', name: 'Guilherme', role: 'Membro' },
  { id: '4', name: 'Andres', role: 'Membro' },
  { id: '5', name: 'Elias', role: 'Membro' },
]

export const MEETINGS = [
  { id: '1', date: '2023-10-01', status: 'Finalizada', host: 'Rafael', location: 'Sede' },
  { id: '2', date: '2023-11-01', status: 'Finalizada', host: 'Barbara', location: 'Sede' },
  { id: '3', date: '2023-12-01', status: 'Agendada', host: 'Guilherme', location: 'Sede' },
]

export const PARKING_LOT = [
  { id: '1', topic: 'Retiro anual', status: 'Pendente' },
  { id: '2', topic: 'Regras de confidencialidade', status: 'Resolvido' },
]

export const FINANCE_TRANSACTIONS = [
  { id: '1', value: 5000 },
  { id: '2', value: -1200 },
]

export const ICEBREAKERS = [
  // Pessoal (20)
  { category: 'Pessoal', text: 'Pelo que você está mais orgulhoso de si mesmo recentemente?' },
  { category: 'Pessoal', text: 'Qual é a sua melhor forma de se acalmar em momentos de estresse?' },
  { category: 'Pessoal', text: 'Qual foi o motivo da sua última grande gargalhada?' },
  { category: 'Pessoal', text: 'Como você lida com o sentimento de culpa?' },
  { category: 'Pessoal', text: 'Qual é a sua maneira preferida de confortar os outros?' },
  { category: 'Pessoal', text: 'De quem você sente mais orgulho e por quê?' },
  { category: 'Pessoal', text: 'Que música sempre eleva o seu astral?' },
  { category: 'Pessoal', text: 'O que faz você confiar em alguém rapidamente?' },
  { category: 'Pessoal', text: 'Como você mantém contato com pessoas queridas à distância?' },
  { category: 'Pessoal', text: 'Qual é a sua lembrança favorita de um tempo com amigos?' },
  { category: 'Pessoal', text: 'O que te faz sentir humilde?' },
  { category: 'Pessoal', text: 'Como você descreveria seu melhor amigo?' },
  { category: 'Pessoal', text: 'O que costuma te trazer um sentimento de nostalgia?' },
  { category: 'Pessoal', text: 'Qual foi uma emoção difícil que você superou recentemente?' },
  { category: 'Pessoal', text: 'O que te impede de fazer novas amizades, se houver algo?' },
  { category: 'Pessoal', text: 'Qual é o melhor conselho de relacionamento que você já recebeu?' },
  {
    category: 'Pessoal',
    text: 'Por qual pequena coisa você sentiu gratidão hoje ou recentemente?',
  },
  { category: 'Pessoal', text: 'Qual é a sua lembrança familiar mais preciosa?' },
  { category: 'Pessoal', text: 'Quando foi a última vez que você se sentiu vulnerável?' },
  { category: 'Pessoal', text: 'O que mais te faz sentir inspirado na vida pessoal?' },

  // Negócios (19)
  {
    category: 'Negócios',
    text: 'Qual foi o melhor investimento (tempo ou dinheiro) que você já fez no seu negócio?',
  },
  { category: 'Negócios', text: 'Como você costuma celebrar as conquistas da sua empresa?' },
  { category: 'Negócios', text: 'Qual habilidade você acredita que precisa melhorar como líder?' },
  { category: 'Negócios', text: 'Como você avalia a adaptabilidade da sua equipe a mudanças?' },
  {
    category: 'Negócios',
    text: 'Se pudesse jantar com qualquer líder de negócios, quem seria e por quê?',
  },
  { category: 'Negócios', text: 'Qual erro no trabalho te trouxe o maior aprendizado?' },
  { category: 'Negócios', text: 'Qual livro de negócios mais impactou a sua forma de atuar?' },
  {
    category: 'Negócios',
    text: 'Qual habilidade você acha que é subestimada no mundo dos negócios?',
  },
  {
    category: 'Negócios',
    text: 'Como você lida com os sinais de burnout em si mesmo ou na equipe?',
  },
  { category: 'Negócios', text: 'Como você prioriza tarefas quando tudo parece urgente?' },
  { category: 'Negócios', text: 'O que te mantém motivado durante crises no mercado?' },
  {
    category: 'Negócios',
    text: 'Como você define o equilíbrio entre vida e trabalho na sua rotina atual?',
  },
  { category: 'Negócios', text: 'Quais tendências do seu setor mais te preocupam ou animam?' },
  { category: 'Negócios', text: 'Quais qualidades você mais valoriza em um parceiro de negócios?' },
  { category: 'Negócios', text: 'Qual foi o melhor conselho que você já recebeu na sua carreira?' },
  { category: 'Negócios', text: 'O que mais te motiva no trabalho do dia a dia?' },
  { category: 'Negócios', text: 'Como você vê o futuro dos negócios na sua área daqui a 5 anos?' },
  { category: 'Negócios', text: 'Qual é a sua principal estratégia de produtividade?' },
  { category: 'Negócios', text: 'Como você costuma gerar novas ideias para sua empresa?' },

  // Impacto (20)
  { category: 'Impacto', text: 'Como a mentoria impactou a sua jornada até agora?' },
  { category: 'Impacto', text: 'Que legado você espera deixar no mundo?' },
  {
    category: 'Impacto',
    text: 'Como você alinha a missão da sua empresa com seus valores pessoais?',
  },
  { category: 'Impacto', text: 'Quais são os valores essenciais inegociáveis para você?' },
  {
    category: 'Impacto',
    text: 'Como você estimula a criatividade e inovação nas pessoas ao seu redor?',
  },
  {
    category: 'Impacto',
    text: 'Qual qualidade você considera indispensável em um verdadeiro líder?',
  },
  { category: 'Impacto', text: 'Qual conselho você daria ao seu eu de 20 anos?' },
  { category: 'Impacto', text: 'O que significa para você "fazer a diferença"?' },
  {
    category: 'Impacto',
    text: 'Qual foi o maior risco que você já tomou em prol de um impacto maior?',
  },
  {
    category: 'Impacto',
    text: 'Qual projeto ou iniciativa te trouxe maior sentimento de realização?',
  },
  {
    category: 'Impacto',
    text: 'Quais tendências futuras você acredita que terão o maior impacto social?',
  },
  {
    category: 'Impacto',
    text: 'Como você acha que podemos impactar positivamente as próximas gerações?',
  },
  {
    category: 'Impacto',
    text: 'Qual foi o melhor conselho sobre impacto social que você já ouviu?',
  },
  { category: 'Impacto', text: 'Como sua definição de impacto mudou ao longo dos anos?' },
  {
    category: 'Impacto',
    text: 'Como você equilibra a necessidade de inovação com a de estabilidade?',
  },
  { category: 'Impacto', text: 'Que transformação você gostaria de ver no seu setor?' },
  {
    category: 'Impacto',
    text: 'Qual empresa você mais admira por sua capacidade de inovação e impacto?',
  },
  { category: 'Impacto', text: 'Qual projeto atual tem mais significado para você e por quê?' },
  { category: 'Impacto', text: 'Qual é o maior desafio ao tentar medir o impacto de uma ação?' },
  { category: 'Impacto', text: 'Para você, o que define o sucesso verdadeiro ao final da vida?' },
]

export const EMOTIONS = {
  Alegria: {
    Otimista: ['Esperançoso', 'Inspirado'],
    Orgulhoso: ['Realizado', 'Confiante'],
    Pacífico: ['Amoroso', 'Grato'],
  },
  Tristeza: {
    Solitário: ['Isolado', 'Abandonado'],
    Vulnerável: ['Frágil', 'Inseguro'],
    Desespero: ['Angustiado', 'Vazio'],
  },
  Raiva: {
    Frustrado: ['Irritado', 'Impaciente'],
    Amargo: ['Indignado', 'Ressentido'],
    Agressivo: ['Provocado', 'Hostil'],
  },
  Medo: {
    Ansioso: ['Preocupado', 'Tenso'],
    Inseguro: ['Inferior', 'Inadequado'],
    Assustado: ['Apavorado', 'Pânico'],
  },
  Surpresa: {
    Espantado: ['Chocado', 'Incrédulo'],
    Confuso: ['Desorientado', 'Perplexo'],
    Animado: ['Eufórico', 'Energético'],
  },
}
