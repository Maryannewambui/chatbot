import random
import nltk
from nltk.stem import PorterStemmer

# Initialize NLTK
nltk.download("punkt")
stemmer = PorterStemmer()

# Load data from data.py
from data import data

# Tokenize and stem the user input
def preprocess(sentence):
    tokens = nltk.word_tokenize(sentence.lower())
    return [stemmer.stem(token) for token in tokens]

# Generate a response based on user input
def get_response(user_input):
    user_input = preprocess(user_input)
    highest_similarity = 0
    best_response = "I'm sorry, I don't understand."

    for intent, info in data.items():
        for pattern in info["patterns"]:
            pattern_tokens = preprocess(pattern)
            similarity = len(set(pattern_tokens) & set(user_input)) / float(len(pattern_tokens))
            if similarity > highest_similarity:
                highest_similarity = similarity
                best_response = random.choice(info["responses"])
    
    return best_response

# Chat loop
def chat():
    print("Chatbot: Hello! I'm your friendly chatbot. Type 'exit' to end the conversation.")
    
    while True:
        user_input = input("You: ")
        
        if user_input.lower() == "exit":
            break
        
        response = get_response(user_input)
        print("Chatbot:", response)

if __name__ == "__main__":
    chat()
