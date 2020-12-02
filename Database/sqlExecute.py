import mysql.connector, atexit, csv
from mysql.connector import Error
from flask import Flask, render_template, request, redirect, flash, url_for, jsonify
from flask_cors import CORS
from basicRegs import linReg, expReg


# dbIP = "localhost"
dbIP = "sql9.freemysqlhosting.net"
dbUser = "sql9379236"
dbPassword = "Ax3afA2tkU"

connection = mysql.connector.connect(host = dbIP,
                                    user = dbUser,
                                    password = dbPassword,
                                    database = "sql9379236",
                                    auth_plugin = 'mysql_native_password')

def exit_handler():
    connection.close()

atexit.register(exit_handler)
app = Flask(__name__)
CORS(app)

#global variables
userID = ""

#FIGURING OUT IF TUPLE EXISTS IN DATABASE:
# def simExists(simName, userID):
#     sql_login_query = "SELECT count(*) FROM Simulation WHERE UserID = %s AND Password = %s"
#     cursor = connection.cursor()
#     cursor.execute(sql_login_query, (results["username"], results["password"]))
#     records = cursor.fetchall()
#     cursor.close()
#     print(records[0][0])
#     return str(records[0][0])




@app.route('/')

#CREATE A NEW SIMULATION (ADD TO SIMULATION TABLE)
@app.route('/createSimulation', methods=['GET', 'POST'])
def createSimulation():
    print("insert completed")
    results = request.get_json()
    sql_insert_Query = "INSERT INTO Simulation (SimulationName, UserID, Country) VALUES (%s, %s, %s)"
    cursor = connection.cursor()
    print(results)
    cursor.execute(sql_insert_Query, (results["simName"], results["username"], results["country"]))
    connection.commit()
    cursor.close()
    return "s"

#ADD NEW DATA POINT (ADD TO DATAPOINTS TABLE)
@app.route('/addNewDataPoint', methods = ['GET', 'POST'])
def addNewDataPoint():
    results = request.get_json()
    sql_find_simID = "SELECT SimulationID, Country FROM Simulation where SimulationName = %s AND UserID = %s"
    cursor = connection.cursor()
    cursor.execute(sql_find_simID, (results["simName"], results["username"]))
    records = cursor.fetchall()
    simID = records[0][0]
    country = records[0][1]
    sql_insert_Query = "INSERT INTO Datapoints (SimulationID, Year, Country, CO2Emissions) VALUES (%s, %s, %s, %s)"
    cursor = connection.cursor()
    cursor.execute(sql_insert_Query, (simID, results["year"], country, results["co2"]))
    connection.commit()
    cursor.close()
    return "s"

#UPDATE DATA POINTS (UPDATE FROM DATAPOINTS TABLE)
@app.route('/updateSimulation', methods=['GET', 'POST'])
def updateSimulation():
    results = request.get_json()
    sql_update_Query = "UPDATE Datapoints SET CO2Emissions = %s WHERE SimulationID = (SELECT SimulationID FROM Simulation WHERE SimulationName = %s AND UserID = %s) AND Year = %s"
    cursor = connection.cursor()
    cursor.execute(sql_update_Query, (results["co2"], results["simName"], results["username"], results["year"]))
    connection.commit()
    cursor.close()
    return "s"

#DELETE SIMULATION (DELETE FROM SIMULATION)
@app.route('/deleteSimulation', methods=['GET', 'POST'])
def deleteSimulation():
    results = request.get_json()
    sql_delete_Query = "DELETE FROM Simulation WHERE SimulationName = %s AND UserID = %s"
    cursor = connection.cursor()
    cursor.execute(sql_delete_Query, (results["simName"], results["username"]))
    connection.commit()
    cursor.close()
    return "s"

#GET ALL DATAPOINTS ASSOCIATED WITH A SIMULATION NAME AND RETURN RESULTS OF SQL QUERY
@app.route('/viewSimulation', methods=['GET', 'POST'])
def viewSimulation():
    results = request.get_json()
    sql_view_Query = "SELECT * FROM Datapoints Natural Join Simulation WHERE SimulationName = %s AND UserID = %s"
    cursor = connection.cursor()
    cursor.execute(sql_view_Query, (results["simName"], results["username"]))
    records = cursor.fetchall()
    cursor.close()
    if (len(records) == 0):
        return ""
    print(records)
    dataNeeded = []
    for i in range(len(records)):
        dataNeeded.append([records[i][1], records[i][2], records[i][3]])
    return jsonify(dataNeeded);

