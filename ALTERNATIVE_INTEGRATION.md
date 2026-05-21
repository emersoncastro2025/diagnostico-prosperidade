# 🔌 Integração Alternativa - Webhook Proxy

O webhook padrão do DataCrazy não está funcionando. Aqui está a **solução alternativa** usando um servidor proxy.

---

## 🎯 Como Funciona

```
Aplicação Web
    ↓
Webhook Proxy (Node.js)
    ↓
API DataCrazy com autenticação
    ↓
Leads aparecem no CRM
```

---

## ⚙️ Setup - 3 Passos

### Passo 1: Gerar Token de API no DataCrazy

1. Acesse **DataCrazy CRM Dashboard**
2. Vá para **Configurações → Integrações → API**
3. Gere um novo **Access Token** (JWT)
4. **Copie o token**

### Passo 2: Configurar o Proxy

1. Abra `webhook-proxy.js`
2. Encontre a linha:
   ```javascript
   const DATACRAZY_API_TOKEN = 'SEU_TOKEN_JWT_AQUI';
   ```
3. Substitua por seu token real:
   ```javascript
   const DATACRAZY_API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   ```

### Passo 3: Rodar o Servidor

```bash
cd /Users/emersoncastro/Documents/salus/diagnostico-prosperidade

# Instalar dependências
npm install express cors

# Rodar o proxy
node webhook-proxy.js
```

Você deve ver:
```
🟢 Webhook proxy rodando em http://localhost:3001
```

---

## 🧪 Testar Localmente

1. Abra http://localhost:8000 (ou 3000 onde a app roda)
2. Complete o diagnóstico
3. Verifique **DataCrazy CRM** → **Leads**
4. Novo lead deve aparecer em segundos

---

## 📤 Fazer Deploy (Opcional)

Se quiser rodar em produção:

### Opção A: Usar Vercel (Recomendado)

1. Converter para **Vercel Function**:
   ```javascript
   // api/webhook.js
   export default async function handler(req, res) {
     // ... código acima
   }
   ```

2. Deploy no Vercel junto com a app

### Opção B: Usar Heroku (Gratuito)

```bash
heroku create seu-webhook-proxy
git push heroku main
```

### Opção C: Seu Próprio Servidor

- Deploy em um VPS/EC2
- Usar PM2 ou systemd para manter rodando

---

## 🔐 Segurança

⚠️ **IMPORTANTE**: Não coloque o token JWT no código público!

Para produção:
```javascript
// Use variáveis de ambiente
const DATACRAZY_API_TOKEN = process.env.DATACRAZY_API_TOKEN;
```

Configurar no Vercel/Heroku/Servidor:
```bash
# .env (NÃO commitar!)
DATACRAZY_API_TOKEN=seu_token_aqui
```

---

## 🔄 Como Integrar com a Aplicação Web

Se o proxy estiver rodando em `http://localhost:3001`:

**script.js:**
```javascript
webhookUrl: 'http://localhost:3001/webhook'  // para desenvolvimento
// ou
webhookUrl: 'https://seu-webhook-proxy.vercel.app/webhook'  // para produção
```

---

## 📊 Campos Mapeados

| Campo Diagnóstico | Campo DataCrazy |
|------------------|-----------------|
| `name` | `name` |
| `whatsapp` | `phone` |
| `instagram` | `instagram` |
| `area` | `company` |
| `income` | `notes` (JSON) |
| `diagnostic_result` | `notes` (JSON) |
| `timestamp` | `notes` (JSON) |

---

## ❓ Troubleshooting

### Erro: "Token inválido"
- Verifique se o token foi copiado corretamente
- Token pode estar expirado (regerar no DataCrazy)

### Erro: "CORS blocked"
- Certifique-se que `cors()` está configurado
- Se in produção, adicione whitelist:
  ```javascript
  app.use(cors({
    origin: 'https://diagnostico-prosperidade3.vercel.app'
  }));
  ```

### Leads não aparecem
- Verificar logs do proxy: `node webhook-proxy.js`
- Verificar response do DataCrazy API
- Confirmar que o lead foi criado (HTTP 201)

---

## 📞 Suporte

Se o proxy continuar com erros:

1. Execute com debug:
   ```bash
   DEBUG=* node webhook-proxy.js
   ```

2. Teste o endpoint manualmente:
   ```bash
   curl -X POST http://localhost:3001/webhook \
     -H 'Content-Type: application/json' \
     -d '{"name":"Teste","phone":"1199999999",...}'
   ```

3. Verifique token DataCrazy está ativo

---

**Status**: ✅ Solução alternativa pronta  
**Próximo passo**: Gerar token DataCrazy e testar localmente
