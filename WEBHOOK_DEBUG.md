# 🔧 Debug Webhook DataCrazy

## 📋 Checklist de Troubleshooting

### 1️⃣ Verificar se dados estão sendo enviados

**Abra o DevTools (F12) → Console:**

Procure por logs como:
```
📤 Iniciando envio para DataCrazy...
🚀 Preparando envio para DataCrazy:
📨 Resposta recebida: 200 OK
✅ Dados enviados para DataCrazy com sucesso!
```

### 2️⃣ Testar localmente (localhost:8000)

1. Acesse http://localhost:8000
2. Abra DevTools (F12) → Console
3. Complete o diagnóstico completo
4. Veja os logs aparecendo

**Logs esperados:**
```
🚀 Preparando envio para DataCrazy: {name: "...", whatsapp: "...", ...}
📤 Iniciando envio para DataCrazy... {Object}
📨 Resposta recebida: 200 OK
✅ Dados enviados para DataCrazy com sucesso!
```

### 3️⃣ Testar no Vercel

1. Acesse https://diagnostico-prosperidade3.vercel.app
2. Abra DevTools (F12) → Console
3. Complete o diagnóstico
4. Procure pelos mesmos logs

---

## 🔍 Possíveis Problemas

### ❌ Problema: Logs não aparecem

**Causa:** Código não está atualizado no Vercel

**Solução:**
```bash
# Verificar se push foi feito
git log --oneline -3

# Se não for o último commit, fazer push
git push origin main

# Vercel fará deploy em 1-2 minutos
# Limpar cache do navegador (Ctrl+Shift+Del)
# Recarregar página
```

### ❌ Problema: Log "❌ Erro ao enviar webhook"

**Causa:** Problema de rede ou CORS

**Verificar:**
1. Status da internet
2. Se URL do webhook está correta
3. Se DataCrazy webhook está ativo

### ❌ Problema: Log "⚠️ Erro ao enviar para DataCrazy: 400"

**Causa:** Dados malformados

**Verificar:** Estrutura do JSON:
```json
{
  "name": "string",
  "whatsapp": "string",
  "instagram": "string",
  "area": "string",
  "income": "string",
  "diagnostic_result": {
    "level": number,
    "level_name": "string",
    "score": number,
    "pillars": {
      "fazer_dinheiro_novo": number,
      "administrar": number,
      "multiplicar_riqueza": number
    }
  },
  "timestamp": "ISO 8601"
}
```

### ❌ Problema: Log "⚠️ Erro ao enviar para DataCrazy: 403/401"

**Causa:** Problema de autenticação/permissão

**Verificar:** 
- URL do webhook está correta?
- ID do business está correto?
- Webhook está ativo no DataCrazy?

---

## 🧪 Teste Manual via cURL

```bash
curl -X POST \
  https://api.datacrazy.io/v1/crm/api/crm/integrations/webhook/business/2ec20b7f-0a1f-49a1-953b-5120dfef8118 \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Teste",
    "whatsapp": "(11) 99999-9999",
    "instagram": "@teste",
    "area": "Consultoria",
    "income": "10001-20000",
    "diagnostic_result": {
      "level": 2,
      "level_name": "Conquistador",
      "score": 3.8,
      "pillars": {
        "fazer_dinheiro_novo": 4.0,
        "administrar": 3.5,
        "multiplicar_riqueza": 3.9
      }
    },
    "timestamp": "2026-05-21T23:00:00Z"
  }'
```

---

## ✅ Confirmação de Envio Bem-Sucedido

Você verá:
1. **Console:** Log "✅ Dados enviados para DataCrazy com sucesso!"
2. **DataCrazy:** Novos contatos aparecendo no CRM
3. **Network Tab (F12):** Request POST com status 200

---

## 📝 Commit Atualizado

```
fa1c90a fix: melhorar logging e tratamento de webhook DataCrazy
```

---

## 🎯 Próximas Ações

1. **Verificar Vercel está deployado:**
   ```bash
   git log --oneline -1
   # Deve mostrar: fa1c90a fix: melhorar logging...
   ```

2. **Testar no Vercel:**
   - Limpar cache (Ctrl+Shift+Del)
   - Acessar https://diagnostico-prosperidade3.vercel.app
   - Abrir console (F12)
   - Completar diagnóstico
   - Procurar pelos logs

3. **Se ainda não funcionar:**
   - Compartilhe os erros do console
   - Verifique se webhook DataCrazy está ativo
   - Teste com cURL acima

---

**Status:** ✅ Deploy atualizado, pronto para teste
**URL:** https://diagnostico-prosperidade3.vercel.app
**Webhook:** https://api.datacrazy.io/v1/crm/api/crm/integrations/webhook/business/2ec20b7f-0a1f-49a1-953b-5120dfef8118
