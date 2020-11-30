import mysql.connector

dbIP = "sql9.freemysqlhosting.net"
dbUser = "sql9379236"
dbPassword = "Ax3afA2tkU"

db = mysql.connector.connect(host = dbIP,
                                     user = dbUser,
                                     password = dbPassword,
                                     auth_plugin = 'mysql_native_password')

cursor = db.cursor()
cursor.execute("USE sql9379236;")
cursor.execute("CREATE TABLE User (UserID VARCHAR(30) PRIMARY KEY, Password VARCHAR(30) NOT NULL)")
cursor.execute("CREATE TABLE Simulation (SimulationID INT NOT NULL AUTO_INCREMENT, SimulationName VARCHAR(30) NOT NULL, UserID VARCHAR(30) NOT NULL, KEY `id` (SimulationID), FOREIGN KEY (UserID) REFERENCES User(UserID) ON UPDATE CASCADE ON DELETE CASCADE, PRIMARY KEY(UserID, SimulationName))")
cursor.execute("CREATE TABLE Datapoints (SimulationID INT NOT NULL, Year INT NOT NULL, Country VARCHAR(50) NOT NULL, CO2Emissions REAL NOT NULL, FOREIGN KEY (SimulationID) REFERENCES Simulation(SimulationID) ON UPDATE CASCADE ON DELETE CASCADE, PRIMARY KEY (SimulationID, Year, Country))")
cursor.close()
db.close()
