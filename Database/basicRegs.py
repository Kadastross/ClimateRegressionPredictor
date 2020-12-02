import pandas as pd 
import numpy as np
from scipy.optimize import curve_fit
# import matplotlib.pyplot as plt

def linReg(startYear, userInput, existingData):
    years, points = [], []
    userInput = sorted(userInput, key=lambda x: x['Year'])
    existingData = sorted(existingData, key=lambda x: x['Year'])
    for elem in existingData:
        years.append(elem["Year"])
        points.append(elem["CO2Emissions"])
    for elem in userInput:
        years.append(elem["Year"])
        points.append(elem["CO2Emissions"])
    data = pd.DataFrame(np.array([years, points]).T, columns=['Year', 'CO2Emissions'])
    x = data['Year']
    y = data['CO2Emissions'] 
    lin_model = np.polyfit(x, y, 1)
    coef, intcp = lin_model

    pred_lin_vals = []
    for year in range(startYear, 2050):
        val = intcp + coef*year
        if val >= 0:
            pred_lin_vals.append({"Year": year, "CO2Emissions": val})
    return pred_lin_vals

def expReg(startYear, userInput, existingData):
    def func(x, a, b, c):
        return a * np.exp(b * x) + c

    years, points = [], []
    userInput = sorted(userInput, key=lambda x: x['Year'])
    existingData = sorted(existingData, key=lambda x: x['Year'])
    for elem in existingData:
        years.append(elem["Year"])
        points.append(elem["CO2Emissions"])
    for elem in userInput:
        years.append(elem["Year"])
        points.append(elem["CO2Emissions"])
    data = pd.DataFrame(np.array([years, points]).T, columns=['Year', 'CO2Emissions'])
    x = data['Year']
    y = data['CO2Emissions']

    popt, pcov = curve_fit(func, x, y, p0=(1,1e-6,1), maxfev=2000)
    pred_exp_vals = []
    for year in range(startYear, 2050):
        val = func(year, *popt)
        if val >= 0:
            pred_exp_vals.append({"Year": year, "CO2Emissions": val})
    return pred_exp_vals
