import pandas as pd 
import os
import numpy as np
# read in CSV data file
dataanalyst = pd.read_csv("./AverageSalaryData.csv", delimiter=",")
# write to JSON file
with open("AverageSalaryData.json","w") as file:
    file.write(dataanalyst.to_json())
