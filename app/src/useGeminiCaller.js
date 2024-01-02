const { GoogleGenerativeAI } = require("@google/generative-ai");

const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 200,
  temperature: 0.1,
  topP: 0.1,
  topK: 16,
};
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyDq4UVgjWhdTUcmYM84DzFQIJqXQi7qRnw', generationConfig);

const GeminiCaller = async (input) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = "You are an Ai model, you are going to evaluate canidates response on the basis of factors like problem-solving, algorithmic thinking,communication, teamwork, adaptability, and how well candidates collaborate with others, especially in agile development environments, Domain Knowledge , candidate's motivation, passion for learning, problem-solving attitude, and how they handle challenges or conflicts, candidate's motivation, passion for learning, problem-solving attitude, and how they handle challenges or conflicts etc. The answer given by you should be an array with 3 values, first value denoting score given by you on the basis of above factors to candidates response, second value is some improvements candidate can use to give better answer next time the max length should be 50 words for this, and the third value is next question , next question should also be in 50 words and should be relevant to software industry and should be based on previous answer given by user, Now generate the same for this `" + input + "`";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text) ;
    let jsonAnswer = {
      "Score": "5/10",
      "Improvements": "Possible improvements in at-max 50 words",
      "Continuations": "A valid example can be as follows: Okay, now moving on to the next question",
      "IdealAnswer": "The ideal answer for the previous question"
    };
    // jsonAnswer = JSON.stringify(jsonAnswer);
    console.log(jsonAnswer);
    console.log(typeof jsonAnswer);
    
  return jsonAnswer;
}

export default GeminiCaller;

// out of 20 score // strictly
// 50 words mein -> improvement 
// next question 