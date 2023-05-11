import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import string
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
from nltk.sentiment.vader import SentimentIntensityAnalyzer
nltk.download('vader_lexicon')
import requests
import json
import spacy
from nltk.corpus import wordnet
from textblob import TextBlob
import re
from textblob import TextBlob
import sklearn
import requests
from sklearn.feature_extraction.text import TfidfVectorizer
import nltk.cluster.util
from sklearn.metrics.pairwise import cosine_distances

# Define a sample answer for evaluation
answer = "I am an energetic person, an effective communicator, and a quick learner. I was also one of the top students in my batch while I was pursuing a B.E degree in the XYZ domain. I worked on various projects related to the software domain which provided me a great deal of technical exposure along with the importance of working in a team and the value of client satisfaction. I have worked on developing various enterprise-level web applications for helping companies solve problems like ensuring business continuity, market research analysis, etc. So, I believe I am a good fit for technology-centric roles in your company."
currScore = 0 
totalScore = 0

# Tokenize the answer into individual words
words = word_tokenize(answer)

# Remove stopwords (common words that don't carry much meaning) and punctuation marks
stop_words = set(stopwords.words('english'))
punctuations = set(string.punctuation)
filtered_words = [word.lower() for word in words if word.lower() not in stop_words and word not in punctuations]

# Lemmatize the words (reduce them to their base form) for greater accuracy
lemmatizer = WordNetLemmatizer()
lemmatized_words = [lemmatizer.lemmatize(word) for word in filtered_words]

# Calculate the total number of words and unique words
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

# Print the results
print("Type-Token Ratio:", ttr)
print("Lexical Density:", lexical_density)
print("Average Word Length:", avg_word_len)
print("Average Sentence Length:", avg_sent_len)
currScore = currScore + ttr 
currScore = currScore + lexical_density 
totalScore = totalScore + 2


nlp = spacy.load('en_core_web_sm')

def evaluate_answer(answer, job_description, company_culture_keywords):
    # Convert answer and job description to lowercase for case insensitivity
    answer = answer.lower()
    job_description = job_description.lower()

    # Tokenize answer and job description using spaCy
    answer_doc = nlp(answer)
    job_doc = nlp(job_description)

    # Extract all synonyms for company culture keywords using WordNet
    synonyms = set()
    for keyword in company_culture_keywords:
        for synset in wordnet.synsets(keyword):
            for lemma in synset.lemmas():
                synonyms.add(lemma.name().lower())

    # Evaluate answer based on job requirements and company culture keywords
    required_words = set()
    for token in job_doc:
        if token.is_alpha and not token.is_stop:
            required_words.add(token.lemma_.lower())

    culture_words = set(company_culture_keywords) | synonyms

    answer_words = set()
    for token in answer_doc:
        if token.is_alpha and not token.is_stop:
            answer_words.add(token.lemma_.lower())

    required_word_matches = len(required_words.intersection(answer_words))
    culture_word_matches = len(culture_words.intersection(answer_words))

    # Evaluate answer sentiment using TextBlob
    sentiment_score = TextBlob(answer).sentiment.polarity

    # Return a score between 0 and 1 based on the word matches and sentiment score
    return (required_word_matches + culture_word_matches) / (len(required_words) + len(culture_words)) * (sentiment_score + 1) / 2
job_description = "We are seeking a self-motivated and enthusiastic individual to join our team. The ideal candidate will have excellent communication skills, be comfortable with multitasking, and possess a strong work ethic. Our company values teamwork and a positive attitude, and we offer a competitive salary and benefits package."

culture_keywords = ["teamwork", "positive attitude", "self-motivated","innovation", "collaboration", "diversity", "flexibility"]

score = evaluate_answer(answer, job_description, culture_keywords)
print(score)
currScore += score
totalScore += 1



def get_sentiment_score(text):
    """
    Returns a sentiment score between -1 and 1 for the given text.
    """
    blob = TextBlob(text)
    sentiment_score = blob.sentiment.polarity
    return sentiment_score


def evaluate_hr_answer(job_desc, company_culture, hr_answer, sentiment_threshold=0.1, match_threshold=0.5):
    
    # Extract keywords from job description and company culture
    job_keywords = re.findall(r'\b\w+\b', job_desc.lower())
    culture_keywords = re.findall(r'\b\w+\b', company_culture.lower())
    
    # Calculate sentiment score of HR answer
    sentiment_score = get_sentiment_score(hr_answer)
    
    # Calculate match score of HR answer
    match_score = 0
    
    # Check for keyword matches
    hr_answer_keywords = re.findall(r'\b\w+\b', hr_answer.lower())
    for keyword in job_keywords:
        if keyword in hr_answer_keywords:
            match_score += 1
    
    # Check for culture keyword matches
    for keyword in culture_keywords:
        if keyword in hr_answer_keywords:
            match_score += 1
            
    # Calculate match threshold
    total_keywords = len(job_keywords) + len(culture_keywords)
    match_threshold = total_keywords * match_threshold
    
    # Calculate final score
    final_score = (sentiment_score + match_score) / (total_keywords + 1)
    
    # Check if final score meets match and sentiment thresholds
    return final_score
