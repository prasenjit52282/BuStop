import numpy as np
import pandas as pd
import sklearn
from sklearn.compose import ColumnTransformer
from .helperFunctionsLib import *

def get_processed_df(df, selection_columns=\
    ['time_zone','stay_duration',
     'wifi_count', 'edge_wifi_count', 'honk_duration',
     'edge_honk_duration', 'd_wifi_count', 'd_edge_wifi_count','d_honk_duration', 
     'd_edge_honk_duration', 'human_made', 'natural_land','road_exist_percent',
     'highly_populated_poi_exist', 'RSI', 'Is_Bus_stop','Is_Turn', 'Is_Signal',
     'Is_Congestion', 'Is_Adhoc']):

    #Normalizing edge values with edge distance
    df['next_hop_distance']=cumulative_distance(df[['lat','long']].values)

    df['edge_wifi_count']=df.edge_wifi_count/df.next_hop_distance
    df['d_edge_wifi_count']=df.d_edge_wifi_count/df.next_hop_distance

    df['edge_honk_duration']=df.edge_honk_duration.apply(float)/df.next_hop_distance
    df['d_edge_honk_duration']=df.d_edge_honk_duration.apply(float)/df.next_hop_distance

    df['honk_duration']=df.honk_duration.apply(float)
    df['d_honk_duration']=df.d_honk_duration.apply(float)

    #calculating timeZone
    df['time_zone']=df.start_time.apply(time_zone_cal)

    #Rebuilding meaning full features from sparse features
    df['highly_populated_poi_exist']=(df.school+df.medical+df.other_poi+df.park).apply(lambda e:'Yes' if np.ceil(e)==1 else 'No')
    df['road_exist_percent']=df.high_way+df.two_way+df.one_way

    #New dataFrame is returned
    new_df=df[selection_columns].copy()
    
    return new_df

def transform_categorical_features(data, one_hot_encoder, label_encoders, categorical_features, for_train=False):
    
    if len(label_encoders) != len(categorical_features):
        raise ValueError("Number of Label Encoders must be equal to number of categorical features.")
    
    #converting categorical features in to integer encoding....
    for le, feature in zip(label_encoders, categorical_features):
        data[:, feature] = le.transform(data[:, feature])

    # OneHot Encoding Categorical features
    if for_train:
        data = one_hot_encoder.fit_transform(data)
    else:
        data = one_hot_encoder.transform(data)

    return data

def get_label_encoder(data):
    le = sklearn.preprocessing.LabelEncoder()
    le.fit(data)
    return le

def get_one_hot_encoder(data, categorical_features):
    encoder = ColumnTransformer([('encoder',sklearn.preprocessing.OneHotEncoder(),categorical_features)],remainder='passthrough')
    encoder.fit(data)
    return encoder

def get_labels_for(poi_column, df, le):
    labels=df[poi_column]
    labels = le.transform(labels)
    return labels


