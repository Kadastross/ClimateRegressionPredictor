import mysql.connector

dbIP = "sql9.freemysqlhosting.net"
dbUser = "sql9379669"
dbPassword = "LGGlMtRGdY"

db = mysql.connector.connect(host = dbIP,
                                     user = dbUser,
                                     password = dbPassword,
                                     auth_plugin = 'mysql_native_password')

cursor = db.cursor()
cursor.execute("USE sql9379669;")
cursor.execute("CREATE TABLE User (UserID VARCHAR(30) PRIMARY KEY, Password VARCHAR(30) NOT NULL)")
cursor.execute("CREATE TABLE Countries (CountryCode VARCHAR(5) PRIMARY KEY, CountryName VARCHAR(30) UNIQUE, Population INT NOT NULL)")
cursor.execute("CREATE TABLE Simulation (SimulationID INT NOT NULL AUTO_INCREMENT, SimulationName VARCHAR(30) NOT NULL, UserID VARCHAR(30) NOT NULL, Country VARCHAR(50) NOT NULL, KEY `id` (SimulationID), FOREIGN KEY (UserID) REFERENCES User(UserID) ON UPDATE CASCADE ON DELETE CASCADE, FOREIGN KEY (Country) REFERENCES Countries(CountryName), PRIMARY KEY(UserID, SimulationName))")
cursor.execute("CREATE TABLE Datapoints (SimulationID INT NOT NULL, Year INT NOT NULL, CO2Emissions REAL NOT NULL, FOREIGN KEY (SimulationID) REFERENCES Simulation(SimulationID) ON UPDATE CASCADE ON DELETE CASCADE, PRIMARY KEY (SimulationID, Year))")
cursor.execute("CREATE TABLE RecordedData (CountryCode VARCHAR(5) NOT NULL, Year INT NOT NULL, CO2Emissions REAL NOT NULL, Population INT NOT NULL, FOREIGN KEY (CountryCode) REFERENCES Countries(CountryCode))")
cursor.close()
db.close()
