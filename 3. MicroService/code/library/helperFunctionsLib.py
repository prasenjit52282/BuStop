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