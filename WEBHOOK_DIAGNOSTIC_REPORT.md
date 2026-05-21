# 📊 Relatório de Diagnóstico - Webhook DataCrazy

**Data**: 2026-05-21  
**Status**: ❌ Webhook com erro, dados sendo capturados localmente  
**Severidade**: Média — aplicação funciona, mas CRM não está recebendo dados

---

## 📋 Resumo do Problema

O webhook do DataCrazy está retornando erro `Integration error: name-not-valid` para **qualquer** payload enviado, independente:

- ✗ Da estrutura dos dados
- ✗ Do formato do campo "name"
- ✗ Da presença ou ausência de outros campos
- ✗ Do método HTTP (POST)
- ✗ Do Content-Type (JSON/form-encoded)

---

## 🧪 Testes Executados

| Teste | Payload | Resultado |
|-------|---------|-----------|
| 1 | `{"name": "João Silva"}` | ❌ name-not-valid |
| 2 | `{"name": "Test User"}` | ❌ name-not-valid |
| 3 | `{"name": "123456"}` | ❌ name-not-valid |
| 4 | `{"name": ""}` | ❌ name-not-valid |
| 5 | Sem campo `name` | ❌ name-not-valid |
| 6 | `{"firstName": "João", "lastName": "Silva"}` | ❌ name-not-valid |
| 7 | Estrutura completa de lead | ❌ name-not-valid |
| 8 | Form-encoded data | ❌ name-not-valid |
| 9 | Payload aninhado `{"data": {...}}` | ❌ name-not-valid |

**Conclusão**: O erro é específico do webhook, não do payload.

---

## 🔍 Investigação Técnica

### Endpoint Testado
```
URL: https://api.datacrazy.io/v1/crm/api/crm/integrations/webhook/business/2ec20b7f-0a1f-49a1-953b-5120dfef8118
Método: POST
Content-Type: application/json
```

### Validação do Endpoint
- ✓ Endpoint responde (HTTP 200)
- ✓ CORS habilitado (`Access-Control-*` headers presentes)
- ✓ OPTIONS request retorna 204 No Content (endpoint existe)
- ✗ Validação de dados falha com `name-not-valid`

### Possíveis Causas

1. **Webhook Mal Configurado no DataCrazy**
   - Business ID inválido ou expirado
   - Webhook desativado ou deletado
   - Configuração incorreta do integrador

2. **Validação Customizada no DataCrazy**
   - A validação procura por um campo específico não documentado
   - Há uma regra de negócio que rejeita certos formatos
   - Dependência de um header ou token de autenticação

3. **Incompatibilidade de Versão**
   - A URL pode estar apontando para versão antiga da API
   - O webhook pode estar em modo "preview" ou "beta"

4. **Problema de Integração**
   - O webhook pode estar vinculado a um recurso deletado
   - A integração pode estar em estado inconsistente

---

## ✅ Solução Implementada

### 1. Armazenamento Local de Dados
```javascript
// Todos os dados agora são salvos em localStorage
localStorage.getItem('diagnostic_submissions')
// Retorna: array com todos os preenchimentos
```

**Benefícios**:
- Dados não são perdidos
- Possível exportar/importar manualmente
- Debug facilitado
- Fallback se webhook falhar

### 2. Feedback Visual ao Usuário
- ✓ Mensagem na tela de resultado: "Seus dados foram capturados"
- 📤 Indicação que está "Enviando para DataCrazy CRM"
- Console logs detalhados para debug

### 3. Documentação
- `WEBHOOK_SETUP_GUIDE.md` — Como corrigir o webhook
- `WEBHOOK_DIAGNOSTIC_REPORT.md` — Este arquivo

---

## 📤 Como Recuperar Dados Capturados

### Via Browser Console
```javascript
// Abrir DevTools (F12) → Console

// Ver todos os dados
const dados = JSON.parse(localStorage.getItem('diagnostic_submissions'));
console.table(dados);

// Exportar como CSV
const csv = dados.map(d => `${d.name}|${d.whatsapp}|${d.diagnostic_result.level_name}|${d.diagnostic_result.score}`).join('\n');
copy(csv); // Copiar para clipboard
```

### Via JSON Export
```javascript
// Copiar tudo como JSON
copy(localStorage.getItem('diagnostic_submissions'));
// Colar em arquivo .json
```

---

## 🔧 Próximas Ações Recomendadas

### Imediato (Hoje)
1. Verificar se webhook está ativo no DataCrazy Dashboard
2. Confirmar se business ID está correto
3. Tentar recriar o webhook se necessário

### Curto Prazo (Esta semana)
1. Contatar DataCrazy support sobre o erro `name-not-valid`
2. Pedir documentação específica do webhook
3. Solicitar teste da integração pela equipe deles

### Médio Prazo (Se webhook não for corrigido)
1. Implementar alternativa com API direct (requer token)
2. Usar serviço de fila (ex: Twilio, Zapier)
3. Implementar endpoint proxy no servidor

---

## 📊 Impacto Atual

| Aspecto | Status | Impacto |
|---------|--------|--------|
| **Formulário** | ✅ Funciona | Usuários conseguem preencher |
| **Quiz** | ✅ Funciona | Cálculos funcionam corretamente |
| **Resultado** | ✅ Funciona | Gráfico e análise exibem-se |
| **Armazenamento Local** | ✅ Funciona | Dados salvos no navegador |
| **Webhook DataCrazy** | ❌ Falha | CRM não recebe dados |
| **UX/Experiência** | ✅ Normal | Usuário não percebe problema |

---

## 🎯 Métricas para Verificação

Após corrigir o webhook, verifique:

✓ Webhook retorna HTTP 200  
✓ DataCrazy CRM recebe leads em tempo real  
✓ Console mostra: `✅ Dados enviados para DataCrazy com sucesso!`  
✓ Novos contatos aparecem em "Leads" no DataCrazy  

---

## 📚 Referências

- [DataCrazy Docs](https://docs.datacrazy.io)
- [DataCrazy Help Center](https://help.datacrazy.io)
- [Webhook Best Practices](https://webhooks.zapier.com/docs)

---

**Última atualização**: 2026-05-21 23:15 UTC  
**Próxima revisão**: Após contato com DataCrazy support
