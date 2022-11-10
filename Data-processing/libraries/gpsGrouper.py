import pandas as pd
import numpy as np
from geopy.distance import geodesic
import pickle
from .utils import *

# Params should be tuples of format: (lattitude, longitude)
def distance(pointA, pointB):
    return geodesic(pointA, pointB).meters


# Params should be tuple of format: (lattitude, longitude)
def find_leader_point(group):
    lat_sum = 0
    long_sum = 0
    length = len(group)
    for item in group:
        lat_sum += item[1]
        long_sum += item[2]
    mean_lat = lat_sum/length
    mean_long = long_sum/length
    return [mean_lat, mean_long]

# Form group from GPS trail. Algorithm:

# > initialise group_list
# > initialise single_group
# > for i in range(len(array of coords)):
# >>  if i == 0:
# >>>    single_group.append(array[i]) -> for edge case
# >>  else:
# >>>    pointA = array of coords[i-1]
# >>>    pointB = array of coords[i]
# >>>    if distance(pointA, pointB) < radius_threshold:
# >>>>     single_group.append(pointB)
# >>>    else:
# >>>>     group_list.append(single_group)
# >>>>     clear single_group
# >>>>     single_group.append(pointB) -> initialising for next group. 
# >>>>     NB: Since pointB is not a member of current group, it will be a member of new group.

def form_group(array, radius):
    lattitude_index = 1
    longitude_index = 2
    group_list = []
    group = []
    for i in range(len(array)):
        if i == 0:
            group.append(array[i])
        else:
            pointA = (array[i][lattitude_index], array[i][longitude_index])
            pointB = (array[i-1][lattitude_index], array[i-1][longitude_index])
            if distance(pointA, pointB) < radius:
                group.append(array[i])
            else:
                group_list.append(group)
                group = []
                group.append(array[i])
    return group_list


# Procoess GPS trail files to filter low speed and form groups 
def process_gps(gps_trail_filepath, velocity_threshold, radius_threshold):
    gps_df = read_gps_file(gps_trail_filepath)
    gps_df=gps_df.groupby('time')['#lat','long','speed','altitude'].mean().reset_index()
    gps_df = gps_df[gps_df.apply(lambda x: x['speed'] <= velocity_threshold, axis=1)]
    group_list = form_group(gps_df.values, radius_threshold)
    groups_dict = {}
    for i in range(len(group_list)):
        group = group_list[i]
        groups_dict.__setitem__(i, {})
        groups_dict[i].__setitem__('points', group)
        groups_dict[i].__setitem__('stay_duration', len(group))
    gps_df = pd.DataFrame.from_dict(groups_dict, orient='index')
    gps_df['timestamp_start'] = gps_df['points'].apply(lambda x: x[0][0])
    gps_df['timestamp_end'] = gps_df['points'].apply(lambda x: x[len(x)-1][0])
    gps_df['leader_point'] = gps_df['points'].apply(lambda x: find_leader_point(x))
    gps_df['time_start_range'] = gps_df['timestamp_start'].apply(lambda x: time_as_int(x.split(' ')[1]))
    gps_df['time_end_range'] = gps_df['timestamp_end'].apply(lambda x: time_as_int(x.split(' ')[1]))
    print('Total number of groups formed: {}'.format(len(groups_dict)))
    # write_file(folder_address.split('/')[-1]+'-low_speed.csv', low_speed_df, 'csv')
    return gps_df


# select only the required columns for further processing
def format_gps_df(gps_df):
    gps_df['lat'] = gps_df['leader_point'].apply(lambda x: x[0])
    gps_df['long'] = gps_df['leader_point'].apply(lambda x: x[1])
    gps_df['start_date'] = gps_df['timestamp_start'].apply(lambda x: x.split(' ')[0])
    gps_df['start_time'] = gps_df['timestamp_start'].apply(lambda x: x.split(' ')[1])
    gps_df['end_date'] = gps_df['timestamp_end'].apply(lambda x: x.split(' ')[0])
    gps_df['end_time'] = gps_df['timestamp_end'].apply(lambda x: x.split(' ')[1])
    gps_df = gps_df[['lat', 'long', 'stay_duration', 'start_date', 'start_time', 'end_date', 'end_time']]
    return gps_df