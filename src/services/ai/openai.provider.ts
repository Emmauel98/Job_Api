// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// export const openaiGenerate = async (prompt: string) => {
//   const completion = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [{ role: "user", content: prompt }],
//     temperature: 0.7,
//   });

//   return completion.choices[0].message.content?.trim() || "";
// };