import pandas as pd 
import numpy as np
from scipy.optimize import curve_fit

students = {'hours': [29, 9, 10, 38, 16, 26, 50, 10, 30, 33, 43, 2, 39, 15, 44, 29, 41, 15, 24, 50],
            'test_results': [65, 7, 8, 76, 23, 56, 100, 3, 74, 48, 73, 0, 62, 37, 74, 40, 90, 42, 58, 100]
            }

student_data = pd.DataFrame(students, columns=['hours', 'test_results'])
x = student_data['hours'] # this will be year
y = student_data['test_results'] # this will be emissions
lin_model = np.polyfit(x, y, 1)
coef, intcp = lin_model

pred_lin_vals = []
for hour in students['hours']: # iterate through years 
    pred_lin_vals.append(intcp + coef*hour)

def func(x, a, b, c):
    return a * np.exp(b * x) + c

x = student_data['hours'].values # this will be year
y = student_data['test_results'].values # this will be emissions

popt, pcov = curve_fit(func,  x,  y)
pred_exp_vals = []
for val in x:
    pred_exp_vals.append(func(val, *popt))

