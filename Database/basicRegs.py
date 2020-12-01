import pandas as pd 
import numpy as np
from scipy.optimize import curve_fit


def linReg(startYear, userInput, existingData):
    # endYear = max(userInput[0])
    years, points = [], []
    for elem in existingData:
        years.append(elem["Year"])
        points.append(elem["CO2Emissions"])
    for elem in userInput:
        years.append(elem["Year"])
        points.append(elem["CO2Emissions"])
    data = pd.DataFrame(np.array([years, points]), columns=['Year', 'CO2Emissions'])
    x = data['Year']
    y = data['CO2Emissions'] 
    lin_model = np.polyfit(x, y, 1)
    coef, intcp = lin_model

    pred_lin_vals = []
    for year in range(startYear, 2050):
        pred_lin_vals.append({"Year": year, "CO2_pred": intcp + coef*year})
    return pred_lin_vals

def expReg(startYear, userInput, existingData):
    def func(x, a, b, c):
        return a * np.exp(b * x) + c
    # endYear = max(userInput[0])
    years, points = [], []
    for elem in existingData:
        years.append(elem["Year"])
        points.append(elem["CO2Emissions"])
    for elem in userInput:
        years.append(elem["Year"])
        points.append(elem["CO2Emissions"])
    data = pd.DataFrame(np.array([years, points]), columns=['Year', 'CO2Emissions'])
    x = data['Year']
    y = data['CO2Emissions']
    popt, pcov = curve_fit(func,  x,  y)

    pred_exp_vals = []
    for year in range(startYear, 2050):
        pred_exp_vals.append({"Year": year, "CO2_pred": func(year, *popt)})
    return pred_exp_vals

