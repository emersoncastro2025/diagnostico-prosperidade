# 🚀 Guia de Deployment

## GitHub

✅ **Status**: Repositório criado e sincronizado!

**URL do Repositório:**
```
https://github.com/emersoncastro2025/diagnostico-prosperidade
```

**Commits:**
- `892a379` - feat: criar diagnóstico dos 3 níveis da prosperidade
- `1a2350f` - config: adicionar configuração vercel.json para deploy

---

## Vercel (Passo a Passo)

### Opção 1: Via Dashboard Vercel (Recomendado)

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em **"New Project"**
4. Selecione o repositório **`diagnostico-prosperidade`**
5. Configure:
   - **Framework Preset**: Other (HTML)
   - **Root Directory**: ./
   - **Build Command**: (deixar vazio)
   - **Output Directory**: (deixar vazio)
6. Clique em **"Deploy"**

### Opção 2: Via CLI Vercel

```bash
# 1. Instalar Vercel CLI (se não tiver)
npm i -g vercel

# 2. Fazer login
vercel login

# 3. Deploy do projeto
cd /Users/emersoncastro/Documents/salus/diagnostico-prosperidade
vercel

# 4. Responda as perguntas:
# - Link to existing project? → No
# - Project name? → diagnostico-prosperidade
# - Directory? → ./
# - Want to modify vercel.json? → No
```

---

## ✅ Após o Deploy

Você terá uma URL como:
```
https://diagnostico-prosperidade.vercel.app
```

**Tudo estará funcionando:**
- ✅ Landing page
- ✅ Formulário responsivo
- ✅ Quiz com 10 perguntas
- ✅ Resultado com gráfico radar
- ✅ Todas as animações e efeitos

---

## 📋 Próximas Atualizações (Git)

Para fazer novas atualizações:

```bash
# 1. Faça as mudanças nos arquivos
# 2. Commit
git add .
git commit -m "descrição da mudança"

# 3. Push para GitHub
git push origin main

# 4. Vercel auto-faz deploy (integração automática)
```

---

## 🔗 Links Úteis

- **GitHub**: https://github.com/emersoncastro2025/diagnostico-prosperidade
- **Vercel**: https://vercel.com/dashboard
- **Documentação Vercel**: https://vercel.com/docs

---

**Status**: ✅ Pronto para deploy na Vercel!
