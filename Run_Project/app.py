from flask import Flask, render_template, jsonify, request
from bson.json_util import dumps, loads

# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
from pymongo import MongoClient

# Create an instance of our Flask app.
app = Flask(__name__)

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.DataAnalyst

# Set route
@app.route('/')
def index():
    # Return the template with the list passed in
    return render_template('index.html')

def home():
 image_names = os.listdir('assets/images')
 render_template('home.html', image_name=image_names)

@app.route("/data")
def data():
    queryResult = list(db.DataAnalyst.find())
    json_data = dumps(queryResult[0], indent = 2)
    return(json_data)
    

if __name__ == "__main__":
    app.run(debug=True)
