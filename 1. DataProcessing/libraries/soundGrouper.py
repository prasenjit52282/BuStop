from .utils import *
import numpy as np

def band_pass(x,sr,fL,fU):
    x = list(np.array(x))
    i = 1
    out = []
    while i*sr<len(x):
        x_ = x[(i-1)*sr:i*sr]
        fft_out = np.fft.fft(x_)
        fft_out[0:fL] = 0
        fft_out[fU:-1] = 0
        wave = np.fft.ifft(fft_out)
        out += list(wave.real)
        i += 1
    return np.array(out).astype(np.int16)


def dbfft(x, fs, win=None, ref=32768):
    N = len(x)
    if win is None:
        win = np.ones(N)
    if len(x) != len(win):
            raise ValueError('Signal and window must be of the same length')
    x = x * win
    sp = np.fft.rfft(x)
    freq = np.arange((N / 2) + 1) / (float(N) / fs)
    s_mag = np.abs(sp) * 2 / np.sum(win)
    s_dbfs = 20 * np.log10(s_mag/ref)
    K = 120
    s_db = s_dbfs + K
    return freq, s_db

def process_sound(sound_file_path, groups, sound_threshold):
    sr, data = read_audio(sound_file_path)
    start = groups.start_time[0] #time_as_int(groups.points[0][0][0].split(' ')[1])
    # apply bandpass filter so that sound inside the range of 2000 to 5001 gets selected
    data = band_pass(data, sr, 2000, 5001)
    i = 1 # elapsed seconds of sound file
    d = {} # dictionary to store honk's timestamps
    while i*sr<len(data):
        x_ = data[(i-1)*sr:i*sr]
        N = 8000
        win = np.hamming(N)
        freq, s_db = dbfft(x_, sr, win)
        if(max(s_db) >= sound_threshold): # selecting max decibals per second which are greater than decibel_limit db
            d[convert_int_to_hms(start)] = 1
        start += 1
        i += 1
    l = [] # stores honk duration in a vertex
    l2 = [] # stores honk duration in an edge
    betStart = 0
    for i, row in groups.iterrows():
        # vertex
        temp = 0 # keeps count of honk duration in the group
        start = row.start_time #getSec(row.points[0][-1])
        end = row.end_time #time_end_range #getSec(row.points[-1][-1])
        while(start <= end): # for every second elapsed inside the group checks if honk present
            temp += d.get(convert_int_to_hms(start), 0)
            start += 1
        l.append(temp)
        # edge
        temp2 = 0 # keeps count of honk duration between this group and the previous, 0 for 1st group
        if betStart == 0:
            betStart = row.end_time + 1 #getSec(row.points[-1][-1])+1
        else:
            betEnd = row.start_time #getSec(row.points[0][-1])
            while betStart < betEnd:  # for every second elapsed inside the edge checks if honk present
                temp2 += d.get(convert_int_to_hms(betStart), 0)
                betStart += 1
            betStart = row.end_time + 1 #getSec(row.points[-1][-1])+1
        l2.append(temp2)
    groups['honk_duration'] = l
    groups['edge_honk_duration'] = l2
    return groups


def make_blank_sound_df(index_count):
    df = pd.DataFrame(index=[i for i in range(index_count)], columns=['honk_duration','edge_honk_duration'])
    df = df.fillna('Not found')
    return df