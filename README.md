# Diagnóstico dos 3 Níveis da Prosperidade

Uma aplicação web elegante e responsiva que avalia em qual nível bíblico de prosperidade a pessoa se encontra, baseado nos ensinamentos de Raquel Mendes.

## 📋 Sobre

O diagnóstico avalia 3 pilares fundamentais:
- **🙏 Fé & Obediência** — Fundamento espiritual e busca do Reino
- **🧠 Mentalidade** — Sair da mente de escravo e conquistar
- **👑 Caráter & Governo** — Capacidade de impactar outras pessoas

E posiciona o usuário em um dos 3 níveis:
1. **Não Lhe Faltará o Básico** (1.0 – 2.4) — Ausência das necessidades básicas
2. **Terra Prometida** (2.5 – 3.9) — Abundância e desfrute
3. **Exercer Governo** (4.0 – 5.0) — Impacto estratégico na vida de outros

## ✨ Funcionalidades

- ✅ 4 telas intuitivas (landing, formulário, quiz, resultado)
- ✅ 10 perguntas divididas em 3 pilares
- ✅ Gráfico radar interativo com Chart.js
- ✅ Cálculo automático de score e nível
- ✅ Design elegante em tons dourados e creme
- ✅ Totalmente responsivo (mobile, tablet, desktop)
- ✅ Animações suaves entre telas
- ✅ Validação de formulário em tempo real
- ✅ Armazenamento de respostas durante a sessão

## 🎨 Design System

### Cores
- **Fundo**: #F5F0E8 (creme/bege quente)
- **Dourado Principal**: #C9A84C
- **Dourado Claro**: #E8D5A3
- **Texto Principal**: #1A1A1A
- **Nível 1**: Azul claro (#0C447C)
- **Nível 2**: Dourado (#633806)
- **Nível 3**: Verde (#27500A)

### Tipografia
- Títulos: Georgia (serif elegante)
- Corpo: System fonts (limpo e moderno)
- Versículos: Itálico com fundo dourado

## 📁 Estrutura de Arquivos

```
diagnostico-prosperidade/
├── index.html          # Estrutura HTML
├── styles.css          # Estilos e responsividade
├── script.js           # Lógica e interatividade
└── README.md          # Este arquivo
```

## 🚀 Como Usar

1. Abra `index.html` em um navegador web
2. Clique em "Iniciar Diagnóstico"
3. Preencha seus dados pessoais
4. Responda as 10 perguntas (1 = discordo totalmente, 5 = concordo totalmente)
5. Visualize seu resultado com análise detalhada dos 3 pilares

## 📊 Cálculo do Score

```
Score Geral = (Fé + Mentalidade + Caráter) / 3
Nível = Determinado pelo score geral:
  - 1.0 – 2.4: Nível 1
  - 2.5 – 3.9: Nível 2
  - 4.0 – 5.0: Nível 3
```

## 🎯 Fluxo de Telas

```
Landing Page
    ↓
Formulário (dados pessoais)
    ↓
Quiz (10 perguntas)
    ↓
Resultado (score, gráfico, próximos passos)
    ↓
Refazer diagnóstico
```

## 📱 Responsividade

- **Desktop** (>768px): Layout de 3 colunas, tamanho otimizado
- **Tablet** (480px – 768px): Layout de 1-2 colunas adaptado
- **Mobile** (<480px): Layout single column otimizado

## 🔧 Dependências

- **Chart.js** (v3+): Para renderizar o gráfico radar
  - Carregado via CDN: `https://cdn.jsdelivr.net/npm/chart.js`

## 📝 Licença

Criado baseado nos ensinamentos bíblicos de Raquel Mendes sobre prosperidade.

---

**Tempo estimado**: 1 a 2 minutos para completar o diagnóstico
