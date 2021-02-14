import numpy as np
import math

SIGNAL_CONSTANT = 1
CONGESTION_CONSTANT = -1
BUS_STOP_CONSTANT = 2
ADHOC_CONSTANT = -2


def calculate_bus_stop_score():
    """Calculates score of a Bus Stop instance

    Returns
    -------
    int
            The calculated score
    """
    return BUS_STOP_CONSTANT


def calculate_adhoc_score():
    """Calculates score of an Adhoc instance

    Returns
    -------
    int
            The calculated score
    """
    return ADHOC_CONSTANT


def calculate_decay_component(start_time, end_time, last_end_time=None):
    """Calculates decay-component.
    decay-component = e^(-k/t)
        where k = amount of time bus stopped in the instance
        and t = difference between last time the bus stopped and the current stop time

    Parameters
    ----------
    start_time: int
            An integer denoting the start time of a stay point in seconds. 
    
    end_time: int
            An integer denoting the end time of a stay point in seconds.

    last_end_time: int, opitonal, default=None

    Returns
    -------
    double
            The calculated decay-component
    """
    if not last_end_time:
        return 1  # since the component is multiplied with the constant.
    k = end_time - start_time
    t = start_time - last_end_time
    return np.exp(-k/t)  # math.e**(-k/t)


def calculate_signal_score(start_time, end_time, last_end_time=None):
    """Calculates score of a Signal instance

    Parameters
    ----------
    start_time: int
            An integer denoting the start time of a stay point in seconds. 
    
    end_time: int
            An integer denoting the end time of a stay point in seconds.

    last_end_time: int, opitonal, default=None

    Returns
    -------
    double
            The calculated score
    """
    return SIGNAL_CONSTANT * calculate_decay_component(start_time, end_time, last_end_time)


def calculate_congestion_score(start_time, end_time, last_end_time=None):
    """Calculates score of a Congestion instance

    Parameters
    ----------
    start_time: int
            An integer denoting the start time of a stay point in seconds. 
    
    end_time: int
            An integer denoting the end time of a stay point in seconds.

    last_end_time: int, opitonal, default=None

    Returns
    -------
    double
            The calculated score
    """
    return CONGESTION_CONSTANT * calculate_decay_component(start_time, end_time, last_end_time)


def calculate_score(df):
    """Calculates scores of instances in passed parameter.

    Parameters
    ----------
    df: pandas.DataFrame
            A DataFrame object with
            columns=['instance_start_time', 'instance_end_time',
                    'Prediction Is_Adhoc', 'Prediction Is_Bus_stop',
                    'Prediction Is_Signal', 'Prediction Is_Congestion',
                    'Prediction Is_Turn']
    
    Returns
    -------
    overall_score: double
            A double denoting the value of 
            sum(list_scores)/np.linalg.norm(list_scores)
            where, list_scores is list of row wise scores of the DataFrame.
    
    list_scores: list of int or double
            A list of row wise scores of the DataFrame.
            
    int
        An int denoting the length of list_scores
    """
    last_end_time = None
    list_scores = []

    for index, row in df.iterrows():
        start_time = row.instance_start_time
        end_time = row.instance_end_time

        '''
        	Priority: Bus-Stop > Signal > Congestion > Turn. 
        	Adhoc is completely mutually exclusive.
        '''
        if row["Prediction Is_Adhoc"] == "Adhoc":
            # Calculate score for adhoc
            list_scores.append(calculate_adhoc_score())
        else:
	        if row["Prediction Is_Bus_stop"] == "Bus_stop":
	            # Calculate score for Bus_stop
	            list_scores.append(calculate_bus_stop_score())
	        elif row["Prediction Is_Signal"] == "Signal":
	            # Calculate score for Signal
	            list_scores.append(calculate_signal_score(start_time,
	                                            end_time, last_end_time))
	        elif row["Prediction Is_Congestion"] == "Congestion":
	            # Calculate score for Congestion
	            list_scores.append(calculate_congestion_score(start_time,
	                                                end_time, last_end_time))
	        else:
	        	# Ignoring Turn as it doesn't affect score.
	        	pass 	        
        last_end_time = end_time
    
    overall_score = sum(list_scores)/np.linalg.norm(list_scores)
    
    return overall_score, list_scores, len(list_scores)


'''
USAGE:
 Suppose I have an instance which is adhoc. Then the call will be like: 

 	score += calculate_adhoc_score()
 
 Similary for signal and congestion, we will keep track of the start_time and end_time and the last_end_time if available
 and pass the params as required.
'''
