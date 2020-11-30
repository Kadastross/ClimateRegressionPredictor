import mysql.connector

dbIP = "sql9.freemysqlhosting.net"
dbUser = "sql9379184"
dbPassword = "VpNfwUsaws"

db = mysql.connector.connect(host = dbIP,
                                     user = dbUser,
                                     password = dbPassword,
                                     auth_plugin = 'mysql_native_password')

cursor = db.cursor()
cursor.execute("USE sql9379184;")
cursor.execute("CREATE TABLE User (UserID VARCHAR(30) PRIMARY KEY, Password VARCHAR(30) NOT NULL)")
cursor.execute("CREATE TABLE Simulation (SimulationName INT NOT NULL, Year INT NOT NULL, CO2Emissions REAL NOT NULL, UserID VARCHAR(30) NOT NULL, FOREIGN KEY(UserID) REFERENCES User(UserID) ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY(UserID, SimulationName, Year))")
cursor.close()
db.close()
