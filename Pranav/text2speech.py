pip install pyttsx3
import pyttsx3

# Initialize the TTS engine
engine = pyttsx3.init()

# Specify the text to be spoken
text = "Hello, this is a test. My name is InterviewBot"
st ='''Good day, ladies and gentlemen, and welcome to this exclusive interview with a cutting-edge AI bot. Today, we embark on a fascinating journey into the world of artificial intelligence, where technology meets human interaction. I'm [Your Name], your host for this conversation, and we're thrilled to introduce you to our AI guest.

In the age of rapid advancements in technology, AI bots have become integral to our daily lives, from providing customer support to helping us with research, and even assisting with personal tasks. But what exactly lies behind the algorithms and lines of code that drive these intelligent beings? What are their capabilities, limitations, and ethical considerations?

During this interview, we'll delve deep into the mind of our AI bot, exploring its origins, its purpose, and its potential impact on various industries. We'll also discuss the challenges of developing such technology and how it can be harnessed for the betterment of society.

So, without further ado, let's meet our AI guest and embark on this enlightening conversation about the past, present, and future of artificial intelligence'''

# Play the speech audio in real-time
engine.setProperty('rate', 150)
voices = engine.getProperty('voices')
engine.setProperty('voice',voices[1].id)

engine.say(st)
engine.runAndWait()
