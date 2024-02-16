const express = require('express');
const axios = require('axios');
const cors = require('cors');
const db = require('./database/database'); // Importa a conexão com o banco de dados
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const TUTORINSTRUCTIONS = process.env.TUTORINSTRUCTIONS;
const USERANSWER = 'Me explique sobre o livro 7 Hábitos de Pessoas Altamente Eficazes';

axios.post('https://api.openai.com/v1/chat/completions', {
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: `${TUTORINSTRUCTIONS} ${USERANSWER}`}],
  temperature: 0.7
}, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`
  }
})
.then(response => {
  const chatResponse = response.data.choices[0].message.content;
  console.log(chatResponse);

   const query = "INSERT INTO answers VALUES (?)";
   db.query(query, [chatResponse], (err, result) => {
     if (err) {
       console.error('Erro ao inserir no banco de dados:', err);
       return;
     }
     console.log('Resposta inserida com sucesso no banco de dados, ID:', result.insertId);
   });
})
.catch(error => {
  console.error('Houve um erro na requisição:', error);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
