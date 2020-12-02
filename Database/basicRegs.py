import pandas as pd 
import numpy as np
from scipy.optimize import curve_fit

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
    norm_x = min(x) 
    norm_y = max(y)
    x2 = x - norm_x + 1
    y2 = y/norm_y
    popt, pcov = curve_fit(func, x2, y2, p0=(1,1e-6,1))
    pred_exp_vals = []
    for year in range(startYear, 2050):
        val = norm_y*func(year - norm_x + 1, *popt)
        if val >= 0:
            pred_exp_vals.append({"Year": year, "CO2Emissions": val})
    return pred_exp_vals


# userInput = [{'Year': 2030, 'CO2Emissions': 1500.0}]
# existingData = [{'Year': 2018, 'CO2Emissions': 10064685700.0}, {'Year': 2017, 'CO2Emissions': 9838754028.0}, {'Year': 2016, 'CO2Emissions': 9704479432.0}, {'Year': 2015, 'CO2Emissions': 9716467840.0}, {'Year': 2014, 'CO2Emissions': 9820360492.0}, {'Year': 2013, 'CO2Emissions': 9796527160.0}, {'Year': 2012, 'CO2Emissions': 9633899303.0}, {'Year': 2011, 'CO2Emissions': 9388199234.0}, {'Year': 2010, 'CO2Emissions': 8500542695.0}, {'Year': 2009, 'CO2Emissions': 7758811768.0}, {'Year': 2008, 'CO2Emissions': 7375189907.0}, {'Year': 2007, 'CO2Emissions': 6861750652.0}, {'Year': 2006, 'CO2Emissions': 6377748016.0}, {'Year': 2005, 'CO2Emissions': 5771168440.0}, {'Year': 2004, 'CO2Emissions': 5125894416.0}, {'Year': 2003, 'CO2Emissions': 4452310296.0}, {'Year': 2002, 'CO2Emissions': 3782439297.0}, {'Year': 2001, 'CO2Emissions': 3426144062.0}, {'Year': 2000, 'CO2Emissions': 3349294776.0}, {'Year': 1999, 'CO2Emissions': 3258134887.0}, {'Year': 1998, 'CO2Emissions': 3265902621.0}, {'Year': 1997, 'CO2Emissions': 3414549286.0}, {'Year': 1996, 'CO2Emissions': 3408346591.0}, {'Year': 1995, 'CO2Emissions': 3265056964.0}, {'Year': 1994, 'CO2Emissions': 3010242208.0}, {'Year': 1993, 'CO2Emissions': 2835795473.0}, {'Year': 1992, 'CO2Emissions': 2657112406.0}, {'Year': 1991, 'CO2Emissions': 2538923968.0}, {'Year': 1990, 'CO2Emissions': 2420302108.0}, {'Year': 1989, 'CO2Emissions': 2386885125.0}, {'Year': 1988, 'CO2Emissions': 2347763494.0}, {'Year': 1987, 'CO2Emissions': 2191053006.0}, {'Year': 1986, 'CO2Emissions': 2052242127.9999998}, {'Year': 1985, 'CO2Emissions': 1951773228.0}, {'Year': 1984, 'CO2Emissions': 1802317096.0}, {'Year': 1983, 'CO2Emissions': 1655810483.0}, {'Year': 1982, 'CO2Emissions': 1570468325.0}, {'Year': 1981, 'CO2Emissions': 1442782385.0}, {'Year': 1980, 'CO2Emissions': 1458886738.0}, {'Year': 1979, 'CO2Emissions': 1487113010.0}, {'Year': 1978, 'CO2Emissions': 1455257506.0}, {'Year': 1977, 'CO2Emissions': 1304402788.0}, {'Year': 1976, 'CO2Emissions': 1190964598.0}, {'Year': 1975, 'CO2Emissions': 1142101906.0}, {'Year': 1974, 'CO2Emissions': 985085216.0}, {'Year': 1973, 'CO2Emissions': 965646559.1}, {'Year': 1972, 'CO2Emissions': 928893995.4}, {'Year': 1971, 'CO2Emissions': 874016310.8000001}, {'Year': 1970, 'CO2Emissions': 770167190.3000001}, {'Year': 1969, 'CO2Emissions': 575944671.2}, {'Year': 1968, 'CO2Emissions': 467805643.0}, {'Year': 1967, 'CO2Emissions': 432223556.9}, {'Year': 1966, 'CO2Emissions': 521458880.7}, {'Year': 1965, 'CO2Emissions': 474680624.79999995}, {'Year': 1964, 'CO2Emissions': 435703766.9}, {'Year': 1963, 'CO2Emissions': 435517638.6}, {'Year': 1962, 'CO2Emissions': 439342105.3}, {'Year': 1961, 'CO2Emissions': 550958537.3}, {'Year': 1960, 'CO2Emissions': 778979465.8}, {'Year': 1959, 'CO2Emissions': 720152146.7}, {'Year': 1958, 'CO2Emissions': 525380959.99999994}, {'Year': 1957, 'CO2Emissions': 256348096.0}, {'Year': 1956, 'CO2Emissions': 216348208.0}, {'Year': 1955, 'CO2Emissions': 190890736.0}, {'Year': 1954, 'CO2Emissions': 161256304.0}, {'Year': 1953, 'CO2Emissions': 134102399.99999999}, {'Year': 1952, 'CO2Emissions': 128221679.99999999}, {'Year': 1951, 'CO2Emissions': 101723632.0}, {'Year': 1950, 'CO2Emissions': 78647760.0}, {'Year': 1949, 'CO2Emissions': 59309168.0}, {'Year': 1948, 'CO2Emissions': 23852640.0}, {'Year': 1947, 'CO2Emissions': 33587888.0}, {'Year': 1946, 'CO2Emissions': 31275904.0}, {'Year': 1945, 'CO2Emissions': 50350688.0}, {'Year': 1944, 'CO2Emissions': 97865440.0}, {'Year': 1943, 'CO2Emissions': 97304848.0}, {'Year': 1942, 'CO2Emissions': 113869792.0}, {'Year': 1941, 'CO2Emissions': 107615344.0}, {'Year': 1940, 'CO2Emissions': 86100336.0}, {'Year': 1939, 'CO2Emissions': 67157456.0}, {'Year': 1938, 'CO2Emissions': 55304416.0}, {'Year': 1937, 'CO2Emissions': 60576912.0}, {'Year': 1936, 'CO2Emissions': 65039664.0}, {'Year': 1935, 'CO2Emissions': 57627392.0}, {'Year': 1934, 'CO2Emissions': 49273472.0}, {'Year': 1933, 'CO2Emissions': 42216608.0}, {'Year': 1932, 'CO2Emissions': 38600240.0}, {'Year': 1931, 'CO2Emissions': 40260032.0}, {'Year': 1930, 'CO2Emissions': 37922400.0}, {'Year': 1929, 'CO2Emissions': 35819264.0}, {'Year': 1928, 'CO2Emissions': 34115504.0}, {'Year': 1927, 'CO2Emissions': 33525599.999999996}, {'Year': 1926, 'CO2Emissions': 29590464.0}, {'Year': 1925, 'CO2Emissions': 33221488.0}, {'Year': 1924, 'CO2Emissions': 35093792.0}, {'Year': 1923, 'CO2Emissions': 32151600.000000004}, {'Year': 1922, 'CO2Emissions': 26633616.0}, {'Year': 1921, 'CO2Emissions': 25288928.0}, {'Year': 1920, 'CO2Emissions': 26769184.0}, {'Year': 1919, 'CO2Emissions': 24255680.0}, {'Year': 1918, 'CO2Emissions': 21042352.0}, {'Year': 1917, 'CO2Emissions': 19851552.0}, {'Year': 1916, 'CO2Emissions': 17964592.0}, {'Year': 1915, 'CO2Emissions': 16088624.0}, {'Year': 1914, 'CO2Emissions': 15106672.0}, {'Year': 1913, 'CO2Emissions': 10757504.0}, {'Year': 1912, 'CO2Emissions': 9786544.0}, {'Year': 1911, 'CO2Emissions': 27846400.0}, {'Year': 1910, 'CO2Emissions': 18748688.0}, {'Year': 1909, 'CO2Emissions': 20837168.0}, {'Year': 1908, 'CO2Emissions': 22731456.0}, {'Year': 1907, 'CO2Emissions': 16839744.0}, {'Year': 1906, 'CO2Emissions': 17110880.0}, {'Year': 1905, 'CO2Emissions': 2297328.0}, {'Year': 1904, 'CO2Emissions': 2088480.0}, {'Year': 1903, 'CO2Emissions': 1963904.0}, {'Year': 1902, 'CO2Emissions': 95264.0}, {'Year': 1899, 'CO2Emissions': 95264.0}]
# startYear = 1899
# res = expReg(startYear, userInput, existingData)
# print(res)