import pandas as pd
# from sklearn.model_selection import train_test_split
import math


def get_train_test_split(list_of_dates, train_size):
    train = [date for date in list_of_dates[0:math.ceil(int(train_size*len(list_of_dates)))]]
    test = [date for date in list_of_dates[math.floor(int(train_size*len(list_of_dates))):]]
    return train, test

def getSplitDf(keys, groups, columns):
    df = pd.DataFrame(columns=columns)
    for key in keys:
        df = df.append(groups.get_group(key))
    return df

def getDayGroups(df, day_column_name):
    grouped = df.groupby(day_column_name)
    day_keys = list(grouped.groups.keys())
    print(f"Total number of days recorded: {len(day_keys)}")
    return grouped, day_keys

def splitDays(path_to_processed_csv, train_split_ratio=0.7, day_column_name="start_date"):
    processed_df = pd.read_csv(path_to_processed_csv)
    grouped, unique_days = getDayGroups(processed_df, day_column_name)
    unique_days = sorted(unique_days)
    train_days, test_days = get_train_test_split(unique_days, train_size=train_split_ratio)
    print(f"Days in training set: {len(train_days)}\nDays in training set: {len(test_days)}")
    columns = processed_df.columns
    train_df, test_df = getSplitDf(train_days, grouped, columns), getSplitDf(test_days, grouped, columns)
    assert train_df.shape[0] + test_df.shape[0] == processed_df.shape[0]
    print(f"Total instances in processed df: {processed_df.shape[0]}\nTotal instances in training df: {train_df.shape[0]}\nTotal instances in testing df: {test_df.shape[0]}")
    return train_df, test_df