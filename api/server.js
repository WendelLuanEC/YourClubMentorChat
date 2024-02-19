const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./database/sequelize");
const Question = require("./database/models/Question");
const Answer = require("./database/models/Answer");

const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const TUTORINSTRUCTIONS = process.env.TUTORINSTRUCTIONS;

// Sincronizando modelos com o banco de dados
sequelize
  .sync()
  .then(() => {
    console.log("Modelos sincronizados com o banco de dados.");
  })
  .catch((err) => {
    console.error("Falha ao sincronizar modelos com o banco de dados:", err);
  });

Question.hasMany(Answer, { foreignKey: "question_id" });
Answer.belongsTo(Question, { foreignKey: "question_id" });

// Função para fazer a chamada à API do ChatGPT
async function fetchChatGPTResponse(userQuestion) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: `${TUTORINSTRUCTIONS} ${userQuestion}` },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao buscar resposta do ChatGPT:", error);
    throw error; // Propaga o erro para ser tratado onde a função é chamada
  }
}

// Criando a rota /ask
app.post("/ask", async (req, res) => {
  const userQuestion = req.body.question;

  if (!userQuestion) {
    return res.status(400).send({ error: "Pergunta não fornecida." });
  }

  try {
    const chatResponse = await fetchChatGPTResponse(userQuestion);

    // Salva a pergunta e a resposta no banco de dados
    const question = await Question.create({ question_text: userQuestion });
    const answer = await Answer.create({
      question_id: question.question_id,
      answer_text: chatResponse,
    });

    // Retorna a resposta para o usuário
    res.send({ question: userQuestion, answer: chatResponse });
  } catch (error) {
    res.status(500).send({ error: "Erro ao processar sua pergunta." });
  }
});

// Nova rota para retornar dados das tabelas Questions e Answers
app.get("/data", async (req, res) => {
  try {
    // Realiza a consulta com join
    const questionsWithAnswers = await Question.findAll({
      include: [
        {
          model: Answer,
          required: false, // Isso faz um LEFT JOIN. Use `true` para um INNER JOIN.
        },
      ],
    });

    // Retorna os dados como uma resposta JSON
    res.json(questionsWithAnswers);
  } catch (error) {
    console.error("Erro ao buscar dados com join:", error);
    res.status(500).send({ error: "Erro ao processar a solicitação." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
