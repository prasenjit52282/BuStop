import numpy as np
import pandas as pd
from geopy.distance import geodesic

def get_Sec_from_datetime(dt):
    timeStamp=pd.to_datetime(dt,format="%m/%d/%Y %H:%M:%S")
    return timeStamp.timestamp()

def geodistance(pointA, pointB):
    return geodesic(pointA, pointB).meters

def reCalculateSpeed(df_in):
    df=df_in.drop_duplicates('time').copy()
    latlongstime=df[['#lat','long','time']].values
    start_lat,start_long,start_time=latlongstime[0,:]
    speed=[];max_speed=45
    for lat,long,time in latlongstime:
        dis=geodistance((start_lat,start_long),(lat,long)) #distance
        dt=get_Sec_from_datetime(time)-get_Sec_from_datetime(start_time)
        speed_recal=dis/(dt+1e-7)
        speed.append(np.clip(speed_recal,0,max_speed))

        start_lat,start_long,start_time=lat,long,time

    df['speed']=speed
    return df