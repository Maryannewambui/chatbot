from flask import Flask, request, jsonify
import random
from flask_cors import CORS
import nltk
from nltk.stem import PorterStemmer
from data import data

app = Flask(__name__)
CORS(app, resources={r"/chat": {"origins": "*"}})

# Ensure necessary nltk dependencies are downloaded
nltk.download("punkt")

stemmer = PorterStemmer()

# Tokenize and stem the user input
def preprocess(sentence):
    tokens = nltk.word_tokenize(sentence.lower())
    return [stemmer.stem(token) for token in tokens]

# Generate a response based on user input
def get_response(user_input):
    if not user_input:
        return "I'm sorry, I didn't receive any input."

    user_input = preprocess(user_input)
    highest_similarity = 0
    best_response = "I'm sorry, I don't understand."

    for intent, info in data.items():
        for pattern in info["patterns"]:
            pattern_tokens = preprocess(pattern)
            similarity = len(set(pattern_tokens) & set(user_input)) / float(len(pattern_tokens)) if pattern_tokens else 0
            if similarity > highest_similarity:
                highest_similarity = similarity
                best_response = random.choice(info["responses"])
    
    return best_response

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    
    if not data or "message" not in data:
        return jsonify({"response": "Invalid input."}), 400

    user_message = data.get("message", "").strip()
    if not user_message:
        return jsonify({"response": "Please enter a message."}), 400

    response = get_response(user_message)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)
