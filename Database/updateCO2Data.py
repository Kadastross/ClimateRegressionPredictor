import csv
import pymongo

myclient = pymongo.MongoClient("mongodb+srv://cs411group40:cs411group40@cluster0.gydem.mongodb.net/<dbname>?retryWrites=true&w=majority")
EmissionsData = myclient['EmissionsData']
CO2Emissions = EmissionsData['CO2Emissions']


print(countryCodeMap)
