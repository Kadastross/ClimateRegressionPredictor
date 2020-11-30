import csv
import pymongo

myclient = pymongo.MongoClient("mongodb+srv://cs411group40:cs411group40@cluster0.gydem.mongodb.net/<dbname>?retryWrites=true&w=majority")
EmissionsData = myclient['EmissionsData']
CO2Emissions = EmissionsData['CO2Emissions']

continents = ['Africa', 'Europe', 'Asia', 'Oceania', 'North America', 'South America']
otherEntities = ['Asia (excl. China & India)', 'EU-27', 'EU-28', 'Antarctic Fisheries', 'French Equatorial Africa', 'International transport', 'KP Annex B', 'Kuwaiti Oil Fires', 'Non KP Annex B', 'Non-OECD', 'North America (excl. USA)', 'OECD', 'Statistical Difference', 'World', 'Europe (excl. EU-27)']
defunctCountries = ['Yugoslavia', 'USSR', 'United Korea']
print(countryCodeMap)
