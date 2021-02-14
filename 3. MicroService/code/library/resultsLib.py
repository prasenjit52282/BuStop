from sklearn.metrics import accuracy_score,precision_score,recall_score,f1_score,classification_report

def get_performance_stats(test_or_train, true_values, predicted_values):
    print(f"For {test_or_train}: ")
    print(f"\tAccuracy: {accuracy_score(true_values, predicted_values)}")
    print(f"\tPrecision: {precision_score(true_values, predicted_values,average='weighted')}")
    print(f"\tRecall: {recall_score(true_values, predicted_values,average='weighted')}")
    print(f"\tF1 score: {f1_score(true_values, predicted_values,average='weighted')}")
    print(classification_report(true_values, predicted_values))

def form_result_df(original_df, predictions, poi_column):
    result_df = original_df.copy()
    result_df["instance_date"] = result_df.start_date
    result_df["instance_start_time"] = result_df.start_time
    result_df["instance_end_time"] = result_df.end_time
    result_df[f"Prediction {poi_column}"] = predictions
    return result_df[["instance_date", "instance_start_time", "instance_end_time", f"Prediction {poi_column}"]]