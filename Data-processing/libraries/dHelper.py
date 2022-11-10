from .utils import *


def increase_d(d, gps_trail_file_path, df):
    gps_df = read_gps_file(gps_trail_file_path)
    gps_df['time_int'] = gps_df['time'].apply(
        lambda x: time_as_int(x.split(' ')[1]))
    gps_df = gps_df.set_index(['time_int'])
    times = []
    for idx, i in enumerate(df['start_time']):
        if idx == 0:
            times.append(i)
            continue
        start_time = i
    #     print(new_df.loc[i, :])
        group_start_point = gps_df.loc[i, :]
        delta_d = group_start_point['speed'].mean()
        prev_add_speed = delta_d
        temp_idx = idx  # for avoiding infinite loop when speed is 0 and KeyError occurs
        while delta_d < d:
            start_time -= 1
            temp_idx -= 1
            if temp_idx < 0:  # for avoiding infinite loop when speed is 0 and KeyError occurs
                break
            try:
                prev_point = gps_df.loc[start_time, :]
                delta_d += prev_point['speed'].mean()
                prev_add_speed = prev_point['speed'].mean()
            except KeyError:
                delta_d += prev_add_speed
        times.append(start_time)
    df['d_start_time'] = times
    return df
