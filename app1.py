# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import subprocess
import os
import json
import requests

app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/send_input', methods=['POST'])
@cross_origin(origin='*')
def receive_input():
    data = request.get_json()
    if 'input' in data:
        received_input = data['input']
        print("Received input:", received_input)
        binary_path='/home/prajwal/Desktop/project/webscraper'
        result=subprocess.check_output([binary_path,received_input, str(10)],stderr=subprocess.STDOUT)
        output_file_path = '/home/prajwal/Desktop/project/output.json'

        print("review gener")

        with open(output_file_path, 'r') as f1:
            data1 = json.load(f1)
        response_summary=requests.post("http://localhost:6000/",json=data1)
        summary_file_path = '/home/prajwal/Desktop/project/summary.json'
            
        with open(summary_file_path, 'w') as f2:
            f2.write(response_summary.text)
        
        with open(summary_file_path, 'r') as f2:
            data2 = json.load(f2)
        
            
            # Create a dictionary containing both data
        # print(response_summary.text)

        print((data2))
        print(type(data2))
        # print(type(response_summary.json()))

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


# curl -H 'Content-Type: application/json' -d '{ "title":"foo" }'-X POST http://192.168.29.136:8000/