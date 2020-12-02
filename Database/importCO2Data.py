'''

!!!!!!! PLEASE READ !!!!!!!

This file is only run one time in order to initialize the MySQL database with the CO2 Emissions Data

'''
import csv, mysql.connector

dbIP = "sql9.freemysqlhosting.net"
dbUser = "sql9379669"
dbPassword = "LGGlMtRGdY"
dbName = 'sql9379669'

db = mysql.connector.connect(host = dbIP,
                                     user = dbUser,
                                     password = dbPassword,
                                     database = dbName,
                                     auth_plugin = 'mysql_native_password')

cursor = db.cursor()
countryCode = {}
with open('Countries_Data.csv') as co2_data:
    csv_reader = csv.reader(co2_data, delimiter=',')
    for row in csv_reader:
        if len(row[0].strip()) is 0 or len(row[1].strip()) is 0 or len(row[2].strip()) is 0 or len(row[8].strip()) is 0:
            continue
        print("Country:", row[0])
        print("CountryCode:", row[16])
        print("Year", int(row[1]))
        print("AnnualCO2Emissions", float(row[2]) * 1000000)
        print("Population:", int(float(row[17])))
        if not row[16] in countryCode:
            cursor.execute("INSERT INTO Countries(CountryCode, CountryName, Population) VALUES (%s, %s, %s)", (row[16], row[0], int(float(row[17]))))
            countryCode[row[16]] = row[0]
        cursor.execute("INSERT INTO RecordedData(CountryCode, Year, CO2Emissions, Population) VALUES (%s, %s, %s, %s)", (row[16], int(row[1]), float(row[2]) * 1000000, int(float(row[17]))))
        db.commit()

db.close()
