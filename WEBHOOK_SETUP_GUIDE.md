# 🔧 Guia de Configuração - Webhook DataCrazy

## Status Atual

❌ **Webhook retornando erro: `name-not-valid`**

Todos os testes com diferentes formatos e estruturas de dados retornam o mesmo erro, indicando que o webhook pode estar:
1. Mal configurado no DataCrazy
2. Com um business ID inválido/expirado
3. Esperando um formato de dados específico não documentado

---

## ✅ Solução Implementada

Para que a aplicação continue funcionando enquanto o webhook é corrigido:

✓ **Armazenamento Local**: Todos os dados são salvos no `localStorage` do navegador
✓ **Logs de Debug**: Console mostra exatamente o que está sendo enviado
✓ **Confirmação Visual**: Usuário recebe feedback de que os dados foram capturados

---

## 🔍 Como Diagnosticar

### 1. Verificar Dados Armazenados Localmente

```javascript
// Abra DevTools (F12) → Console e execute:
JSON.parse(localStorage.getItem('diagnostic_submissions'))
```

Você verá um array com todos os dados coletados:
```json
[
  {
    "name": "João Silva",
    "whatsapp": "(11) 99999-9999",
    "instagram": "@joao",
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
    "timestamp": "2026-05-21T23:00:00Z",
    "submitted_at": "2026-05-21T23:01:45.123Z",
    "webhook_url": "https://api.datacrazy.io/v1/crm/api/crm/integrations/webhook/business/2ec20b7f-0a1f-49a1-953b-5120dfef8118"
  }
]
```

### 2. Verificar Logs do Webhook

No console do navegador (F12), procure por:
- 🚀 `Preparando envio para DataCrazy:` — dados sendo preparados
- 📤 `Iniciando envio para DataCrazy...` — requisição em progresso
- ⚠️ `Erro ao enviar para DataCrazy:` — erro na resposta

---

## 🔗 Próximas Ações para Corrigir o Webhook

### Opção 1: Verificar DataCrazy (Recomendado)

1. **Acesse DataCrazy CRM Dashboard**
2. **Vá para**: Integrações → Webhooks
3. **Verifique**:
   - ✓ O webhook com este business ID existe?
   - ✓ O webhook está ativo/habilitado?
   - ✓ O business ID está correto: `2ec20b7f-0a1f-49a1-953b-5120dfef8118`?

4. **Teste o webhook** diretamente no DataCrazy (se houver opção de teste)

### Opção 2: Recriar o Webhook

Se o webhook original está danificado ou expirado:

1. **Acesse**: DataCrazy CRM → Integrações → Criar Novo Webhook
2. **Configure**:
   - Nome: "Diagnóstico Prosperidade"
   - Tipo de evento: "Lead criado" ou "Dados recebidos"
   - Copie a URL gerada

3. **Atualize a URL** no arquivo `script.js`:
   ```javascript
   webhookUrl: 'https://api.datacrazy.io/v1/crm/api/crm/integrations/webhook/business/NOVO_ID_AQUI'
   ```

### Opção 3: Usar API Direta (Alternativa)

Se não conseguir corrigir o webhook, pode usar a API direta:

1. **Gere um token de API** no DataCrazy
2. **Modifique** o método `sendToWebhook()` para usar a API direct:
   ```javascript
   async sendToWebhook(data) {
     const response = await fetch('https://api.g1.datacrazy.io/api/v1/leads', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer SEU_TOKEN_AQUI'
       },
       body: JSON.stringify({
         name: data.name,
         phone: data.whatsapp,
         instagram: data.instagram,
         source: 'diagnostic',
         notes: JSON.stringify(data.diagnostic_result)
       })
     });
     // ... resto do código
   }
   ```

---

## 📋 Estrutura de Dados Esperada

Baseado na documentação do DataCrazy, a API de criação de leads aceita:

```json
{
  "name": "string (obrigatório)",
  "email": "string",
  "phone": "string (formato: +55 ou (XX) XXXXX-XXXX)",
  "instagram": "string",
  "source": "string",
  "company": "string",
  "tags": ["array de IDs"],
  "notes": "string (para armazenar diagnóstico em JSON)"
}
```

---

## 🧪 Teste Rápido do Webhook

Cole no console do navegador:

```javascript
// Enviar dados de teste
const testData = {
  name: "Teste Webhook",
  whatsapp: "(11) 99999-9999",
  instagram: "@teste",
  area: "Consultoria",
  income: "10001-20000",
  diagnostic_result: {
    level: 2,
    level_name: "Conquistador",
    score: 3.8,
    pillars: {
      fazer_dinheiro_novo: 4.0,
      administrar: 3.5,
      multiplicar_riqueza: 3.9
    }
  },
  timestamp: new Date().toISOString()
};

fetch('https://api.datacrazy.io/v1/crm/api/crm/integrations/webhook/business/2ec20b7f-0a1f-49a1-953b-5120dfef8118', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData)
})
.then(r => r.json())
.then(d => console.log('Resposta:', d))
.catch(e => console.error('Erro:', e));
```

---

## 📞 Suporte

Se o webhook continuar com erro:

1. **Verifique com DataCrazy Support** sobre o erro `name-not-valid`
2. **Compartilhe**:
   - Business ID: `2ec20b7f-0a1f-49a1-953b-5120dfef8118`
   - Erro recebido: `Integration error: name-not-valid`
   - URL webhook: `https://api.datacrazy.io/v1/crm/api/crm/integrations/webhook/business/2ec20b7f-0a1f-49a1-953b-5120dfef8118`

3. **Peça para DataCrazy**:
   - Validar configuração do webhook
   - Confirmar se o webhook aceita POST requests
   - Fornecer documentação do formato esperado

---

## ✅ Checklist de Resolução

- [ ] Verificar webhook no DataCrazy Dashboard
- [ ] Confirmar business ID
- [ ] Testar webhook com curl/Postman
- [ ] Se precisar recriar: gerar nova URL
- [ ] Atualizar `webhookUrl` em `script.js`
- [ ] Fazer novo commit: `git commit -m "fix: update datacrazy webhook url"`
- [ ] Fazer push: `git push origin main`
- [ ] Vercel redeploy automático
- [ ] Testar em https://diagnostico-prosperidade3.vercel.app

---

**Data de diagnóstico**: 2026-05-21  
**Status**: Dados sendo armazenados localmente enquanto webhook é corrigido
