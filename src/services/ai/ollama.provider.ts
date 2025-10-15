// import axios from "axios";

// const OLLAMA_API_URL = process.env.OLLAMA_API_URL || "http://localhost:11434";

// export const ollamaGenerate = async (prompt: string) => {
//   const { data } = await axios.post(`${OLLAMA_API_URL}/api/generate`, {
//     model: "mistral", // or phi3, llama3 etc.
//     prompt,
//   });

//   // Ollama returns text in `data.response`
//   return data.response || data.output || "";
// };