pip install pyaudio
pip install SpeechRecognition
import speech_recognition as sr

# Initialize the recognizer
recognizer = sr.Recognizer()

# Capture audio from the microphone
with sr.Microphone() as source:
    print("Please start speaking...")
    recognizer.adjust_for_ambient_noise(source, duration=1)  # Adjust for ambient noise
    audio = recognizer.listen(source)

# Perform speech recognition
try:
    print("Recognizing...")
    text = recognizer.recognize_google(audio)  # Use Google's speech recognition
    print(f"Text: {text}")
except sr.UnknownValueError:
    print("Sorry, I could not understand the audio.")
except sr.RequestError as e:
    print(f"An error occurred: {e}")

# You can now process or utilize the recognized text as needed in your project.
