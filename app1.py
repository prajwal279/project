# app.py
from flask import Flask, request, jsonify,send_file
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)


@app.route('/send_input', methods=['POST'])
def receive_input():
    data = request.get_json()
    if 'input' in data:
        received_input = data['input']
        print("Received input:", received_input)
        binary_path='/home/prajwal/Desktop/project/webscraper'
        result=subprocess.check_output([binary_path,received_input, str(50)],stderr=subprocess.STDOUT)
        # output_file_path = '/home/prajwal/Desktop/project/output.json'
        
        # if os.path.exists(output_file_path):
        #     return send_file(output_file_path, as_attachment=True)
        # else:
        #     return result
        return result
    else:
        return 'Invalid input data', 400


if __name__ == '__main__':
    app.run(debug=True)
