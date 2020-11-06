import mysql.connector

dbIP = "localhost"
dbUser = "root"
dbPassword = "password"

db = mysql.connector.connect(host = dbIP,
                                     user = dbUser,
                                     password = dbPassword,
                                     auth_plugin = 'mysql_native_password')

cursor = db.cursor()
cursor.execute("CREATE DATABASE ClimatePredictorDatabase") #only run this line the first time
cursor.execute("USE ClimatePredictorDatabase;")
cursor.execute("CREATE TABLE CO2_Emissions (Country VARCHAR(50), Year INT, AnnualCO2Emissions REAL, AnnualCO2EmissionsPerCapita REAL)") # only run this the first time
cursor.execute("CREATE TABLE Simulations (SimulationID INT PRIMARY KEY, Year INT, CO2Emissions REAL)")
