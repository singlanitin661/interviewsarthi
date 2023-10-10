#install statements
pip install nltk
pip install sentence_transformers
pip install -U git+https://github.com/KornWtp/ConGen.git
pip install language-tool-python

#factor functions: also Write what those functions are doing, just a breif summary 
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from nltk.tokenize import word_tokenize
nltk.download('punkt')
nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()
from sentence_transformers import SentenceTransformer , util             
import language_tool_python
nltk.download('wordnet')
from nltk.corpus import stopwords
nltk.download('stopwords')
stopwords.words('english')
import string
from nltk.stem import WordNetLemmatizer 



#Used to evaluate the emotional intelligence or sentimental score of user's answer
def evaluate_emotional_intelligence(answer):
    # Tokenize the answer
    tokens = word_tokenize(answer)

    # Calculate sentiment scores
    sentiment_scores = sia.polarity_scores(answer)

    # Example of emotional intelligence assessment based on sentiment
    # You can define your own criteria and weights
    sentiment_score = sentiment_scores['compound']
    return sentiment_score

def compare_answers(user_ans,def_ans) :
    # defining model to be used for comparison
    model = SentenceTransformer("kornwtp/ConGen-BERT-Small")
  
    # Compute embedding for both
    embedding_1= model.encode(user_ans, convert_to_tensor=True)
    embedding_2 = model.encode(def_ans, convert_to_tensor=True)
  
    # Compare and genrate score 
    tensor = util.pytorch_cos_sim(embedding_1, embedding_2)
    return float(tensor)

def num_gramm_errors(user_ans) :
    # Create a LanguageTool instance
    tool = language_tool_python.LanguageTool('en-US')
  
    # Check the grammar of the sentence
    matches = tool.check(user_ans)
  
    # Return the number of grammar issues
    return len(matches)

def smallmodel(answer):
    currScore = 0 
    words = word_tokenize(answer)
    stop_words = set(stopwords.words('english'))
    punctuations = set(string.punctuation)
    filtered_words = [word.lower() for word in words if word.lower() not in stop_words and word not in punctuations]
    lemmatizer = WordNetLemmatizer()
    lemmatized_words = [lemmatizer.lemmatize(word) for word in filtered_words]
    num_words = len(lemmatized_words)
    unique_words = set(lemmatized_words)
    num_unique_words = len(unique_words)

    # Calculate the type-token ratio and lexical density
    ttr = num_unique_words / num_words
    lexical_density = num_words / len(words)

    # Calculate the average word length and sentence length
    avg_word_len = sum(len(word) for word in lemmatized_words) / num_words
    sentences = nltk.sent_tokenize(answer)
    avg_sent_len = sum(len(sentence) for sentence in sentences) / len(sentences)

    print("Type-Token Ratio:", ttr)
    print("Lexical Density:", lexical_density)
    print("Average Word Length:", avg_word_len)
    print("Average Sentence Length:", avg_sent_len)



# main model :-> from where we are going to invoke all these factor functions
#don't write anything here yet
