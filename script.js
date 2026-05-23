// ============================================
// DIAGNÓSTICO DE PROSPERIDADE FINANCEIRA
// Script Principal - Versão 3.0
// Sistema de 15 perguntas com pontuação 0-3
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
  currentQuestionIndex: 0,

  // Importar as perguntas do arquivo questions.js (carregado via <script>)
  get questions() {
    return typeof window !== 'undefined' && window.questions ? window.questions : [];
  },

  get profiles() {
    return typeof window !== 'undefined' && window.profiles ? window.profiles : [];
  },

  webhookUrl: 'https://api.datacrazy.io/v1/crm/api/crm/integrations/webhook/business/2ec20b7f-0a1f-49a1-953b-5120dfef8118',

  init() {
    this.render();
    this.attachEventListeners();
  },

  async sendToWebhook(data) {
    try {
      console.log('📤 Iniciando envio para DataCrazy...', data);

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer webhook-integration'
        },
        body: JSON.stringify(data)
      });

      console.log('📨 Resposta recebida:', response.status, response.statusText, 'com Authorization header');

      if (response.ok) {
        console.log('✅ Dados enviados para DataCrazy com sucesso!', response);
        return true;
      } else {
        const responseText = await response.text();
        console.warn('⚠️ Erro ao enviar para DataCrazy:', response.status, responseText);
        return false;
      }
    } catch (error) {
      console.error('❌ Erro ao enviar webhook:', error);
      return false;
    }
  },

  sendWebhookData(result, profileData) {
    const webhookData = {
      name: this.userData.name,
      whatsapp: this.userData.whatsapp,
      instagram: this.userData.instagram,
      area: this.userData.area,
      income: this.userData.income,
      diagnostic_result: {
        level: result.level,
        level_name: profileData.name,
        total_score: result.score,
        max_score: 45
      },
      timestamp: new Date().toISOString()
    };

    console.log('🚀 Preparando envio para DataCrazy:', webhookData);

    // Armazenar localmente para debug
    try {
      const storedData = JSON.parse(localStorage.getItem('diagnostic_submissions') || '[]');
      storedData.push({
        ...webhookData,
        submitted_at: new Date().toISOString(),
        webhook_url: this.webhookUrl
      });
      localStorage.setItem('diagnostic_submissions', JSON.stringify(storedData));
      console.log('💾 Dados armazenados localmente. Total de submissões:', storedData.length);
    } catch (e) {
      console.warn('⚠️ Não foi possível armazenar dados localmente:', e);
    }

    // Enviar para webhook
    this.sendToWebhook(webhookData);
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
        <h1 class="landing-title">Diagnóstico de Prosperidade Financeira</h1>
        <p class="landing-subtitle">— Escravo • Sobrevivente • Conquistador • Governante —</p>
        <p class="landing-description">
          Descubra em qual nível de prosperidade você está. Um diagnóstico honesto baseado em 15 perguntas estratégicas sobre sua realidade financeira.
        </p>
        <div class="highlight-chips">
          <div class="chip">✓ 15 Perguntas</div>
          <div class="chip">✓ Diagnóstico Completo</div>
          <div class="chip">✓ Menos de 5 minutos</div>
        </div>
      </div>

      <h2 class="section-title">Os 4 Níveis de Prosperidade</h2>
      <div class="cards-grid">
        <div class="card level-card level-0">
          <div class="level-badge level-0">Nível 0</div>
          <div class="level-title level-0">Escravo</div>
          <div class="card-description">Preso num ciclo de sobrevivência reativa. O dinheiro controla você.</div>
        </div>
        <div class="card level-card level-1">
          <div class="level-badge level-1">Nível 1</div>
          <div class="level-title level-1">Sobrevivente</div>
          <div class="card-description">Paga as contas, mas não avança. Estabilidade frágil e insegura.</div>
        </div>
        <div class="card level-card level-2">
          <div class="level-badge level-2">Nível 2</div>
          <div class="level-title level-2">Conquistador</div>
          <div class="card-description">Em movimento e crescimento. Começa a construir independência.</div>
        </div>
        <div class="card level-card level-3">
          <div class="level-badge level-3">Nível 3</div>
          <div class="level-title level-3">Governante</div>
          <div class="card-description">Ativos, visão de longo prazo, influência e legado.</div>
        </div>
      </div>

      <div style="text-align: center; margin-top: 50px;">
        <button class="form-button" style="max-width: 350px; background-color: #27AE60;" data-action="startDiagnosis">
          💰 Iniciar Diagnóstico →
        </button>
        <p style="margin-top: 20px; font-size: 0.9rem; color: var(--color-text-secondary);">
          ⏱ Tempo estimado: 3 a 5 minutos
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
            <option value="menos-10000">Menos de R$ 10 mil/mês</option>
            <option value="10000-20000">De R$ 10 mil a R$ 20 mil/mês</option>
            <option value="20000-40000">De R$ 20 mil a R$ 40 mil/mês</option>
            <option value="40000-60000">De R$ 40 mil a R$ 60 mil/mês</option>
            <option value="60000-100000">De R$ 60 mil a R$ 100 mil/mês</option>
            <option value="acima-100000">Acima de R$ 100 mil/mês</option>
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

    const questions = this.questions;
    if (!questions || questions.length === 0) return screen;

    const currentQuestion = questions[this.currentQuestionIndex];
    const totalAnswered = Object.keys(this.answers).length;
    const progressPercent = Math.round((totalAnswered / questions.length) * 100);

    container.innerHTML = `
      <div class="quiz-header">
        <div style="font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: 10px;">
          ${currentQuestion.block}
        </div>
        <div class="quiz-progress-label">Pergunta ${currentQuestion.id} de ${questions.length}</div>
        <div class="quiz-percentage">${progressPercent}%</div>
      </div>

      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width: ${progressPercent}%"></div>
      </div>

      <div class="quiz-question">
        <div class="quiz-number">${currentQuestion.id}</div>
        <p class="quiz-question-text">${currentQuestion.text}</p>
      </div>

      <div class="quiz-options" id="quizOptions">
        ${currentQuestion.options.map((option, idx) => {
          const isSelected = this.answers[currentQuestion.id] === idx;
          return `
            <button
              type="button"
              class="quiz-option-multiple ${isSelected ? 'selected' : ''}"
              data-value="${idx}"
              data-question="${currentQuestion.id}"
            >
              <span class="option-letter">${String.fromCharCode(65 + idx)}</span>
              <span class="option-text">${option.text}</span>
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
        <div class="quiz-counter">${totalAnswered} de ${questions.length} respondidas</div>
      </div>
    `;

    content.appendChild(container);
    screen.appendChild(content);
    return screen;
  },

  createResultScreen() {
    const result = this.calculateResult();
    const profiles = this.profiles;
    const profileData = profiles.find(p => p.level === result.level);

    if (!profileData) return document.createElement('div');

    // Enviar dados para o webhook DataCrazy
    this.sendWebhookData(result, profileData);

    const screen = document.createElement('div');
    screen.className = 'screen result-screen';

    const content = document.createElement('div');
    content.className = 'screen-content';

    const container = document.createElement('div');
    container.className = 'result-container';

    const levelColors = {
      0: { bg: '#F5E6E6', text: '#6B3333', border: '#D9A6A6' },
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
        <div class="result-level-title" style="color: ${colors.text}; margin-bottom: 15px;">Nível ${result.level}: ${profileData.icon} ${profileData.name}</div>
        <div style="text-align: center;">
          <div class="result-score" style="color: ${colors.text};">${result.score}</div>
          <div class="result-score-label" style="color: ${colors.text};">de 45 pontos</div>
        </div>
      </div>

      <div class="result-description">
        ${profileData.description}
      </div>

      <button class="result-button" data-action="restartDiagnosis">
        ↻ Refazer diagnóstico
      </button>
    `;

    content.appendChild(container);
    screen.appendChild(content);

    return screen;
  },

  calculateResult() {
    const questions = this.questions;
    const profiles = this.profiles;
    let totalScore = 0;

    // Somar todos os pontos das respostas
    questions.forEach(question => {
      if (this.answers[question.id] !== undefined) {
        const optionIndex = this.answers[question.id];
        const points = question.options[optionIndex].points;
        totalScore += points;
      }
    });

    // Determinar nível baseado na faixa de pontos
    let level = 0;
    for (let i = profiles.length - 1; i >= 0; i--) {
      if (totalScore >= profiles[i].minScore) {
        level = profiles[i].level;
        break;
      }
    }

    return { score: totalScore, level };
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

    // Quiz screen - Multiple choice options
    const optionButtons = document.querySelectorAll('.quiz-option-multiple');
    optionButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget;
        const questionId = parseInt(target.dataset.question);
        const value = parseInt(target.dataset.value);

        this.answers[questionId] = value;

        // Atualizar UI
        document.querySelectorAll(`[data-question="${questionId}"]`).forEach(b => {
          b.classList.remove('selected');
        });
        target.classList.add('selected');

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
/* Force Vercel redeploy - 1779403828 */
