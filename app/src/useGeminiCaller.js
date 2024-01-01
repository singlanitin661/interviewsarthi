const { GoogleGenerativeAI } = require("@google/generative-ai");

const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 200,
  temperature: 0.1,
  topP: 0.1,
  topK: 16,
};
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_Gemini_key, generationConfig);

const GeminiCaller = async (input) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = "You are an AI model trained to tell if user's response was upto mark or not. The result should be a single string message giving score of user answer whether you liked the answer or not and giving a score out of 100. Now predict for this `" + input + "`";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // const text = "gemini";
    console.log(text + input) ;
  return text;
}

export default GeminiCaller;