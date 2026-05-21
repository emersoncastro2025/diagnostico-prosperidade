// ============================================
// DIAGNÓSTICO DOS 3 NÍVEIS DA PROSPERIDADE
// Script Principal
// ============================================

const app = {
  currentScreen: 'landing',
  userData: {
    name: '',
    whatsapp: '',
    instagram: '',
    area: '',
    income: ''
  },
  answers: {},
  chartInstance: null,

  questions: [
    {
      id: 1,
      pillar: 'fé',
      text: 'Dízimo e oferto regularmente, mesmo quando o dinheiro está curto.'
    },
    {
      id: 2,
      pillar: 'fé',
      text: 'Tomo decisões financeiras buscando orientação em Deus, não só na lógica.'
    },
    {
      id: 3,
      pillar: 'fé',
      text: 'Tenho paz em relação ao dinheiro, não vivo com ansiedade ou medo do futuro.'
    },
    {
      id: 4,
      pillar: 'mentalidade',
      text: 'Sei exatamente quanto entra e quanto sai do meu dinheiro todo mês.'
    },
    {
      id: 5,
      pillar: 'mentalidade',
      text: 'Tenho dívidas que me impedem de avançar financeiramente.',
      inverted: true
    },
    {
      id: 6,
      pillar: 'mentalidade',
      text: 'Consigo guardar dinheiro todos os meses, mesmo que seja pouco.'
    },
    {
      id: 7,
      pillar: 'mentalidade',
      text: 'Acredito que posso ganhar mais do que ganho hoje — e estou fazendo algo para isso.'
    },
    {
      id: 8,
      pillar: 'caráter',
      text: 'Invisto dinheiro todo mês — em aplicações, negócio ou desenvolvimento pessoal.'
    },
    {
      id: 9,
      pillar: 'caráter',
      text: 'Tenho metas financeiras claras para os próximos 12 meses e um plano real para atingi-las.'
    },
    {
      id: 10,
      pillar: 'caráter',
      text: 'Minha prosperidade já impacta ou está sendo preparada para impactar a vida de outras pessoas.'
    }
  ],

  levels: {
    1: {
      name: 'Sobrevivente',
      minScore: 1.0,
      maxScore: 2.4,
      verse: '"Nunca vi desamparado o justo, nem a sua descendência mendigar o pão." — Salmos 37:25',
      description: 'Você está no nível de Sobrevivente — focado em suprir as necessidades básicas do dia a dia. Sua mentalidade ainda é de carência e proteção. Deus promete que suas necessidades não faltarão, mas é hora de evoluir. Você precisa fortalecer sua fé em Deus, reorganizar sua vida financeira com intenção e começar a mudar sua mentalidade de escassez para mentalidade de conquistador(a).',
      nextStep: 'Fortaleça sua base espiritual: estude os princípios bíblicos do dinheiro, organize seu orçamento, comece a dizimar com fé e mude sua mentalidade de sobrevivência para prosperidade.',
      icon: '🔵'
    },
    2: {
      name: 'Conquistador',
      minScore: 2.5,
      maxScore: 3.9,
      verse: '"Sede fortes e corajosos. Não tenhais medo nem vos assusteis, porque o Senhor, vosso Deus, vai convosco." — Josué 1:9',
      description: 'Você é um(a) Conquistador(a)! Já saiu da mentalidade de sobrevivência e tem coragem de sonhar, agir e conquistar sua terra prometida. Você realiza objetivos, desfruta dos frutos e está em crescimento. Você tem fé ativa e mentalidade de abundância. O próximo nível exige que você desenvolva caráter ainda mais sólido e se prepare para impactar outras vidas — é hora de pensar além de você mesmo.',
      nextStep: 'Aprofunde seu caráter e integridade: invista continuamente em seu desenvolvimento pessoal, fortaleça relacionamentos de qualidade e comece a pensar estrategicamente em como sua prosperidade pode gerar impacto e oportunidades para outros.',
      icon: '🟡'
    },
    3: {
      name: 'Governante',
      minScore: 4.0,
      maxScore: 5.0,
      verse: '"E o Senhor estava com José, e ele foi um homem próspero." — Gênesis 39:2',
      description: 'Você é um(a) Governante! Atingiu o nível máximo de prosperidade bíblica. Como José, você desenvolveu caráter sólido, habilidades únnicas e está preparado(a) para receber e executar estratégias de Deus que transformam vidas. Sua prosperidade transcende você — gera emprego, impacto, legado e referência. Você é uma bênção para multidões e seu governo é sinal da sabedoria e favor de Deus.',
      nextStep: 'Mantenha-se humilde, íntegro(a) e conectado(a) a Deus. Cultive liderança servidora, expanda seu impacto estrategicamente e prepare a próxima geração para governar com excelência e propósito.',
      icon: '🟢'
    }
  },

  init() {
    this.render();
    this.attachEventListeners();
  },

  render() {
    const container = document.getElementById('app');
    container.innerHTML = '';

    switch (this.currentScreen) {
      case 'landing':
        container.appendChild(this.createLandingScreen());
        break;
      case 'form':
        container.appendChild(this.createFormScreen());
        break;
      case 'quiz':
        container.appendChild(this.createQuizScreen());
        break;
      case 'result':
        container.appendChild(this.createResultScreen());
        break;
    }

    this.attachEventListeners();
  },

  createLandingScreen() {
    const screen = document.createElement('div');
    screen.className = 'screen landing-screen';

    const content = document.createElement('div');
    content.className = 'screen-content';

    content.innerHTML = `
      <div class="landing-header">
        <div class="landing-icon"></div>
        <h1 class="landing-title">Diagnóstico dos 3 Níveis da Prosperidade</h1>
        <p class="landing-subtitle">— Sobrevivente • Conquistador • Governante —</p>
        <p class="landing-description">
          Você é Sobrevivente, Conquistador ou Governante? Descubra seu nível de prosperidade e o caminho exato para avançar segundo a Palavra de Deus.
        </p>
        <div class="highlight-chips">
          <div class="chip">✓ 10 Perguntas</div>
          <div class="chip">✓ Análise em 3 Pilares</div>
          <div class="chip">✓ Menos de 2 minutos</div>
        </div>
      </div>

      <h2 class="section-title">Os 3 Pilares Avaliados</h2>
      <div class="cards-grid">
        <div class="card">
          <div class="card-icon">💰</div>
          <div class="card-title">Fazer Dinheiro Novo</div>
          <div class="card-description">Fé, confiança em Deus e geração de renda</div>
        </div>
        <div class="card">
          <div class="card-icon">📊</div>
          <div class="card-title">Administrar</div>
          <div class="card-description">Controle financeiro e organização</div>
        </div>
        <div class="card">
          <div class="card-icon">📈</div>
          <div class="card-title">Multiplicar Riqueza</div>
          <div class="card-description">Investimento, metas e impacto</div>
        </div>
      </div>

      <h2 class="section-title">Os 3 Níveis da Prosperidade</h2>
      <div class="cards-grid">
        <div class="card level-card level-1">
          <div class="level-badge level-1">Nível 1</div>
          <div class="level-title level-1">Sobrevivente</div>
          <div class="card-description">Focado em suprir necessidades básicas. Mentalidade de carência e proteção.</div>
        </div>
        <div class="card level-card level-2">
          <div class="level-badge level-2">Nível 2</div>
          <div class="level-title level-2">Conquistador</div>
          <div class="card-description">Sai da mentalidade de sobrevivência. Tem coragem, sonha e age com propósito.</div>
        </div>
        <div class="card level-card level-3">
          <div class="level-badge level-3">Nível 3</div>
          <div class="level-title level-3">Governante</div>
          <div class="card-description">Caráter sólido. Impacta vidas. Estratégia de Deus que transforma multidões.</div>
        </div>
      </div>

      <div style="text-align: center; margin-top: 50px;">
        <button class="form-button" style="max-width: 350px; background-color: #27AE60;" data-action="startDiagnosis">
          🕊️ Iniciar Diagnóstico →
        </button>
        <p style="margin-top: 20px; font-size: 0.9rem; color: var(--color-text-secondary);">
          ⏱ Tempo estimado: 1 a 2 minutos
        </p>
      </div>
    `;

    screen.appendChild(content);
    return screen;
  },

  createFormScreen() {
    const screen = document.createElement('div');
    screen.className = 'screen form-screen';

    const content = document.createElement('div');
    content.className = 'screen-content';

    const form = document.createElement('div');
    form.className = 'form-container';

    form.innerHTML = `
      <div class="form-header">
        <h2 class="form-title">Antes do Diagnóstico</h2>
        <p class="form-subtitle">Complete suas informações para personalizarmos sua experiência</p>
      </div>

      <form id="userForm" class="form-content">
        <div class="form-group">
          <label class="form-label">
            Nome Completo <span class="required">*</span>
          </label>
          <input type="text" class="form-input" id="nameInput" placeholder="Seu nome completo" required>
        </div>

        <div class="form-group">
          <label class="form-label">
            WhatsApp <span class="required">*</span>
          </label>
          <input type="tel" class="form-input" id="whatsappInput" placeholder="(11) 99999-9999" required>
          <p class="form-hint">Este número será usado para enviar o resultado do diagnóstico via WhatsApp</p>
        </div>

        <div class="form-group">
          <label class="form-label">Instagram</label>
          <input type="text" class="form-input" id="instagramInput" placeholder="@seuinstagram">
        </div>

        <div class="form-group">
          <label class="form-label">
            Área de Atuação <span class="required">*</span>
          </label>
          <input type="text" class="form-input" id="areaInput" placeholder="Ex: Consultoria, Marketing, Advocacia..." required>
        </div>

        <div class="form-group">
          <label class="form-label">
            Faixa de Faturamento Mensal <span class="required">*</span>
          </label>
          <select class="form-select" id="incomeInput" required>
            <option value="">Selecione uma faixa</option>
            <option value="ate-2000">Até R$ 2.000</option>
            <option value="2001-5000">R$ 2.001 – R$ 5.000</option>
            <option value="5001-10000">R$ 5.001 – R$ 10.000</option>
            <option value="10001-20000">R$ 10.001 – R$ 20.000</option>
            <option value="acima-20000">Acima de R$ 20.000</option>
          </select>
        </div>

        <button type="button" class="form-button" id="submitFormBtn" data-action="startQuiz">
          Iniciar Diagnóstico →
        </button>
      </form>
    `;

    content.appendChild(form);
    screen.appendChild(content);
    return screen;
  },

  createQuizScreen() {
    const screen = document.createElement('div');
    screen.className = 'screen quiz-screen';

    const content = document.createElement('div');
    content.className = 'screen-content';

    const container = document.createElement('div');
    container.className = 'quiz-container';

    const currentQuestion = this.questions[this.currentQuestionIndex];
    const totalAnswered = Object.keys(this.answers).length;
    const progressPercent = Math.round((totalAnswered / this.questions.length) * 100);

    const pillarEmojis = {
      'fé': '💰',
      'mentalidade': '📊',
      'caráter': '📈'
    };

    const pillarNames = {
      'fé': 'Fazer Dinheiro Novo',
      'mentalidade': 'Administrar',
      'caráter': 'Multiplicar Riqueza'
    };

    container.innerHTML = `
      <div class="quiz-header">
        <div class="quiz-pillar">
          <div class="quiz-pillar-badge">${pillarEmojis[currentQuestion.pillar]}</div>
          <div class="quiz-pillar-text">${pillarNames[currentQuestion.pillar]}</div>
        </div>
        <div class="quiz-progress-label">Pergunta ${currentQuestion.id} de 10</div>
        <div class="quiz-percentage">${progressPercent}%</div>
      </div>

      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width: ${progressPercent}%"></div>
      </div>

      <div class="quiz-question">
        <div class="quiz-number">${currentQuestion.id}</div>
        <p class="quiz-question-text">${currentQuestion.text}</p>
        ${currentQuestion.inverted ? '<p style="font-size: 0.85rem; color: var(--color-gold); margin-top: 10px;">⚠️ Pergunta invertida</p>' : ''}
      </div>

      <div class="quiz-scale">
        <span>🔴<br/>Discordo totalmente</span>
        <span>Concordo totalmente<br/>🟢</span>
      </div>

      <div class="quiz-options" id="quizOptions">
        ${[1, 2, 3, 4, 5].map(value => {
          const isSelected = this.answers[currentQuestion.id] === value;
          return `
            <button
              type="button"
              class="quiz-option ${isSelected ? 'selected' : ''}"
              data-value="${value}"
              data-question="${currentQuestion.id}"
            >
              ${value}
            </button>
          `;
        }).join('')}
      </div>

      <div class="quiz-footer">
        <button
          type="button"
          class="quiz-button prev"
          data-action="prevQuestion"
          ${this.currentQuestionIndex === 0 ? 'disabled' : ''}
        >
          ← Anterior
        </button>
        <div class="quiz-counter">${totalAnswered} de ${this.questions.length} respondidas</div>
      </div>
    `;

    content.appendChild(container);
    screen.appendChild(content);
    return screen;
  },

  createResultScreen() {
    const result = this.calculateResult();
    const levelData = this.levels[result.level];

    const screen = document.createElement('div');
    screen.className = 'screen result-screen';

    const content = document.createElement('div');
    content.className = 'screen-content';

    const container = document.createElement('div');
    container.className = 'result-container';

    const levelColors = {
      1: { bg: '#E6F1FB', text: '#0C447C', border: '#B5D4F4' },
      2: { bg: '#FAEEDA', text: '#633806', border: '#FAC775' },
      3: { bg: '#EAF3DE', text: '#27500A', border: '#C0DD97' }
    };

    const colors = levelColors[result.level];

    container.innerHTML = `
      <div class="result-header">
        <div class="result-icon">👑</div>
        <p class="result-greeting">Olá, ${this.userData.name}!</p>
        <p class="result-subtitle">Seu diagnóstico está pronto</p>
      </div>

      <div class="result-level" style="background-color: ${colors.bg}; border: 2px solid ${colors.border};">
        <div class="result-level-title" style="color: ${colors.text}; margin-bottom: 15px;">Nível ${result.level}: ${levelData.icon} ${levelData.name}</div>
        <div style="text-align: center;">
          <div class="result-score" style="color: ${colors.text};">${result.score.toFixed(1)}</div>
          <div class="result-score-label" style="color: ${colors.text};">de 5.0</div>
        </div>
      </div>

      <div class="result-description">
        ${levelData.description}
      </div>

      <div class="result-verse">
        ${levelData.verse}
      </div>

      <h3 style="font-size: 1.1rem; margin-bottom: 20px; color: var(--color-text-primary); font-weight: 600;">
        Análise dos 3 Pilares
      </h3>

      <div class="chart-container">
        <canvas id="radarChart"></canvas>
      </div>

      <div class="pillars-breakdown">
        <div class="pillar-result pillar-1">
          <div class="pillar-result-title">💰 Fazer Dinheiro Novo</div>
          <div class="pillar-result-score pillar-1">${result.pillars.fé.toFixed(1)}</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill pillar-1" style="width: ${(result.pillars.fé / 5) * 100}%"></div>
          </div>
          <div class="pillar-result-label">${(result.pillars.fé / 5 * 100).toFixed(0)}% completado</div>
        </div>

        <div class="pillar-result pillar-2">
          <div class="pillar-result-title">📊 Administrar</div>
          <div class="pillar-result-score pillar-2">${result.pillars.mentalidade.toFixed(1)}</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill pillar-2" style="width: ${(result.pillars.mentalidade / 5) * 100}%"></div>
          </div>
          <div class="pillar-result-label">${(result.pillars.mentalidade / 5 * 100).toFixed(0)}% completado</div>
        </div>

        <div class="pillar-result pillar-3">
          <div class="pillar-result-title">📈 Multiplicar Riqueza</div>
          <div class="pillar-result-score pillar-3">${result.pillars.caráter.toFixed(1)}</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill pillar-3" style="width: ${(result.pillars.caráter / 5) * 100}%"></div>
          </div>
          <div class="pillar-result-label">${(result.pillars.caráter / 5 * 100).toFixed(0)}% completado</div>
        </div>
      </div>

      <div class="next-step-card">
        <div class="next-step-title">📍 Próximo Passo</div>
        <div class="next-step-description">${levelData.nextStep}</div>
      </div>

      <button class="result-button" data-action="restartDiagnosis">
        ↻ Refazer diagnóstico
      </button>
    `;

    content.appendChild(container);
    screen.appendChild(content);

    // Renderizar gráfico após DOM estar pronto
    setTimeout(() => this.renderRadarChart(result), 100);

    return screen;
  },

  renderRadarChart(result) {
    const ctx = document.getElementById('radarChart');
    if (!ctx || !result) return;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Fazer Dinheiro Novo', 'Administrar', 'Multiplicar Riqueza'],
        datasets: [
          {
            label: 'Sua Pontuação',
            data: [result.pillars.fé, result.pillars.mentalidade, result.pillars.caráter],
            borderColor: '#D4AF37',
            backgroundColor: 'rgba(212, 175, 55, 0.15)',
            borderWidth: 2,
            pointBackgroundColor: '#D4AF37',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
          padding: 30
        },
        scales: {
          r: {
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1,
              font: { size: 10 },
              color: '#999',
              padding: 10
            },
            grid: {
              color: 'rgba(212, 175, 55, 0.1)'
            },
            pointLabels: {
              font: { size: 11, weight: '500' },
              color: '#B0B0B0',
              padding: 15,
              display: true
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              font: { size: 11 },
              color: '#B0B0B0',
              padding: 20
            }
          },
          filler: {
            propagate: true
          }
        }
      }
    });
  },

  calculateResult() {
    const pillars = {
      fé: 0,
      mentalidade: 0,
      caráter: 0
    };

    const pillarCounts = {
      fé: 0,
      mentalidade: 0,
      caráter: 0
    };

    this.questions.forEach(question => {
      if (this.answers[question.id]) {
        // Se a pergunta é invertida, converter a resposta
        let value = this.answers[question.id];
        if (question.inverted) {
          value = 6 - value; // Inverter: 5→1, 4→2, 3→3, 2→4, 1→5
        }

        pillars[question.pillar] += value;
        pillarCounts[question.pillar]++;
      }
    });

    // Calcular média por pilar
    Object.keys(pillars).forEach(pillar => {
      if (pillarCounts[pillar] > 0) {
        pillars[pillar] = pillars[pillar] / pillarCounts[pillar];
      }
    });

    // Calcular score geral
    const score = (pillars.fé + pillars.mentalidade + pillars.caráter) / 3;

    // Encontrar o pilar mais fraco
    const minPillar = Math.min(pillars.fé, pillars.mentalidade, pillars.caráter);

    // Determinar nível com lógica mais sofisticada
    // O pilar mais fraco é crítico - determina o teto máximo do nível
    let level = 1;

    if (minPillar < 2.0) {
      // Pilar crítico muito baixo → Sobrevivente
      level = 1;
    } else if (minPillar < 3.5) {
      // Pilar crítico moderado → máximo Conquistador
      level = score >= 2.5 ? 2 : 1;
    } else {
      // Pilar crítico forte → pode ser Governante
      level = score >= 4.0 ? 3 : (score >= 2.5 ? 2 : 1);
    }

    return { score, pillars, level };
  },

  attachEventListeners() {
    // Landing screen
    const startBtn = document.querySelector('[data-action="startDiagnosis"]');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.goToScreen('form'));
    }

    // Form screen
    const formInputs = document.querySelectorAll('#userForm input, #userForm select');
    const submitBtn = document.getElementById('submitFormBtn');

    if (formInputs.length > 0 && submitBtn) {
      const updateButtonState = () => {
        const name = document.getElementById('nameInput')?.value?.trim();
        const whatsapp = document.getElementById('whatsappInput')?.value?.trim();
        const area = document.getElementById('areaInput')?.value?.trim();
        const income = document.getElementById('incomeInput')?.value?.trim();

        const isValid = name && whatsapp && area && income;
        submitBtn.disabled = !isValid;
      };

      formInputs.forEach(input => {
        input.addEventListener('change', updateButtonState);
        input.addEventListener('input', updateButtonState);
      });

      submitBtn.addEventListener('click', () => {
        this.userData = {
          name: document.getElementById('nameInput').value,
          whatsapp: document.getElementById('whatsappInput').value,
          instagram: document.getElementById('instagramInput').value,
          area: document.getElementById('areaInput').value,
          income: document.getElementById('incomeInput').value
        };

        this.currentQuestionIndex = 0;
        this.answers = {};
        this.goToScreen('quiz');
      });

      updateButtonState();
    }

    // Quiz screen
    const optionButtons = document.querySelectorAll('.quiz-option');
    optionButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const questionId = parseInt(e.target.dataset.question);
        const value = parseInt(e.target.dataset.value);

        this.answers[questionId] = value;

        // Atualizar UI
        document.querySelectorAll(`[data-question="${questionId}"]`).forEach(b => {
          b.classList.remove('selected');
        });
        e.target.classList.add('selected');

        // Avançar após 300ms
        setTimeout(() => this.nextQuestion(), 300);
      });
    });

    const prevBtn = document.querySelector('[data-action="prevQuestion"]');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prevQuestion());
    }

    // Result screen
    const restartBtn = document.querySelector('[data-action="restartDiagnosis"]');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.goToScreen('landing');
      });
    }
  },

  goToScreen(screenName) {
    this.currentScreen = screenName;
    this.render();
  },

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.render();
    } else {
      // Quiz completo, ir para resultado
      this.goToScreen('result');
    }
  },

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.render();
    }
  }
};

app.currentQuestionIndex = 0;

// Inicializar app quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}
