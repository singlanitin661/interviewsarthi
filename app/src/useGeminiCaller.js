const { GoogleGenerativeAI } = require("@google/generative-ai");

const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 200,
  temperature: 0.1,
  topP: 0.1,
  topK: 16,
};
const genAI = new GoogleGenerativeAI(
  'AIzaSyDq4UVgjWhdTUcmYM84DzFQIJqXQi7qRnw',
  generationConfig
);
let quest = "Hey User! I am interviewsarthi bot and will assist you in this interview. Let's start with Introduction. Give me brief about yourself!";
const GeminiCaller = async (input) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt =
    "You are an Ai model, you are going to evaluate canidates response on the basis of factors like problem-solving, algorithmic thinking,communication, teamwork, adaptability, and how well candidates collaborate with others, especially in agile development environments, Domain Knowledge , candidate's motivation, passion for learning, problem-solving attitude, and how they handle challenges or conflicts, candidate's motivation, passion for learning, problem-solving attitude, and how they handle challenges or conflicts etc. The answer given by you should be an array with 3 values, first value denoting score given by you on the basis of above factors to candidates response and this value should be out of 10, second value is some improvements candidate can use to give better answer next time the max length should be 50 words for this, and the third value is next question , next question should also be in 50 words and should be relevant to software industry and should be based on previous answer given by user. Now generate the same for this question-answer `" +
    +quest + " " +input +
    "`";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  const parsedResponse = JSON.parse(text);

  const formattedResponse = {
    score: parsedResponse[0],
    feedback: parsedResponse[1],
    question: parsedResponse[2],
  };
  quest = parsedResponse[2] ;
  console.log(formattedResponse) ;
  console.log(typeof formattedResponse) ;
  console.log(text);

  return formattedResponse;
};

export default GeminiCaller;
