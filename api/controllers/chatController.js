import OpenAI from 'openai';
import { OPENAI_API_KEY } from "../config/index.js";
import getInstructions from "../config/instructions.js";

const openai = new OpenAI({
  apiKey: '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' // This is the default and can be omitted
});

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
    const params = {
      messages: [{ role: 'user', content: `${instrucao}` }],
      model: 'gpt-3.5-turbo',
    };
    const chatCompletion = (await openai.chat.completions.create(params)).choices[0].message;
    return chatCompletion;
  } catch (error) {
    console.error("Erro ao buscar resposta do ChatGPT:", error);
    throw error;
  }
}
