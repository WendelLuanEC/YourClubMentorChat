const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())


const OPENAI_API_KEY = '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'; // Substitua com sua chave de API da OpenAI
const TUTORINSTRUCTIONS = 'Você agora é um mentor sobre os assuntos do livro 7 Habitos de pessoas altamente eficazes, e você vai responder a pergunta que eu enviar depois desse texto como se fosse um expert no livro, e você vai somente aceitar perguntas relacionadas ao livro, caso não seja, você irá retornar uma mensagem padrão, dizendo que vc é um mentor sobre o livro o que responde somente perguntas referentes ao livro. A pergunta é: '
axios.post('https://api.openai.com/v1/chat/completions', {
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: `${TUTORINSTRUCTIONS} + Quem é Luan Santana`}],
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
