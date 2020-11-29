import mysql.connector

dbIP = "sql9.freemysqlhosting.net"
dbUser = "sql9379139"
dbPassword = "RKBNi5PlkS"

db = mysql.connector.connect(host = dbIP,
                                     user = dbUser,
                                     password = dbPassword,
                                     auth_plugin = 'mysql_native_password')

cursor = db.cursor()
cursor.execute("USE sql9379139;")
cursor.execute("CREATE TABLE Simulations (SimulationID INT PRIMARY KEY, Year INT, CO2Emissions REAL)")
cursor.execute("CREATE TABLE User (UserID VARCHAR(30) PRIMARY KEY, Password VARCHAR(30))")
