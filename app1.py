# app.py
from flask import Flask, request
from flask_cors import CORS
import subprocess
import os
import json

app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


@app.route('/send_input', methods=['POST'])
def receive_input():
    data = request.get_json()
    if 'input' in data:
        received_input = data['input']
        print("Received input:", received_input)
        binary_path='/home/prajwal/Desktop/project/webscraper'
        result=subprocess.check_output([binary_path,received_input, str(30)],stderr=subprocess.STDOUT)
        output_file_path = '/home/prajwal/Desktop/project/output.json'

        summary_file_path = '/home/prajwal/Desktop/project/summary.json'

        with open(output_file_path, 'r') as f1:
            data1 = json.load(f1)
            
        with open(summary_file_path, 'r') as f2:
            data2 = json.load(f2)
        print(data1)
            
            # Create a dictionary containing both data
        response_data = {
            "review": data1,
            "summary": data2
        }
        
        return response_data
        # if os.path.exists(output_file_path):
        #     return 
        # else:
        #     return "response"
    else:
        return 'Invalid input data', 400


if __name__ == '__main__':
    app.run(debug=True)
