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
    randomi = random.randint(8, 100)
    sql_insert_Query = "INSERT INTO Simulations (SimulationID, Year, CO2Emissions) VALUES ({}, 2022, 24)".format(randomi)
    # sql_insert_Query = "SELECT * FROM Simulations WHERE Year = 2021"
    cursor = connection.cursor()
    cursor.execute(sql_insert_Query)
    connection.commit()
    

    # records = cursor.fetchall()
    # print("Total number of rows in Laptop is: ", cursor.rowcount)
    # print("\nPrinting each laptop record")
    # for row in records:
    #     print("Id = ", row[0], )
    #     print("year = ", row[1])
    #     print("co2  = ", row[2])
    return "simulation success"


if __name__ == "__main__":
    app.run()

