import axios from "axios";
import { OPENAI_API_KEY } from "../config/index.js";
import getInstructions from "../config/instructions.js";

export async function fetchChatGPTResponse(
  question,
  expertiseLevel,
  languageType,
  typeFormatted
) {
  const instrucao = getInstructions(
    question,
    expertiseLevel,
    languageType,
    typeFormatted
  );

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `${question}` }],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    console.log("Entrou no chat controler")
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao buscar resposta do ChatGPT:");
    throw error;
  }
}
