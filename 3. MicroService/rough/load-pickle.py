import pickle


def load_pickle(path, read_mode='rb'):
	###############################################
	#Example usage:
	#	data = load_pickle(r"path\to\file\scores_pickle")
	#	print("%s %s" %(type(data), type(data[0])))
	#
	###############################################
	data = None
	with open(path, read_mode) as infile:
		data = pickle.load(infile)
	return data



def write_pickle(object, path, write_mode='wb'):
	###############################################
	#Example usage:
	#	data = [[1, 2], [3, 4, 5], [6, 7, 8]]
	#	write_pickle(data, r"path\to\output\filename")
	#
	###############################################
	with open(path, write_mode) as outfile:
		pickle.dump(object, outfile)