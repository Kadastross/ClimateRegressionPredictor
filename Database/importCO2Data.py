'''

!!!!!!! PLEASE READ !!!!!!!

This file is only run one time in order to initialize the MongoDB database with the CO2 Emissions Data

'''

import csv
import pymongo

countryCodeMap = {}

with open('annual-co2-emissions-per-country.csv') as co2_data:
    csv_reader = csv.reader(co2_data, delimiter=',')
    next(csv_reader)
    for row in csv_reader:
        countryCodeMap[row[0]] = row[1]

myclient = pymongo.MongoClient("mongodb+srv://cs411group40:cs411group40@cluster0.gydem.mongodb.net/<dbname>?retryWrites=true&w=majority")
EmissionsData = myclient['EmissionsData']
CO2Emissions = EmissionsData['CO2EmissionsCode']

with open('co2_emissions.csv') as co2_data:
    csv_reader = csv.reader(co2_data, delimiter=',')
    next(csv_reader) # skip first line
    for row in csv_reader:
        if len(row[0].strip()) is 0 or len(row[1].strip()) is 0 or len(row[2].strip()) is 0 or len(row[8].strip()) is 0:
            continue
        print("Country:", row[0])
        print("Year:", int(row[1]))
        print("AnnualCO2Emissions:", float(row[2]) * 1000000) # million tons
        print("AnnualCO2EmissionsPerCapita:", float(row[8]) * 1000000000000) # tons
        toInsert = {"Country": row[0], "Country Code": countryCodeMap[row[0]], "Year": int(row[1]), "AnnualCO2Emissions": float(row[2]) * 1000000, "AnnualCO2EmissionsPerCapita": float(row[8]) * 1000000000000}
        x = CO2Emissions.insert_one(toInsert)

myclient.close()

'''

import mysql.connector

dbIP = "sql9.freemysqlhosting.net"
dbUser = "sql9379184"
dbPassword = "RKBNi5PlkS"
dbName = 'sql9379139'

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
        db.commit()

'''
