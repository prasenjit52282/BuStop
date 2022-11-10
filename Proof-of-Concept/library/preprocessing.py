import numpy as np
import pandas as pd
from math import cos, asin, sqrt, pi

#helper functions
def distance(lat1, lon1, lat2, lon2):
    p = pi/180
    a = 0.5 - cos((lat2-lat1)*p)/2 + cos(lat1*p) * cos(lat2*p) * (1-cos((lon2-lon1)*p))/2
    return 12742000 * asin(sqrt(a))

def cumulative_distance(lat_longs):
    l=[]
    prev_lat,prev_long=lat_longs[0]

    for lat,long in lat_longs:
        l.append(distance(lat,long,prev_lat,prev_long)+1e-7)
        prev_lat=lat
        prev_long=long
        
    return l

def time_zone_cal(s):
    hour=int(s.split(':')[0])

    if 6<hour<=9:
        time_zone='Early_Morning'
    elif 9<hour<=12:
        time_zone='Morning'
    elif 12<hour<=17:
        time_zone='Afternoon'
    elif 17<hour<=23:
        time_zone='Evening'
    return time_zone

def new_Processing_before_journal(location=None,dataframe=None):
    #reading Data
    if location is not None:
        df=pd.read_csv(location)
    else:
        df=dataframe.copy()

    #Normalizing edge values with edge distance
    df['next_hop_distance']=cumulative_distance(df[['lat','long']].values)

    df['edge_wifi_count']=df.edge_wifi_count/df.next_hop_distance
    df['d_edge_wifi_count']=df.d_edge_wifi_count/df.next_hop_distance

    df['edge_honk_duration']=df.edge_honk_duration/df.next_hop_distance
    df['d_edge_honk_duration']=df.d_edge_honk_duration/df.next_hop_distance

    #calculating timeZone
    df['time_zone']=df.start_time.apply(time_zone_cal)
    #df=pd.get_dummies(df, columns=["time_zone"], prefix=["Is"])
    #print(location)

    #Rebuilding meaning full features from sparse features
    df['highly_populated_poi_exist']=(df.school+df.medical+df.other_poi+df.park).apply(np.ceil)
    df['road_exist_percent']=df.high_way+df.two_way+df.one_way

    #Processing labels
    df['Is_Bus_stop']=df.Is_Bus_stop.map({'Bus_stop':1,'Not Bus_stop':0})
    df['Is_Turn']=df.Is_Turn.map({'Turn':1,'Not Turn':0})
    df['Is_Signal']=df.Is_Signal.map({'Signal':1,'Not Signal':0})
    df['Is_Congestion']=df.Is_Congestion.map({'Congestion':1,'Not Congestion':0})
    df['Is_Adhoc']=df.Is_Adhoc.map({'Adhoc':1,'Not Adhoc':0})

    #Selected Columns
    features=\
    [
     'stay_duration', #f1
     'mfcc0','mfcc1','mfcc2','mfcc3','mfcc4', #f2,f3,f4,f5,f6
     'wifi_count', 'edge_wifi_count', #f7,f8
     'RSI', #f9
     'human_made', 'natural_land','road_exist_percent','highly_populated_poi_exist'#f10,f11,f12,f13
     ]

    labels=['Is_Bus_stop','Is_Turn', 'Is_Signal','Is_Congestion', 'Is_Adhoc']

    #New dataFrame is returned
    return df[['time_zone','start_date','lat','long','start_time','end_time']+features+labels].copy()