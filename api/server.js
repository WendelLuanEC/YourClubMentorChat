import express from "express";
import cors from "cors";
import sequelize from "./database/sequelize.js";
import { PORT } from "./config/index.js";
import { fetchChatGPTResponse } from "./controllers/chatController.js";
import Question from "./database/models/Question.js";
import Answer from "./database/models/Answer.js";

const app = express();
app.use(express.json());
app.use(cors());

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

// Criando a rota /ask
app.post("/ask", async (req, res) => {
  console.log(req.body);
  const userQuestion = req.body.userQuestion;
  const expertiseLevel = req.body.expertiseLevel;
  const languageType = req.body.languageType;
  const typeFormatted = req.body.typeFormatted;

  if (!userQuestion) {
    return res.status(400).send({ error: "Pergunta não fornecida." });
  }

  try {
    const chatResponse = await fetchChatGPTResponse(
      userQuestion,
      expertiseLevel,
      languageType,
      typeFormatted
    );
      console.log(chatResponse)
    // Salva a pergunta e a resposta no banco de dados
    const question = await Question.create({ question_text: userQuestion });
    const answer = await Answer.create({
      question_id: question.question_id,
      answer_text: chatResponse,
    });

    //Retorna a resposta para o usuário
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

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${2000}`);
});
