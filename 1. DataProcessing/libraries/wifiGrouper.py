import pandas as pd
import numpy as np
from .utils import *

 # Removing duplicate MAC from WiFi groups
def remove_duplicates(list_of_dataframes):
    for i in range(len(list_of_dataframes)):
        group = list_of_dataframes[i]
#         print("For group: {}".format(i+1))
        if len(group) != 0:
            group = pd.concat(group)
#             print("Before dropping duplicates: {}".format(len(group)))
            group = group.drop_duplicates(subset='mac').values
            list_of_dataframes[i] = group
#             print("After dropping duplicates: {}".format(len(group)))
        else:
            pass
#             print("No entries. Length = 0")
    return list_of_dataframes


# Forming WiFi groups and matching them with GPS groups on time ranges

def form_wifi_group(groups, wifi_df):
    all_wifi_group = []
    all_edge_group = []
#     groups = groups_df
    grouped_by_int_time = wifi_df.groupby('int_time')
    for i in range(len(groups.values)):
        group = groups.values[i]
        all_wifis = []
        edge_group = []
        start_range = group[0] # group[4]
        end_range = group[1] # group[6]
        for key in grouped_by_int_time.groups.keys():
            if key in range(start_range, end_range+1):
                 all_wifis.append(grouped_by_int_time.get_group(key))
            if i != 0:
                edge_start_range = groups.values[i-1][1] # previous group end time
                edge_end_range = group[0] # current group start time
                if key in range(edge_start_range+1, edge_end_range): # since, previous group end time is included in previous
                    # group range, adding 1.
                    edge_group.append(grouped_by_int_time.get_group(key))
        all_edge_group.append(edge_group)
        all_wifi_group.append(all_wifis)
#         print("--- Removing duplicates from Group wifis: ---")
    all_wifi_groups = remove_duplicates(all_wifi_group)
#         print("--- Removing duplicates from Edge wifis: ---")
    all_edge_groups = remove_duplicates(all_edge_group)
    groups['all_wifis'] = all_wifi_groups
    groups['edge_wifis'] = all_edge_groups
    groups['wifi_count'] = groups['all_wifis'].apply(lambda x: len(x))
    groups['edge_wifi_count'] = groups['edge_wifis'].apply(lambda x: len(x))
    return groups
#     print("Total non-edge groups: {}\nTotal edge groups: {}".format(len(all_wifi_group), len(all_edge_group))) # will be equal, 
    # and the first edge group will always be empty


def process_wifi(wifi_file_path, groups_df):
    wifi_df = read_wifi_file(wifi_file_path) #pd.read_csv(wifi_file_path, delimiter=",", error_bad_lines=False)
    wifi_df.columns = ["mac", "name", "signal", "time"]
    
    wifi_df=wifi_df.drop_duplicates(subset="mac") # this line is for unique wifi
    
    wifi_df = wifi_df.sort_values('time')
    wifi_df['Date'] = wifi_df['time'].apply(lambda x: x.split()[0])
    wifi_df['Time'] = wifi_df['time'].apply(lambda x: x.split()[1])
    wifi_df['int_time'] = wifi_df['Time'].apply(lambda x: time_as_int(x))
    return form_wifi_group(groups_df, wifi_df)


def make_blank_wifi_df(index_count):
    df = pd.DataFrame(index=[i for i in range(index_count)], columns=['wifi_count','edge_wifi_count'])
    df = df.fillna('Not found')
    return df