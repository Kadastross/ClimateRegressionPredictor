import pymongo, atexit
from flask import Flask
from flask_cors import CORS

myclient = pymongo.MongoClient("mongodb+srv://cs411group40:cs411group40@cluster0.gydem.mongodb.net/<dbname>?retryWrites=true&w=majority")
EmissionsData = myclient['EmissionsData']
CO2Emissions = EmissionsData['CO2EmissionsCode']

def exit_handler():
    myclient.close()

atexit.register(exit_handler)
app = Flask(__name__)
CORS(app)

@app.route('/')
@app.route('/retrieveData', methods=['GET', 'POST'])
def retrieveData():
    CO2Emissions.find()
    cursor = collection.find({})
    toReturn = []
    for document in cursor:
        toReturn.append(document)
    return toReturn


if __name__ == "__main__":
    app.run()
