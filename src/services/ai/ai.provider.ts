// import { openaiGenerate } from "./openai.provider";
// import { ollamaGenerate } from "./ollama.provider";

// export const aiGenerate = async (prompt: string) => {
//   const provider = process.env.AI_PROVIDER || "openai";

//   if (provider === "ollama") {
//     console.log("⚙️ Using Ollama provider");
//     return ollamaGenerate(prompt);
//   }

//   console.log("⚙️ Using OpenAI provider");
//   return openaiGenerate(prompt);
// };