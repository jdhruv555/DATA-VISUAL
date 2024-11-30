from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/save-chart', methods=['POST'])
def save_chart():
    data = request.json
    # Here you could save the chart data to a database
    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(debug=True, port=8080)
