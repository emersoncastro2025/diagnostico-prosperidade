// ============================================
// PERGUNTAS DO DIAGNÓSTICO DE PROSPERIDADE
// 15 Perguntas com sistema de pontuação 0-3
// ============================================

const questions = [
  // Bloco 1 — Realidade financeira atual
  {
    id: 1,
    block: 'Realidade Financeira Atual',
    text: 'No mês passado, o que aconteceu com o seu dinheiro antes do fim do mês?',
    options: [
      { text: 'Acabou e precisei pegar emprestado ou usar crédito', points: 0 },
      { text: 'Acabou, mas me virei sem me endividar', points: 1 },
      { text: 'Sobrou um pouco, mas não guardei', points: 2 },
      { text: 'Sobrou e guardei ou investi', points: 3 }
    ]
  },
  {
    id: 2,
    block: 'Realidade Financeira Atual',
    text: 'Se você parar de trabalhar amanhã, por quantos meses consegue pagar todas as suas contas sem se endividar?',
    options: [
      { text: 'Menos de 1 mês', points: 0 },
      { text: '1 a 3 meses', points: 1 },
      { text: '3 a 6 meses', points: 2 },
      { text: 'Mais de 6 meses', points: 3 }
    ]
  },
  {
    id: 3,
    block: 'Realidade Financeira Atual',
    text: 'Você tem dívidas que não consegue pagar integralmente todo mês (cartão, cheque especial, empréstimo)?',
    options: [
      { text: 'Sim, várias', points: 0 },
      { text: 'Sim, uma ou duas', points: 1 },
      { text: 'Não, mas já tive', points: 2 },
      { text: 'Nunca tive dívidas fora de controle', points: 3 }
    ]
  },
  {
    id: 4,
    block: 'Realidade Financeira Atual',
    text: 'Quando pensa no futuro financeiro, o que domina sua cabeça?',
    options: [
      { text: 'Medo e ansiedade constante', points: 0 },
      { text: 'Incerteza — não sei o que esperar', points: 1 },
      { text: 'Esperança, mas ainda sem plano concreto', points: 2 },
      { text: 'Clareza — sei onde estou e para onde vou', points: 3 }
    ]
  },

  // Bloco 2 — Planejamento e hábitos
  {
    id: 5,
    block: 'Planejamento e Hábitos',
    text: 'Você tem alguma fonte de renda além do seu trabalho principal?',
    options: [
      { text: 'Não, só uma fonte de renda', points: 0 },
      { text: 'Às vezes, de forma eventual', points: 1 },
      { text: 'Sim, regularmente', points: 2 },
      { text: 'Sim, mais de duas fontes fixas', points: 3 }
    ]
  },
  {
    id: 6,
    block: 'Planejamento e Hábitos',
    text: 'Nos últimos 6 meses, você investiu dinheiro em você mesmo (curso, mentoria, livro pago)?',
    options: [
      { text: 'Não, não tenho condições', points: 0 },
      { text: 'Não, prefiro guardar o dinheiro', points: 1 },
      { text: 'Sim, menos de R$500', points: 2 },
      { text: 'Sim, mais de R$500', points: 3 }
    ]
  },
  {
    id: 7,
    block: 'Planejamento e Hábitos',
    text: 'Você sabe exatamente quanto vai ganhar e gastar no próximo mês?',
    options: [
      { text: 'Não faço ideia', points: 0 },
      { text: 'Tenho uma noção vaga', points: 1 },
      { text: 'Sei mais ou menos', points: 2 },
      { text: 'Tenho tudo planejado e registrado', points: 3 }
    ]
  },
  {
    id: 8,
    block: 'Planejamento e Hábitos',
    text: 'Você tem uma meta financeira específica com prazo definido para os próximos 12 meses?',
    options: [
      { text: 'Não tenho meta nenhuma', points: 0 },
      { text: 'Tenho um desejo vago', points: 1 },
      { text: 'Tenho uma meta, mas sem plano de ação', points: 2 },
      { text: 'Tenho meta, plano e acompanho regularmente', points: 3 }
    ]
  },

  // Bloco 3 — Crescimento e Independência
  {
    id: 9,
    block: 'Crescimento e Independência',
    text: 'Sua renda cresceu nos últimos 12 meses? Se sim, por quê?',
    options: [
      { text: 'Não cresceu', points: 0 },
      { text: 'Cresceu por acaso (aumento automático, bônus)', points: 1 },
      { text: 'Cresceu porque busquei ativamente', points: 2 },
      { text: 'Cresceu mais de 30% por uma estratégia minha', points: 3 }
    ]
  },
  {
    id: 10,
    block: 'Crescimento e Independência',
    text: 'Se você ficasse 30 dias sem trabalhar, sua renda continuaria chegando de alguma forma?',
    options: [
      { text: 'Não, zeraria completamente', points: 0 },
      { text: 'Cairia muito', points: 1 },
      { text: 'Cairia um pouco', points: 2 },
      { text: 'Chegaria normalmente, sem depender da minha presença', points: 3 }
    ]
  },
  {
    id: 11,
    block: 'Crescimento e Independência',
    text: 'Você tem ou já teve pessoas trabalhando para você (funcionário, prestador, parceiro)?',
    options: [
      { text: 'Nunca', points: 0 },
      { text: 'Já pensei nisso, mas não fiz', points: 1 },
      { text: 'Já tive, mas não deu certo', points: 2 },
      { text: 'Tenho hoje', points: 3 }
    ]
  },
  {
    id: 12,
    block: 'Crescimento e Independência',
    text: 'Com que frequência você toma decisões financeiras importantes sem medo paralisante?',
    options: [
      { text: 'Evito ao máximo tomar decisões grandes', points: 0 },
      { text: 'Decido, mas com muita insegurança', points: 1 },
      { text: 'Decido após pesquisar bastante', points: 2 },
      { text: 'Decido com clareza e aceito o risco conscientemente', points: 3 }
    ]
  },

  // Bloco 4 — Propósito e Legado
  {
    id: 13,
    block: 'Propósito e Legado',
    text: 'Você tem ativos que geram renda passiva regularmente (imóvel alugado, dividendos, negócio sem sua presença)?',
    options: [
      { text: 'Não tenho nada disso', points: 0 },
      { text: 'Tenho algo pequeno, menos de R$500/mês', points: 1 },
      { text: 'Sim, entre R$500 e R$3.000/mês', points: 2 },
      { text: 'Sim, cobre boa parte ou todo meu custo de vida', points: 3 }
    ]
  },
  {
    id: 14,
    block: 'Propósito e Legado',
    text: 'Você tem clareza de qual impacto quer deixar no mundo ou na sua área nos próximos 10 anos?',
    options: [
      { text: 'Não penso nisso', points: 0 },
      { text: 'Penso vagamente, mas sem definição', points: 1 },
      { text: 'Tenho uma visão, mas ainda estou construindo', points: 2 },
      { text: 'Tenho visão clara e já estou agindo concretamente nisso', points: 3 }
    ]
  },
  {
    id: 15,
    block: 'Propósito e Legado',
    text: 'Você costuma ensinar, mentorar ou influenciar outras pessoas em direção ao crescimento financeiro?',
    options: [
      { text: 'Não, cuido da minha própria vida', points: 0 },
      { text: 'Às vezes, de forma informal', points: 1 },
      { text: 'Sim, com frequência', points: 2 },
      { text: 'É parte central do meu trabalho ou missão', points: 3 }
    ]
  }
];

