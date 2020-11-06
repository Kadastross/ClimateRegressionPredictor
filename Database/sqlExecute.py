import mysql.connector 
from mysql.connector import Error
from flask import Flask, render_template, request, redirect, flash, url_for
import random
from flask_cors import CORS


dbIP = "localhost"
dbUser = "root"
dbPassword = "password"

connection = mysql.connector.connect(host = dbIP,
                                    user = dbUser,
                                    password = dbPassword,
                                    database = "ClimatePredictorDatabase",
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
    sql_insert_Query = "INSERT INTO Simulations (SimulationID, Year, CO2Emissions) VALUES ({}, {}, {})".format(results["simID"], results["year"], results["co2"])
    # sql_insert_Query = "SELECT * FROM Simulations WHERE Year = 2021"
    cursor = connection.cursor()
    cursor.execute(sql_insert_Query)
    connection.commit()
    return "simulation success"

@app.route('/updateSimulation', methods=['GET', 'POST'])
def updateSimulation():
    print("update completed")
    results = request.get_json()
    sql_update_Query = "UPDATE Simulations SET Year = {}, CO2Emissions = {} WHERE SimulationID = {};".format(results["year"], results["co2"], results["simID"])
    cursor = connection.cursor()
    cursor.execute(sql_update_Query)
    connection.commit()
    return "simulation success"

@app.route('/deleteSimulation', methods=['GET', 'POST'])
def deleteSimulation():
    print("delete completed")
    results = request.get_json()
    sql_delete_Query = "DELETE FROM Simulations WHERE SimulationID = {};".format(results["simID"])
    cursor = connection.cursor()
    cursor.execute(sql_delete_Query)
    connection.commit()
    return "simulation success"

@app.route('/viewSimulation', methods=['GET', 'POST'])
def viewSimulation():
    print("view completed")
    results = request.get_json()
    sql_view_Query = "SELECT * FROM Simulations WHERE SimulationID = {};".format(results["simID"])
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


if __name__ == "__main__":
    app.run()

