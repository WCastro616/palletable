from flask import Flask, render_template, redirect, request, Response
import json

app = Flask(__name__)

color = {'r':8, 'g':9, 'b':10}

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"



@app.route('/click', methods=['POST'])
def get_coords():
    global color
    data = {'color':color}
    return json.dumps(data)

def update_color(r, g, b):
    global color
    color['r'] = r
    color['g'] = g
    color['b'] = b