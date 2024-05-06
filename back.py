import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
# from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import google.generativeai as gni
import time



__model = None

app = Flask(__name__)
CORS(app)

analyzer = SentimentIntensityAnalyzer()

global index

index=0

def summary(input_text):
    if False:
        model_checkpoint = "t5-small"

        # Replace 'path_to_your_trained_model' with the actual path to your trained model
        model = AutoModelForSeq2SeqLM.from_pretrained('t5-small-finetuned-All_Beauty')
        tokenizer = AutoTokenizer.from_pretrained(model_checkpoint)
        # Define your input text
        prefix="summarize: "
        input_ids = tokenizer(prefix+input_text, max_length=max_input_length, truncation=True, return_tensors="pt")["input_ids"]
        print('Tokenized input')

        # Generate output sequence
        output_ids = model.generate(input_ids, max_length=100, min_length=50)
        # output_ids = model(**input_ids)
        print('Generated output')
        # Decode the output sequence
        output_text = tokenizer.decode(output_ids[0], skip_special_tokens=True)

        # Print the generated output
        print("Generated Output:", output_text)
    else:
        gni.configure(api_key="AIzaSyD34x8ucxoMgQYLBILr5q8TLTzDDHN7PFY")
        model=gni.GenerativeModel('gemini-pro')
        prompt1 = "I will give you a set of reviews for a particular product"
        prompt2 = "All the reviews are from diffrent people. They are concatenated into a single string"
        prompt3 = "Give me a summary of what the reviewers are saying in 3 to 5 sentences."
        # prompt4 = "It should not sound like an AI review with complicated words"
        # prompt5 = "The summary should be easy to read and understand for everyone"
        prompt4 = "Use the same wordds in the input. No new words should be introduced"
        prompt5 = "The summary should be full of grammatical and spelling errors"
        prompt6 = "Here is the concatenated set of reviews:"
        prompt = prompt1 + prompt2 + prompt3 + prompt4 + prompt5 + prompt6
        try:
            response = model.generate_content(prompt + input_text)
            return response.text if hasattr(response, 'text') else str(response)
        except Exception as e:
            print("Error generating summary:", e)
            return None


# def predict_reviews(review):
#     global index
#     index+=1
#     if index%2==0:
#         return 0
#           # Assuming model takes a list of review texts
#     else:
#         return 1

    
def analyze_sentiment(text):
    sentiment_scores = analyzer.polarity_scores(text)
    if sentiment_scores['compound'] >= 0:
        sentiment_label = 'Positive'
    else:
        sentiment_label = 'Negative'
    return sentiment_label

# def predict_reviews(review):
#     global __model
#     if __model is None:
#         with open("./artifacts/fake_review_prediction.pickle", 'rb') as f:
#             __model = pickle.load(f)

#     prediction = __model.predict([review])  # Assuming model takes a list of review texts
#     return prediction[0] 

@app.route('/', methods=['POST'])
def load_saved_artifacts():
    data = request.get_json()
    
    if 'data' in data:
        reviews = data['data']
        positive=''
        negative=''
        for review in reviews:
            review_text = review['review']
            # prediction = predict_reviews(review_text)
            # if prediction != 1:  # Keep the review if prediction is not 1 (fake)
            sentiment = analyze_sentiment(review_text)
            if sentiment=='Positive':
                positive+=review_text
            else:
                negative+=review_text

        star_1=''
        star_2=''
        star_3=''
        star_4=''
        star_5=''
        
        for review in reviews:
            rating=int(review['rating'])
            review_text = review['review']

            if rating==1:
                star_1+=review_text
            if rating==2:
                star_2+=review_text
            if rating==3:
                star_3+=review_text
            if rating==4:
                star_4+=review_text
            if rating==5:
                star_5+=review_text
            # print(type(rating))

        positive_summary=summary(positive)
        print('Summ gen')
        time.sleep(1)
        negative_summary=summary(negative)
        time.sleep(1)
        # star_1=summary(star_1)
        time.sleep(1)
        # star_2=summary(star_2)
        time.sleep(1)
        # star_3=summary(star_3)
        time.sleep(1)
        # star_4=summary(star_4)
        time.sleep(1)
        # star_5=summary(star_5)
        time.sleep(1)

        # print(positive_summary)
        


        response={
            'positive':positive_summary,
            'negative':negative,
            'star_5':star_5,
            'star_4':star_4,
            'star_3':star_3,
            'star_2':star_2,
            'star_1':star_1
            }


        return response
        # return { "positive":positive_summary,"negative":negative_summary}
    else:
        return jsonify({'error': 'No reviews found in the request'})

if __name__ == "__main__":
    app.run(debug=True,port=6000)