job_desc = "We are looking for a software developer with experience in Python and web development."
company_culture = "Our company values innovation, teamwork, and work-life balance."
score = evaluate_hr_answer(job_desc, company_culture, answer, sentiment_threshold=0.1, match_threshold=0.5)

print("Score:", score)
currScore += score
totalScore += 1

# sample text to check
text = answer

# list of sources to check against
sources = ["This is some sample text that we want to check for plagiarism.",
           "Copying text without permission is considered plagiarism.",
           "Plagiarism is a serious offense in the academic world."]

# tokenize the text and sources
tokenizer = nltk.tokenize.RegexpTokenizer(r'\w+')
text_tokens = tokenizer.tokenize(text.lower())
source_tokens = [tokenizer.tokenize(source.lower()) for source in sources]

# calculate the TF-IDF vectors for the text and sources
tfidf = TfidfVectorizer(tokenizer=tokenizer.tokenize)
text_tfidf = tfidf.fit_transform([text])
source_tfidf = tfidf.transform(sources)

# calculate the cosine similarities between the text and sources
cosine_similarities = cosine_distances(text_tfidf, source_tfidf)

# check for copied text
copied = False
for i, source in enumerate(sources):
    if cosine_similarities[0][i] < 0.5:
        print("Text is copied from source: ", source)
        currScore -= 1 
        totalScore += 1
        copied = True

# check for AI-generated text
ai = False
response = requests.post('https://api.openai.com/v1/engines/davinci-codex/completions', json={
    'prompt': text,
    'max_tokens': 10,
    'temperature': 0.5,
})
if response.status_code == 200:
    response_text = response.json()['choices'][0]['text']
    if response_text != text:
      currScore -= 1
      totalScore += 1
      print("Text is AI-generated: ", response_text)
      ai = True

# print the result
if not copied and not ai:
  currScore += 1
  print("Text is original.")



import spacy

nlp = spacy.load("en_core_web_sm")

def detect_professionalism(text):
    doc = nlp(text)
    professionalism_score = 0
    
    # Iterate over each sentence in the text
    for sentence in doc.sents:
        # Check if the sentence starts with a verb or a capital letter
        if sentence[0].pos_ == "VERB" or sentence[0].is_title:
            professionalism_score += 1
            
        # Check if the sentence contains professional jargon
        for token in sentence:
            if token.text.lower() in ["proactive", "initiative", "communication", "collaboration", "leadership", "responsibility", "organizational", "efficiency", "accountability", "timeliness"] : 
                professionalism_score += 1
    
    return professionalism_score / len(list(doc))

currScore += (detect_professionalism(answer))
totalScore += 1


# # input values
# job_description = "We are looking for a software engineer with experience in Python, Java, and data structures"
# company_culture_keywords = [ "problem-solving", "innovation"," tech-savvy", "creative", "quick learner","collaborative", "innovative", "inclusive"]

# # define function to check for synonyms
# # def get_synonyms(word):
# #     response = requests.get("https://www.thesaurus.com/api/v1/references/thesaurus/?term={word}&key=YOUR_API_KEY_HERE")
# #     data = json.loads(response.content)
# #     synonyms = [word]
# #     if 'meta' in data and data['meta']['syns']:
# #         synonyms = [syn for syn in data['meta']['syns'][0] if syn != word]
# #     return synonyms

# # create a set of required words that includes synonyms
# # required_words = set()
# # for word in job_description.split():
# #     synonyms = get_synonyms(word)
# #     required_words.update(synonyms)

# # function to evaluate HR representative's answer
# def evaluate_answer(answer):
#     score = 0
#     # check for required words and their synonyms
#     # for word in required_words:
#     #     if word in answer:
#     #         score += 1
#         # else:
#         #     synonyms = get_synonyms(word)
#         #     for synonym in synonyms:
#         #         if synonym in answer:
#         #             score += 1
#         #             break
#     # check for company culture keywords
#     for keyword in company_culture_keywords:
#         if keyword in answer:
#             score += 1
#     # check sentiment of answer
#     sentiment_score = get_sentiment_score(answer)
#     if sentiment_score > 0.5:
#         score += 1
#     # return final score
#     return score

# # sample answer
# answer = "I am an energetic person, an effective communicator, and a quick learner. I was also one of the top students in my batch while I was pursuing a B.E degree in the XYZ domain. I worked on various projects related to the software domain which provided me a great deal of technical exposure along with the importance of working in a team and the value of client satisfaction. I have worked on developing various enterprise-level web applications for helping companies solve problems like ensuring business continuity, market research analysis, etc. So, I believe I am a good fit for technology-centric roles in your company."
# # evaluate answer
# score = evaluate_answer(answer)
# print(f"Score: {score}")
