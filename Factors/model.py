#import statements
pip install nltk

#factor functions: also Write what those functions are doing, just a breif summary 
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from nltk.tokenize import word_tokenize
nltk.download('punkt')
nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()


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


# main model :-> from where we are going to invoke all these factor functions
#don't write anything here yet
