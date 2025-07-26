// // app/controllers/openaiControllers.js
// import OpenAI from "openai";
// import dotenv from "dotenv";

// dotenv.config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openAiChat = async (req, res) => {
//   const { message } = req.body;

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: "You are a helpful assistant for GEN-GO Car Rentals." },
//         { role: "user", content: message },
//       ],
//     });

//     res.json({ reply: response.choices[0].message.content });
//   } catch (error) {
//     console.error("OpenAI Error:", error?.response?.data || error.message);
//     res.status(500).json({ error: "Something went wrong with AI response" });
//   }
// };

// const openaiCltr = { openAiChat };
// export default openaiCltr;