const profiles = [
  {
    level: 0,
    name: 'Escravo',
    minScore: 0,
    maxScore: 15,
    description: 'Você está preso num ciclo de sobrevivência reativa. O dinheiro controla você — não o contrário. A boa notícia: reconhecer isso é o primeiro passo para sair. A maioria das pessoas nunca chega nem aqui.',
    icon: '⚫'
  },
  {
    level: 1,
    name: 'Sobrevivente',
    minScore: 16,
    maxScore: 27,
    description: 'Você paga as contas, mas não avança. Existe uma estabilidade frágil: qualquer imprevisto desestabiliza tudo. Você tem potencial para crescer, mas está faltando estratégia e intenção.',
    icon: '🔵'
  },
  {
    level: 2,
    name: 'Conquistador',
    minScore: 28,
    maxScore: 36,
    description: 'Você está em movimento. Cresce, investe em si mesmo e começa a construir independência. O próximo nível exige que o dinheiro trabalhe por você — não só você pelo dinheiro.',
    icon: '🟡'
  },
  {
    level: 3,
    name: 'Governante',
    minScore: 37,
    maxScore: 45,
    description: 'Você opera num nível diferente. Tem ativos, visão de longo prazo e influência. O foco agora é multiplicar e deixar legado — não apenas acumular.',
    icon: '🟢'
  }
];

// Exportar para window para acessível pelo script.js
window.questions = questions;
window.profiles = profiles;
