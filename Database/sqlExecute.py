import mysql.connector, atexit, csv
from mysql.connector import Error
from flask import Flask, render_template, request, redirect, flash, url_for
import random
from flask_cors import CORS
from flask import jsonify


# dbIP = "localhost"
dbIP = "sql9.freemysqlhosting.net"
# dbUser = "root"
dbUser = "sql9379184"
# dbPassword = "password"
dbPassword = "VpNfwUsaws"

connection = mysql.connector.connect(host = dbIP,
                                    user = dbUser,
                                    password = dbPassword,
                                    database = "sql9379184",
                                    auth_plugin = 'mysql_native_password')

def exit_handler():
    connection.close()

atexit.register(exit_handler)
app = Flask(__name__)
CORS(app)

#global variables
userID = ""

@app.route('/')
@app.route('/createSimulation', methods=['GET', 'POST'])
def createSimulation():
    print("insert completed")
    results = request.get_json()
    sql_insert_Query = "INSERT INTO Simulation (SimulationName, Year, CO2Emissions, UserID, Country) VALUES (%s, %s, %s, %s, %s)" 
    cursor = connection.cursor()
    if (results["username"] == ""):
        results["username"] = "mohamed"
    cursor.execute(sql_insert_Query, (results["simID"], results["year"], results["co2"], results["username"], results["country"]))
    connection.commit()
    cursor.close()
    return "simulation success"

@app.route('/updateSimulation', methods=['GET', 'POST'])
def updateSimulation():
    print("update completed")
    results = request.get_json()
    # sql_update_Query = "UPDATE Simulation SET Year = %s, CO2Emissions = %s , Country = %s WHERE SimulationName = %s;"
    sql_update_Query = "UPDATE Simulation natural join User SET Simulation.Year = %s, Simulation.CO2Emissions = %s , Simulation.Country = %s WHERE Simulation.SimulationName = %s AND User.UserID = %s"
    cursor = connection.cursor()
    cursor.execute(sql_update_Query, (results["year"], results["co2"], results["country"], results["simID"], results["username"]))
    connection.commit()
    cursor.close()
    return "simulation success"

@app.route('/deleteSimulation', methods=['GET', 'POST'])
def deleteSimulation():
    print("delete completed")
    results = request.get_json()
    sql_delete_Query = "DELETE FROM Simulation WHERE SimulationName = {};".format(results["simID"])
    cursor = connection.cursor()
    cursor.execute(sql_delete_Query)
    connection.commit()
    cursor.close()
    return "simulation success"

@app.route('/viewSimulation', methods=['GET', 'POST'])
def viewSimulation():
    print("view completed")
    results = request.get_json()
    sql_view_Query = "SELECT * FROM Simulation WHERE SimulationName = {};".format(results["simID"])
    cursor = connection.cursor()
    cursor.execute(sql_view_Query)
    records = cursor.fetchall()
    if (len(records) == 0):
        return "fail"
    simID = records[0][0]
    year = records[0][1]
    co2 = records[0][2]
    return_string = "{} {} {}".format(simID, year, co2)
    cursor.close()
    return return_string

@app.route('/signUp', methods=['GET', 'POST'])
def createUser():
    print("create User Complete")
    results = request.get_json()
    print(results)
    sql_insert_Query = "INSERT INTO User (UserID, Password) VALUES (%s, %s)"
    cursor = connection.cursor()
    cursor.execute(sql_insert_Query, (results["userID"], results["password"]))
    connection.commit()
    userID = results["userID"]
    cursor.close()
    return userID

@app.route('/logIn', methods=['GET', 'POST'])
def logIn():
    results = request.get_json()
    userID = results["username"]
    return userID

@app.route('/getUserID', methods=['GET'])
def getUserID():
    print("USER: ", userID)
    return userID

@app.route('/getCountries', methods=['GET'])
def getCountries(): 
    countries = set()

    with open('annual-co2-emissions-per-country.csv') as co2_data:
        csv_reader = csv.reader(co2_data, delimiter=',')
        next(csv_reader)
        for row in csv_reader:
            countries.add(row[0])
    listCountry = list(countries)
    return jsonify(listCountry)

if __name__ == "__main__":
    app.run()
