# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo
import json
import pandas as pd 

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.DataAnalyst

# Drops collection if available to remove duplicates
db.DataAnalyst.drop()

# read in CSV data file
dataanalyst = pd.read_csv("./DataAnalystFULL.csv", delimiter=",")

# write to JSON file
mongoFormatted = json.loads(dataanalyst.to_json())

db.DataAnalyst.insert_one(mongoFormatted)

DataAnalysts = list(db.DataAnalyst.find())
print(DataAnalysts)