@app.route('/runSimulation', methods=['GET', 'POST'])
def runSimulation():
    results = request.get_json()
    sql_run_Query = "SELECT * FROM Datapoints Natural Join Simulation WHERE SimulationName = %s AND UserID = %s"
    cursor = connection.cursor()
    cursor.execute(sql_run_Query, (results["simName"], results["username"]))
    records = cursor.fetchall()
    cursor.close()
    if (len(records) == 0):
        return "fail"
    print(records)
    startYear = 0
    country = records[0][1]
    userInput, existingData = [], []
    for i in range(len(records)):
        userInput.append({"Year": records[i][2], "CO2Emissions": records[i][3]})
    print(userInput)
    # sql_run_Query = "SELECT Year, CO2Emissions FROM Table WHERE Country = %s"
    # cursor.execute(sql_run_Query, (country))
    # records = cursor.fetchall()
    # for i in range(len(records)):
    #     existingData.append({"Year": records[i][0], "CO2Emissions": records[i][1]})
    # linModel = linReg(startYear, userInput, existingData)
    # expModel = expReg(startYear, userInput, existingData)
    retval = {}
    # retval['Country'] = country
    # retval['ExistingData'] = existingData
    # retval['LinModel'] = linModeldd
    # retval['ExpModel'] = expModel
    return jsonify(retval);

#GET ALL SIMULATION NAMES THE USER CREATED.
@app.route('/getSimulationNames', methods=['GET', 'POST'])
def getSimulationNames():
    results = request.get_json()
    sql_view_Query = "SELECT SimulationName FROM Simulation WHERE UserID = '%s'" % (results["username"])
    cursor = connection.cursor()
    cursor.execute(sql_view_Query)
    records = cursor.fetchall()
    cursor.close()
    return jsonify(records)

#GET ALL YEARS FROM THE DATAPOITNS THE USER ADDED.
@app.route('/getYearData', methods=['GET', 'POST'])
def getYearData():
    results = request.get_json()
    sql_view_Query = "SELECT Year FROM Datapoints Natural Join Simulation WHERE SimulationName = %s AND UserID = %s"
    cursor = connection.cursor()
    cursor.execute(sql_view_Query, (results["simName"],results["username"]))
    records = cursor.fetchall()
    cursor.close()
    return jsonify(records)

#GET LIST OF COUNTRIES FOR DROPDOWN IN FRONT END
@app.route('/getCountries', methods=['GET'])
def getCountries():
    sql_countries_query = "SELECT CountryName FROM Countries"
    cursor = connection.cursor()
    cursor.execute(sql_countries_query)
    records = cursor.fetchall()
    cursor.close()
    return jsonify(records)

#CHECK IF USER EXISTS:
def existsUser(user):
    sql_login_query = "SELECT count(*) FROM User WHERE UserID = '%s'" % (user)
    cursor = connection.cursor()
    cursor.execute(sql_login_query)
    records = cursor.fetchall()
    cursor.close()
    return records[0][0]
#SIGN UP
@app.route('/signUp', methods=['GET', 'POST'])
def createUser():
    results = request.get_json()
    numUser = existsUser(results["userID"])
    print(numUser)
    if (numUser == 1):
        print("reached")
        return "xxF"
    sql_insert_Query = "INSERT INTO User (UserID, Password) VALUES (%s, %s)"
    cursor = connection.cursor()
    cursor.execute(sql_insert_Query, (results["userID"], results["password"]))
    connection.commit()
    cursor.close()
    userID = results["userID"]
    return userID

#LOGIN
@app.route('/logIn', methods=['GET', 'POST'])
def logIn():
    results = request.get_json()
    sql_login_query = "SELECT count(*) FROM User WHERE UserID = %s AND Password = %s"
    cursor = connection.cursor()
    cursor.execute(sql_login_query, (results["username"], results["password"]))
    records = cursor.fetchall()
    cursor.close()
    print(records[0][0])
    return str(records[0][0])

@app.route('/getUserID', methods=['GET'])
def getUserID():
    print("USER: ", userID)
    return userID

if __name__ == "__main__":
    app.run()
