# RUN: PIP INSTALL TENSORFLOW 
#imports:
from numpy import array
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import RepeatVector
from tensorflow.keras.layers import TimeDistributed

def get_raw_sequence(user_input, existing_data):
    years, points = [], []
    userInput = sorted(user_input, key=lambda x: x['Year'])
    existingData = sorted(existing_data, key=lambda x: x['Year'])

    min_yr = float('inf')

    for elem in existingData:
        years.append(elem["Year"])
        points.append(elem["CO2Emissions"])
    last_yr = years[-1]

    for elem in userInput:
        if elem["Year"] < min_yr:
            min_yr = elem["Year"]

        years.append(elem["Year"])
        points.append(elem["CO2Emissions"])

    return points, min_yr, last_yr

# split a univariate sequence into samples
def split_sequence(sequence, n_steps_in, n_steps_out):
	X, y = list(), list()

	for i in range(len(sequence)):
		# find the end of this pattern
		end_ix = i + n_steps_in
		out_end_ix = end_ix + n_steps_out

		if out_end_ix > len(sequence):
			break

		seq_x, seq_y = sequence[i:end_ix], sequence[end_ix:out_end_ix]

		X.append(seq_x)
		y.append(seq_y)

	return array(X), array(y)

def lstm_forecast_predictions(start_year, user_input, existing_data):

    raw_seq, min_yr, last_yr = get_raw_sequence(user_input, existing_data)
    num_predictions = 2050 - min_yr
    
    # choose a number of time steps
    n_steps_in, n_steps_out = 3, 3

    # split into samples
    X, y = split_sequence(raw_seq, n_steps_in, n_steps_out)

    # reshape from [samples, timesteps] into [samples, timesteps, features]
    n_features = 1
    X = X.reshape((X.shape[0], X.shape[1], n_features))
    y = y.reshape((y.shape[0], y.shape[1], n_features))

    # define model
    model = Sequential()
    model.add(LSTM(100, activation='relu', input_shape=(n_steps_in, n_features)))
    model.add(RepeatVector(n_steps_out))
    model.add(LSTM(100, activation='relu', return_sequences=True))
    model.add(TimeDistributed(Dense(1)))
    
    model.compile(optimizer='adam', loss='mse')
    # fit model
    model.fit(X, y, epochs=100, verbose=0)

    # next n predictions
    for i in range(num_predictions // 3):
        last_3 = raw_seq[-3:]
        x_input = array(last_3)
        x_input = x_input.reshape((1, n_steps_in, n_features))
        yhat = model.predict(x_input, verbose=0)
        #print(yhat)

        pred = yhat.tolist()
        for element in pred[0]:
            raw_seq.append(element[0])
        #raw_seq.append(pred) #append prediction
    output = []

    #print(start_year)
    #print(last_yr)

    j = last_yr - start_year
    for i in range(j, len(raw_seq)):
        output.append({"Year": start_year + i, "CO2Emissions": raw_seq[i]})
    
    print(output)
    return output