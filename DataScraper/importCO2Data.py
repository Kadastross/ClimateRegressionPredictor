import csv
import mysql.connector

dbIP = "localhost"
dbUser = "root"
dbPassword = "password"
dbName = 'ClimatePredictorDatabase'
charSet = "utf8mb4"

db = mysql.connector.connect(host = dbIP,
                                     user = dbUser,
                                     password = dbPassword,
                                     database = dbName,
                                     auth_plugin = 'mysql_native_password')

cursor = db.cursor()
with open('co2_emissions.csv') as co2_data:
    csv_reader = csv.reader(co2_data, delimiter=',')
    next(csv_reader) # skip first line
    for row in csv_reader:
        if len(row[0].strip()) is 0 or len(row[1].strip()) is 0 or len(row[2].strip()) is 0 or len(row[8].strip()) is 0:
            continue
        print("Country:", row[0])
        print("Year", int(row[1]))
        print("AnnualCO2Emissions", float(row[2]) * 1000000) # million tons
        print("AnnualCO2EmissionsPerCapita:", float(row[8]) * 1000000000000) # tons
        cursor.execute('INSERT INTO CO2_Emissions(Country, Year, AnnualCO2Emissions, AnnualCO2EmissionsPerCapita)' \
                       'VALUES("%s", "%s", "%s", "%s")', (row[0], int(row[1]), float(row[2]), float(row[8])))
