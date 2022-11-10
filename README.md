# <strong><em>BuStop</em></strong> Framework
We propose a machine-learning driven context-aware framework entitled <em>BuStop</em> which can detect diferent types of stay-locations of a public bus, namely regular bus stop, stop at traic signal, stop due to excessive traffic congestion, stops due to turns on the road and finally the randomly given ad-hoc stops. The framework does this by correctly identifying and choosing context-aware features extracted from multiple modalities that allow the framework to discern between these stay-locations. Rigorous evaluation of the framework on the in-house collected dataset shows appreciable accuracy, thus providing an eicient way of characterizing the stay-locations. Additionally, we also develop a PoC system on top of the developed framework to analyze and identify the framework’s potential in providing an accurate expected time of arrival, one of the most critical pieces of information required for pre-planning the travel. Further analysis of the PoC setup, with simulation over the test dataset, shows that the stay-locations’ characterization allows the setup to predict the arrival time with a deviation of less than 60 seconds.
<p align="center">
      <img src="Figures/powerpoints/PoI framework.PNG" width="70%"/>
</p>

## In-house Dataset
This dataset contains the bus trajectory dataset (1335.365 km) collected by 6 volunteers who were asked to travel across the sub-urban city of Durgapur, India, on intra-city buses (route name: 54 Feet). During the travel the volunteers captured sensor logs through an Android application installed on COTS smartphones. The details of the modalities logged by the Android application is given as follows.

|    `Modality`       | `Sample Rate (Hz)` |      `File Pattern`       |
|:--------------------|:------------------:|:-------------------------:|
|    GPS              |        1           |All/Bus_GPS_\*.txt         |
|    Speed            |        1           |All/Bus_GPS_\*.txt         |
|    Altitude         |        1           |All/Bus_GPS_\*.txt         |
|    accelerometer    |        197         |All/Bus_ACC_\*.txt         |
|    Gyroscope        |        197         |All/Bus_GYR\*.txt          |
|    WiFi             |        8000        |All/Bus_WiFi_\*.txt        |
|    Light            |        5           |Light/Bus_LIGHT\*.txt      |
|    Sound            |        8000        |Sound/Bus_SOUND_\*.wav     |


### Known Issues with the Dataset
Some of the minor known probelms in the dataset are:
1. Some of the WiFi SSID(s) have characters replaced by unrecognised characters (or even emojis).
2. A suggested way of calculating the speed of the vehicle is by computing the difference in distance from the GPS coordinates and then checking the time taken to travel that distance. However, that would also include the stoppage time, if any.

## Dataset Link
Download the dataset from here [Github](https://github.com/stilllearningsoumya/bus_trajectory_dataset) | [OneDrive](https://iitkgpacin-my.sharepoint.com/:u:/g/personal/pkarmakar_kgpian_iitkgp_ac_in/EYXROxN9QzxIg-ts4qwDjdEBoEGRgHO07HggdEVjX4Ppng)

# Reference
To refer the <em>BuStop</em> framework or the dataset, please cite the following work.

[Download the paper from here](https://dl.acm.org/doi/10.1145/3549548).

BibTex Reference:
```
@article{10.1145/3549548,
author = {Mandal, Ratna and Karmakar, Prasenjit and Chatterjee, Soumyajit and Spandan, Debaleen Das and Pradhan, Shouvit and Saha, Sujoy and Chakraborty, Sandip and Nandi, Subrata},
title = {Exploiting Multi-Modal Contextual Sensing for City-Bus’s Stay Location Characterization: Towards Sub-60 Seconds Accurate Arrival Time Prediction},
year = {2022},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
issn = {2691-1914},
url = {https://doi.org/10.1145/3549548},
doi = {10.1145/3549548},
note = {Just Accepted},
journal = {ACM Trans. Internet Things},
month = {jul},
keywords = {multi-modal sensing, smartphone computing, intelligent transportation, stay-location detection, machine learning}
}
```
For questions and general feedback, contact Sandip Chakraborty (sandipc@cse.iitkgp.ac.in).
