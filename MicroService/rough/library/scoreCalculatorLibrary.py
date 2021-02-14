import numpy as np
import math

SIGNAL_CONSTANT = 1
CONGESTION_CONSTANT = -1
BUS_STOP_CONSTANT = 2
ADHOC_CONSTANT = -2


def calculate_bus_stop_score():
    return BUS_STOP_CONSTANT


def calculate_adhoc_score():
    return ADHOC_CONSTANT


def calculate_decay_component(start_time, end_time, last_end_time=None):
    ''' decay-component = e^(-k/t)
                    where k = amount of time bus stopped in the instance
                    and t = difference between last time the bus stopped and the current stop time
    '''
    if not last_end_time:
        return 1  # since the component is multiplied with the constant.
    k = end_time - start_time
    t = start_time - last_end_time
    return np.exp(-k/t)  # math.e**(-k/t)


def calculate_signal_score(start_time, end_time, last_end_time=None):
    return SIGNAL_CONSTANT * calculate_decay_component(start_time, end_time, last_end_time)


def calculate_congestion_score(start_time, end_time, last_end_time=None):
    return CONGESTION_CONSTANT * calculate_decay_component(start_time, end_time, last_end_time)

# ! add structure of [df] for reference in comments


def calculate_score(df):
    score = 0
    last_end_time = None
    for index, row in df.iterrows():
        start_time = row.instance_start_time
        end_time = row.instance_end_time
        if row["Prediction Is_Adhoc"] == "Adhoc":
            # Calculate score for adhoc
            score += calculate_adhoc_score()
        if row["Prediction Is_Bus_stop"] == "Bus_stop":
            # Calculate score for Bus_stop
            score += calculate_bus_stop_score()
        if row["Prediction Is_Congestion"] == "Congestion":
            # Calculate score for Congestion
            score += calculate_congestion_score(start_time,
                                                end_time, last_end_time)
        if row["Prediction Is_Signal"] == "Signal":
            # Calculate score for Signal
            score += calculate_signal_score(start_time,
                                            end_time, last_end_time)
        last_end_time = end_time
    return score


'''
USAGE:
 Suppose I have an instance which is adhoc. Then the call will be like: 

 	score += calculate_adhoc_score()
 
 Similary for signal and congestion, we will keep track of the start_time and end_time and the last_end_time if available
 and pass the params as required.
'''
