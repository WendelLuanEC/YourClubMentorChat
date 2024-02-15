const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())


const OPENAI_API_KEY = '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'; // Substitua com sua chave de API da OpenAI

axios.post('https://api.openai.com/v1/chat/completions', {
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: 'What is your version?' }],
  temperature: 0.7
}, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`
  }
})
.then(response => {
  console.log(response.data.choices[0].message.content);
})
.catch(error => {
  console.error('Houve um erro na requisição:', error);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
