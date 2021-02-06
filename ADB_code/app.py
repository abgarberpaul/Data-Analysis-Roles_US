from flask import Flask, render_template, jsonify, request
import PythonCode
# import pymongo
import ast

# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
# from pymongo import MongoClient

# Create an instance of our Flask app.
app = Flask(__name__)

# Create connection variable
# conn = MongoClient('mongodb://localhost:27017')

# # Pass connection to the pymongo instance.
# client = MongoClient(conn)

# # Connect to a database. Will create one if not already available.
# db = conn.Project2
# DataAnalyst = db.DataAnalyst
# # # Drops collection if available to remove duplicates
# db.team.drop()

# # Creates a collection in the database and inserts two documents
# db.team.insert_many(
#     [
#         {
#             'player': 'Jessica',
#             'position': 'Point Guard'
#         },
#         {
#             'player': 'Mark',
#             'position': 'Center'
#         }
#     ]
# )

# TODO: replace these lines with a call to MongoDB
import json 
with open("./DataAnalystFULL.json") as f:
    SMALLdata = json.load(f)



# Set route
@app.route('/')
def index():
    # # Store the entire team collection in a list
    # teams = conn.db.teams.find_one()
    # print(teams)

    # Return the template with the teams list passed in
    return render_template('index.html')

# @app.route("/queries")
# def queries():
#     args = request.args
#     keys = []
#     values = []
#     for key, value in args.items():
#         keys.append(key)
#         values.append(value)
#     mongoquery = ["{"]
#     for i in range(0,len(keys)):
#         if i == 0:
#             mongoquery.append(f'"{keys[i]}":"{values[i]}"')
#         else:
#             mongoquery.append(f',"{keys[i]}":"{values[i]}"')
#     mongoquery.append("}")
#     mongoquerystring = "".join(mongoquery)
#     mongoquerydict = ast.literal_eval(mongoquerystring)
#     print(mongoquerydict)
#     if mongoquerydict == {}:
#         collection = list(DataAnalyst.find(mongoquerydict))
#     else:
#         collection = list(DataAnalyst.find(mongoquerydict))
#     return jsonify(collection)

@app.route("/data")
def data():
    print("success")
    return jsonify(SMALLdata)
    

if __name__ == "__main__":
    app.run(debug=True)
