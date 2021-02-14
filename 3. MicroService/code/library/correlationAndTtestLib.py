import itertools
from scipy import stats


def form_pairs_with_scores(instance_scores):
    """Forms a dictionary with pairs of dates as its
        keys and their corressponding scores as their values.

    Parameters
    ----------
    instance_scores: dictionary
                    format is {date: list_of_instacne_wise_scores_of_that_date}

    Returns
    -------
    pairs_with_scores: dictionary
                    format is {(day1, day2): (instacne_wise_score_list_for_day_1,
                                            instacne_wise_score_list_for_day_2)}
                    (day1, day2) is a pair of the combination nC2
                    where n = no. of dates in parameter instance_scores
                    i.e. n = len(instance_scores.keys())
    """
    pairs_with_scores = {}
    pairs = list(itertools.combinations(list(instance_scores.keys()), 2))
    for pair in pairs:
        pairs_with_scores[pair] = (instance_scores[pair[0]],
                                   instance_scores[pair[1]])
    return pairs_with_scores


def kendalltau_correlation_test(array1, array2):
    """Performs Kendalltau correlation test on 2 arrays of scores.

    Parameters
    ----------
    array1: list of int or double
            first array of scores

    array2: list of int or double
            second array of scores

    Returns
    -------
    tuple
        format is (kendalltau correlation, p_value) denoting the 
        result of the kendalltau correlation test.
    """
    assert len(array1) == len(array2), f"Length of both arrays should be same for \
                                    Kendalltau Correlation Test.\nLength of 1st array: \
                                    {len(array1)} and\nLength of 2nd array: {len(array2)}"

    return tuple(stats.kendalltau(array1, array2))


def kendalltau_corr(pairs_with_scores):
    """Formats score arrays for day pairs to find the minimum
        among them and performs kendalltau correlation test on both.

    Parameters
    ----------
    pairs_with_scores: dictionary
                    format is {(day1, day2): (instance_wise_score_list_for_day_1,
                                            instance_wise_score_list_for_day_2)}
            
    Returns
    -------
    correlations: dictionary
                format is {(day1, day2): (kendalltau correlation, p_value)}

    pair_instances_count: dictionary
                format is {(day1, day2): minimum between length of
                                        instance_wise_score_list_for_day_1
                                        and instance_wise_score_list_for_day_2}
    """
    correlations, pair_instances_count = {}, {}
    for pair in pairs_with_scores.keys():
        list_1, list_2 = pairs_with_scores[pair]
        cut = min(len(list_1), len(list_2))
        pair_instances_count[pair] = cut
        list_1, list_2 = list_1[:cut], list_2[:cut]
        # kendalltau returns correlation and p_value
        correlations[pair] = kendalltau_correlation_test(list_1, list_2)
    return correlations, pair_instances_count


def welch_t_test(array1, array2):
    """Performs Welch's t-test on 2 arrays of scores.

    Parameters
    ----------
    array1: list of int or double
            first array of scores

    array2: list of int or double
            second array of scores

    Returns
    -------
    tuple
        format is (t_test_stat, p_value) denoting the 
        result of the welch's t-test.
    """
    return tuple(stats.ttest_ind(array1, array2, equal_var=False))


def welch_t(pairs_with_scores):
    """Performs Welch's t-test on scores lists passed as values to day
    pairs in the parameter and provides result in a dictionary with 
    day pair as its keys.

    Parameters
    ----------
    pairs_with_scores: dictionary
                    format is {(day1, day2): (instacne_wise_score_list_for_day_1,
                                            instacne_wise_score_list_for_day_2)}

    Returns
    -------
    welch: dictionary
        format is {(day1, day2): (t_test_stat, p_value)}
    """
    welch = {}
    for pair in pairs_with_scores.keys():
        list_1, list_2 = pairs_with_scores[pair]
        welch[pair] = welch_t_test(list_1, list_2)
    return welch
