import mysql.connector, atexit, csv, neo4j
from mysql.connector import Error
from flask import Flask, render_template, request, redirect, flash, url_for, jsonify
from flask_cors import CORS
from basicRegs import linReg, expReg
import lstmtest as lstm
import tensorflow

# dbIP = "localhost"
dbIP = "sql9.freemysqlhosting.net"
dbUser = "sql9379892"
dbPassword = "83c7iMZZUu"

connection = mysql.connector.connect(host = dbIP,
                                    user = dbUser,
                                    password = dbPassword,
                                    database = "sql9379892",
                                    auth_plugin = 'mysql_native_password')

driver = neo4j.GraphDatabase.driver('bolt://35-238-45-189.gcp-neo4j-sandbox.com:7687',auth=("neo4j", "KtTJdqBc6jzeNze4"))

def create_user_node(tx, name):
    tx.run("CREATE (a:`User` { `UserID`: $user }) RETURN a", user=name)

def create_simulation_node(tx, name, simID, simulationName):
    tx.run("MATCH (a:User {UserID: $user}) CREATE (a)-[:WROTE]->(b:Simulation {SimulationID: $id, Name: $simName})", user=name, id=simID, simName=simulationName)

def delete_simulation_node(tx, simID):
    tx.run("MATCH (a:Simulation {SimulationID:$id}) DETACH DELETE a", id=simID)

def shared_to_relationship(tx, userA, userB, simID):
    tx.run("MATCH (s:Simulation {SimulationID:$id}) MATCH (u:User {UserID: $user}) CREATE (s)-[:SHARED_TO]->(u)", id=simID, user=userB)

def find_shared_sims(tx, username):
    sharedSims = []
    result = tx.run("MATCH (a:User)-[:WROTE]->(b:Simulation)-[:SHARED_TO]->(c:User {UserID: $user}) RETURN a.UserID AS User, b.Name AS SimName", user=username)
    for record in result:
        sharedSims.append("{} {}".format(record["SimName"], record["User"]))
    return sharedSims

def exit_handler():
    connection.close()
    driver.close()

atexit.register(exit_handler)
app = Flask(__name__)
CORS(app)

#CHECK IF USER EXISTS:
def existsUser(user):
    sql_login_query = "SELECT count(*) FROM User WHERE UserID = '%s'" % (user)
    cursor = connection.cursor()
    cursor.execute(sql_login_query)
    records = cursor.fetchall()
    cursor.close()
    return records[0][0]


@app.route('/')

@app.route('/findSharedSimulations', methods=['GET', 'POST'])
def findSharedSimulations():
    results = request.get_json()
    sharedSims = []
    with driver.session() as session:
        sharedSims = session.read_transaction(find_shared_sims, results["username"])

    return jsonify(sharedSims)

@app.route('/shareSimulations', methods=['GET', 'POST'])
def shareSimulations():
    results = request.get_json()

    if not existsUser(results["userShare"]):
        return '0'

    cursor = connection.cursor()
    sql_getID_query = "SELECT SimulationID FROM Simulation WHERE SimulationName = %s AND UserID = %s"
    cursor.execute(sql_getID_query, (results["simShare"], results["username"]))
    response = cursor.fetchall()
    cursor.close()
    simID = response[0][0]
    sharedSims = []
    with driver.session() as session:
        sharedSims = session.read_transaction(find_shared_sims, results["userShare"])

    for sharedSim in sharedSims:
        if results["simShare"] in sharedSim:
            return '1'

    with driver.session() as session:
        session.write_transaction(shared_to_relationship, results["username"], results["userShare"], simID)

    return '1'


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

    sql_getID_query = "SELECT SimulationID FROM Simulation WHERE SimulationName = %s AND UserID = %s AND Country = %s"
    cursor.execute(sql_getID_query, (results["simName"], results["username"], results["country"]))
    response = cursor.fetchall()
    cursor.close()
    simID = response[0][0]

    with driver.session() as session:
        session.write_transaction(create_simulation_node, results["username"], simID, results["simName"])

    return "s"

