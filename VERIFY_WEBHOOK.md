# 🔍 Verificar se Webhook Existe

Siga estes passos para confirmar se o webhook URL é válido.

---

## ✅ Passo 1: Verificar no DataCrazy Dashboard

1. **Faça login** em DataCrazy CRM
2. **Vá para**: Configurações → Integrações → Webhooks
3. **Procure** por um webhook com esse business ID:
   ```
   2ec20b7f-0a1f-49a1-953b-5120dfef8118
   ```

**Se encontrou:**
- ✓ Webhook existe
- ✓ Verifique se está **ATIVO**
- ✓ Clique em "Testar" ou "Send Test"
- ✓ Verifique os logs

**Se NÃO encontrou:**
- ✗ Webhook pode estar deletado
- ✗ Business ID pode estar errado
- ✗ Pode estar em outra conta/workspace

---

## ✅ Passo 2: Validar a URL

Execute no terminal:

```bash
# Teste 1: Ping simples (verifica se endpoint existe)
curl -v -X OPTIONS \
  https://api.datacrazy.io/v1/crm/api/crm/integrations/webhook/business/2ec20b7f-0a1f-49a1-953b-5120dfef8118

# Teste 2: Verificar headers CORS
curl -i -X OPTIONS \
  -H "Origin: https://diagnostico-prosperidade3.vercel.app" \
  https://api.datacrazy.io/v1/crm/api/crm/integrations/webhook/business/2ec20b7f-0a1f-49a1-953b-5120dfef8118
```

**Resposta esperada:**
```
< HTTP/1.1 204 No Content
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Methods: POST, OPTIONS
```

**Se receber 404 ou timeout:**
- ❌ URL é inválida
- ❌ Business ID não existe
- ❌ Webhook foi deletado

---

## ✅ Passo 3: Obter a URL Correta

1. **Acesse DataCrazy**: Configurações → Integrações
2. **Clique em** "Criar Novo Webhook"
3. **Configure**:
   - Nome: "Diagnóstico Prosperidade"
   - Tipo: "Receber dados" ou "Lead"
4. **Copie a URL gerada** (será similar a que você tem)
5. **Compare** com a URL que você está usando

---

## 🔄 Passo 4: Atualizar a URL (se diferente)

Se você obteve uma URL diferente:

1. **Abra** `script.js`
2. **Encontre**:
   ```javascript
   webhookUrl: 'https://api.datacrazy.io/v1/crm/api/crm/integrations/webhook/business/2ec20b7f-0a1f-49a1-953b-5120dfef8118',
   ```
3. **Substitua** pela nova URL
4. **Salve e commit**:
   ```bash
   git add script.js
   git commit -m "fix: update datacrazy webhook url"
   git push origin main
   ```

---

## 📋 Checklist Final

- [ ] Webhook existe no DataCrazy Dashboard
- [ ] Webhook está ATIVO (não desativado)
- [ ] Business ID está correto
- [ ] HTTP OPTIONS request retorna 204
- [ ] CORS headers estão presentes
- [ ] URL foi atualizada em `script.js` (se necessário)
- [ ] Deploy foi feito para Vercel
- [ ] Cache foi limpo (Ctrl+Shift+Del)

---

## 🎯 Se Tudo Estiver Certo

E o webhook **ainda não funcionar**, então:

👉 **Use a Integração Alternativa** (webhook-proxy.js)
- Veja: `ALTERNATIVE_INTEGRATION.md`

---

**Data**: 2026-05-21  
**Próximo passo**: Verificar webhook no dashboard DataCrazy
