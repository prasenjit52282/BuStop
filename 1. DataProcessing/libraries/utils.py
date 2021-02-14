import time
import pandas as pd
from scipy.io import wavfile as wav
import os
from shutil import copy2

# converts hour:minute:seconds to seconds
def time_as_int(timestr):
    hh, mm, ss = timestr.split(":")
    time_int = (int(hh)*3600)+(int(mm)*60)+int(ss)
    return time_int

# Converts int_time tp hour:minute:seconds format
def convert_int_to_hms(seconds):
    return time.strftime("%H:%M:%S", time.gmtime(seconds))


def read_wifi_file(filepath):
    wifi_dict = {}
    wifi_dict['mac'] = []
    wifi_dict['name'] = []
    wifi_dict['signal'] = []
    wifi_dict["time"] = []
    with open(filepath, 'r', encoding="utf8") as wifi_file:
        for line in wifi_file:
            content = line.split(',')
            wifi_dict['mac'].append(content[0])
            if len(content) == 5:
                wifi_dict['name'].append(content[1]+' '+ content[2])
            else:
                wifi_dict['name'].append(content[1])
            wifi_dict['signal'].append(content[-2])
            wifi_dict['time'].append(content[-1][:-1])
    df = pd.DataFrame.from_dict(wifi_dict)
    return df

def read_gps_file(gps_file_path):
    gps_df = pd.read_csv(gps_file_path, header=None, skiprows=1)
    gps_df.columns = ['#lat','long','speed','altitude','time', 'desc']
    return gps_df

def read_acc_file(acc_file_path):
    acc_df = pd.read_csv(acc_file_path, header=None, skiprows=1)
    acc_df.columns = ['x', 'y', 'z', 'time', 'desc']
    return acc_df

def read_audio(filename):
    sr, x = wav.read(filename)
    return sr,x

def copyfile(sourcefile, destination):
    return copy2(sourcefile, destination)

# def copy_acc_and_gps(acc_path, gps_path, destination):
#     acc_df = read_acc_file(acc_path)
#     gps_df = read_gps_file(gps_path)
#     acc_df.to_csv(os.path.join(destination, 'ACC.csv'), index=False)
#     gps_df.to_csv(os.path.join(destination, 'GPS.csv'), index=False)

def save_df(df, parent_path, which_df):
    switcher = {
        'wifi': 'Analysis_WiFi.csv',
        'gps': 'Analysis_GPS.csv',
        'sound': 'Analysis_Sound.csv',
        'acc_raw': 'ACC.csv',
        'gps_raw': 'GPS.csv',
        'd-analysis': 'Analysis_d.csv',
    }
    if switcher.get(which_df) == None:
        raise ValueError(f"which_df should be among: {list(switcher.keys())}")
    out_filename = switcher.get(which_df)
    os.makedirs(parent_path, exist_ok=True)
    df.to_csv(os.path.join(parent_path, out_filename), index=False)
    print(f"Saved in: {os.path.join(parent_path, out_filename)}")