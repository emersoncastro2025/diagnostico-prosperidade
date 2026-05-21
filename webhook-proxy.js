// ============================================
// WEBHOOK PROXY - Servidor Node.js
// Recebe dados do diagnóstico e envia para DataCrazy
// ============================================

// INSTALAÇÃO:
// 1. npm install express cors
// 2. node webhook-proxy.js
// 3. Atualizar URL no script.js para http://localhost:3001/webhook

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// TODO: Configurar seu token de API DataCrazy
const DATACRAZY_API_URL = 'https://api.g1.datacrazy.io/api/v1/leads';
const DATACRAZY_API_TOKEN = 'SEU_TOKEN_JWT_AQUI'; // Gerar em DataCrazy → Configurações → API

// Receber dados do diagnóstico
app.post('/webhook', async (req, res) => {
  try {
    console.log('📥 Dados recebidos:', req.body);

    const { name, whatsapp, instagram, area, income, diagnostic_result, timestamp } = req.body;

    // Formatar para API DataCrazy
    const payload = {
      name: name,
      phone: whatsapp,
      instagram: instagram,
      source: 'Diagnóstico Prosperidade',
      company: area,
      notes: JSON.stringify({
        income: income,
        diagnostic_result: diagnostic_result,
        received_at: timestamp
      })
    };

    console.log('🚀 Enviando para DataCrazy:', payload);

    // Enviar para API DataCrazy
    const response = await fetch(DATACRAZY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DATACRAZY_API_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Lead criado com sucesso no DataCrazy:', data);
      res.status(201).json({
        success: true,
        message: 'Lead criado com sucesso',
        datacrazy_id: data.id
      });
    } else {
      console.error('❌ Erro ao criar lead:', data);
      res.status(response.status).json({
        success: false,
        message: 'Erro ao criar lead',
        error: data
      });
    }
  } catch (error) {
    console.error('❌ Erro no webhook proxy:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno',
      error: error.message
    });
  }
});

app.listen(3001, () => {
  console.log('🟢 Webhook proxy rodando em http://localhost:3001');
  console.log('⚠️  Não esqueça de configurar DATACRAZY_API_TOKEN antes de usar');
});
