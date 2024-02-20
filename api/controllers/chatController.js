import axios from 'axios';
import { OPENAI_API_KEY } from '../config/index.js';
import getInstructions from '../config/instructions.js'

export async function fetchChatGPTResponse(question, assunto, expertiseLevel, linguageType) {
  const instrucao = getInstructions(assunto, expertiseLevel, linguageType)
  console.log(question)
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: `${instrucao} ${question}` },
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
      console.log(response.data.choices[0].message.content)
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao buscar resposta do ChatGPT:", error);
    throw error;
  }
}
