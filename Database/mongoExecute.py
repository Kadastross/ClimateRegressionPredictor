import pymongo, flask, atexit

myclient = pymongo.MongoClient("mongodb+srv://cs411group40:cs411group40@cluster0.gydem.mongodb.net/<dbname>?retryWrites=true&w=majority")
EmissionsData = myclient['EmissionsData']
CO2Emissions = EmissionsData['CO2EmissionsCode']

def exit_handler():
    myclient.close()

atexit.register(exit_handler)
app = Flask(__name__)
CORS(app)

if __name__ == "__main__":
    app.run()
