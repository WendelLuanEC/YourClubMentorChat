const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./database/sequelize'); 
const Question = require('./database/models/Question');
const Answer = require('./database/models/Answer');

const app = express();
app.use(express.json());
app.use(cors());

sequelize.sync().then(() => {
   // console.log('Modelos sincronizados com o banco de dados.');
}).catch(err => {
    console.error('Falha ao sincronizar modelos com o banco de dados:', err);
});

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const TUTORINSTRUCTIONS = process.env.TUTORINSTRUCTIONS;
const USERANSWER = 'Explique detalhadamente do que se trata o livro, com mais palavras possíveis';

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
.then(async response => {
  const chatResponse = response.data.choices[0].message.content;
  console.log('\n' + chatResponse +'\n');

  // Primeiro, insira a pergunta no banco de dados
  const question = await Question.create({ question_text: USERANSWER });

  // Em seguida, insira a resposta associada à pergunta
  const answer = await Answer.create({ 
      question_id: question.question_id, 
      answer_text: chatResponse 
  });

  console.log('Resposta inserida com sucesso no banco de dados, ID:', answer.answer_id);
})
.catch(error => {
  console.error('Houve um erro na requisição:', error);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