#ADD NEW DATA POINT (ADD TO DATAPOINTS TABLE)
@app.route('/addNewDataPoint', methods = ['GET', 'POST'])
def addNewDataPoint():
    results = request.get_json()
    sql_find_simID = "SELECT SimulationID FROM Simulation where SimulationName = %s AND UserID = %s"
    cursor = connection.cursor()
    cursor.execute(sql_find_simID, (results["simName"], results["username"]))
    records = cursor.fetchall()
    simID = records[0][0]
    sql_check_datapoints = "SELECT count(*) FROM Datapoints WHERE SimulationID = %s AND Year = %s"
    cursor.execute(sql_check_datapoints, (simID, results["year"]))
    records2 = cursor.fetchall()
    exists = records2[0][0]
    if exists:
        sql_update_Query = "UPDATE Datapoints SET CO2Emissions = %s WHERE SimulationID = (SELECT SimulationID FROM Simulation WHERE SimulationName = %s AND UserID = %s) AND Year = %s"
        cursor.execute(sql_update_Query, (results["co2"], results["simName"], results["username"], results["year"]))
    else:
        sql_insert_Query = "INSERT INTO Datapoints (SimulationID, Year, CO2Emissions) VALUES (%s, %s, %s)"
        cursor.execute(sql_insert_Query, (simID, results["year"], results["co2"]))
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

    cursor = connection.cursor()
    sql_getID_query = "SELECT SimulationID FROM Simulation WHERE SimulationName = %s AND UserID = %s"
    cursor.execute(sql_getID_query, (results["simName"], results["username"]))
    response = cursor.fetchall()
    simID = response[0][0]

    sql_delete_Query = "DELETE FROM Simulation WHERE SimulationName = %s AND UserID = %s"
    cursor.execute(sql_delete_Query, (results["simName"], results["username"]))
    cursor.close()
    connection.commit()

    with driver.session() as session:
        session.write_transaction(delete_simulation_node, simID)

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
        dataNeeded.append([records[i][5], records[i][1], records[i][2]])
    return jsonify(dataNeeded)

#PERFORM MODELING FOR GRAPH
@app.route('/runSimulation', methods=['GET', 'POST'])
def runSimulation():
    results = request.get_json()
    sql_run_Query = "SELECT * FROM Datapoints Natural Join Simulation WHERE SimulationName = %s AND UserID = %s"
    cursor = connection.cursor()
    cursor.execute(sql_run_Query, (results["simName"], results["username"]))
    records = cursor.fetchall()
    if (len(records) == 0):
        return "fail"
    startYear = float('inf')
    country = records[0][5]
    userInput, existingData = [], []
    for i in range(len(records)):
        userInput.append({"Year": records[i][1], "CO2Emissions": records[i][2]*1000000})
    # print(userInput)
    sql_run_Query = "SELECT Year, CO2Emissions FROM RecordedData r JOIN Countries c ON r.CountryCode=c.CountryCode WHERE CountryName = %s"
    cursor.execute(sql_run_Query, (country,))
    records = cursor.fetchall()
    cursor.close()
    for i in range(len(records)):
        existingData.append({"Year": records[i][0], "CO2Emissions": records[i][1]})
        startYear = min(startYear, records[i][0])
    # print(existingData)

    linModel = linReg(startYear, userInput, existingData)
    expModel = expReg(startYear, userInput, existingData)

    lstmModel = lstm.lstm_forecast_predictions(startYear, userInput, existingData)

    print(lstmModel)

    retval = {}
    retval['UserInput'] = userInput
    retval['Country'] = country
    retval['ExistingData'] = existingData
    retval['LinModel'] = linModel
    retval['ExpModel'] = expModel
    retval['lstmModel'] = lstmModel
    return jsonify(retval);

#GET ALL COUNTRY DATA FOR MAP.
@app.route('/getMapData', methods=['GET', 'POST'])
def getMapData():
    results = request.get_json()
    sql_view_Query = "SELECT RecordedData.CountryCode, RecordedData.CO2Emissions, Countries.CountryName, Countries.Population, (RecordedData.CO2Emissions / Countries.Population) FROM RecordedData JOIN Countries ON RecordedData.CountryCode = Countries.CountryCode WHERE RecordedData.Year = '%s'" % (results["yr"])
    cursor = connection.cursor()
    cursor.execute(sql_view_Query)
    records = cursor.fetchall()
    cursor.close()
    #print(records)
    return jsonify(records)

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
    sql_countries_query = "SELECT CountryName FROM Countries ORDER BY CountryName"
    cursor = connection.cursor()
    cursor.execute(sql_countries_query)
    records = cursor.fetchall()
    cursor.close()
    return jsonify(records)


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

    with driver.session() as session:
        session.write_transaction(create_user_node, userID)

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

if __name__ == "__main__":
    app.run()
