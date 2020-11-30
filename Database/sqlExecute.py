import mysql.connector
from mysql.connector import Error
from flask import Flask, render_template, request, redirect, flash, url_for
import random
from flask_cors import CORS


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

app = Flask(__name__)
CORS(app)

@app.route('/')
@app.route('/createSimulation', methods=['GET', 'POST'])
def createSimulation():
    print("insert completed")
    results = request.get_json()
    # print(results["simID"])
    # randomi = random.randint(8, 300)
    sql_insert_Query = "INSERT INTO Simulation (SimulationName, Year, CO2Emissions, UserID) VALUES (%s, %s, %s, %s)"
    # sql_insert_Query = "SELECT * FROM Simulation WHERE Year = 2021"
    cursor = connection.cursor()
    cursor.execute(sql_insert_Query, (results["simID"], results["year"], results["co2"], "mohamed"))
    connection.commit()
    return "simulation success"

@app.route('/updateSimulation', methods=['GET', 'POST'])
def updateSimulation():
    print("update completed")
    results = request.get_json()
    sql_update_Query = "UPDATE Simulation SET Year = {}, CO2Emissions = {} WHERE SimulationName = {};".format(results["year"], results["co2"], results["simID"])
    cursor = connection.cursor()
    cursor.execute(sql_update_Query)
    connection.commit()
    return "simulation success"

@app.route('/deleteSimulation', methods=['GET', 'POST'])
def deleteSimulation():
    print("delete completed")
    results = request.get_json()
    sql_delete_Query = "DELETE FROM Simulation WHERE SimulationName = {};".format(results["simID"])
    cursor = connection.cursor()
    cursor.execute(sql_delete_Query)
    connection.commit()
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
    return return_string

@app.route('/signUp', methods=['GET', 'POST'])
def createUser():
    print("create User Complete")
    results = request.get_json()
    print(results)
    #'INSERT INTO CO2_Emissions(Country, Year, AnnualCO2Emissions, AnnualCO2EmissionsPerCapita)' \
    #               'VALUES("%s", "%s", "%s", "%s")', (row[0], int(row[1]), float(row[2]), float(row[8]))
    sql_insert_Query = "INSERT INTO User (UserID, Password) VALUES (%s, %s)"
    cursor = connection.cursor()
    cursor.execute(sql_insert_Query, (results["userID"], results["password"]))
    connection.commit()
    return "create user success"

if __name__ == "__main__":
    app.run()
