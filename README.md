# Where is the best job market for Data Analysts in the USA?

### Team: 
Alejandro Barnatan, Aaron Garber-Paul, Brett Williams, Sung Choo, Adam Fancher

### Data set & Programming technique:
Our team used a csv of us census data related to jobs. Using SQL we transformed it into a json file. Using javascript, html, and css we constructed an interactive interface to explore salary data for data analysis roles in the US. 


### Business question: 
Describe the data analyst/scientist job market in the United States, what insights can be gleaned in terms of availability, job rating, and salary? Where is the "best place" to be a data analyst? 

### Synopsis:
As expected, job availibilty was concentrated around big metro areas. The west coast, the northeast, and even big southern metro areas like Tampa, Austin, and Atlanta offered good availibitly. 

Upon further inspection, we found higher salaries to be offered in California by an overwhelming amount. The top 4 cities with the highest average mid point salary were all either in San Fransico or Los Angeles. 

Surprisingly, the places with the best company ratings where mostly in the southeast or midwest, with the exception of three cities in Maryland. This led us to beleive that while compensation was lower in these areas, people felt more content with their jobs.  

To find the city with the best overall value, we took the three categories which we used to measure the job market, and gave them weighted values. We felt salary was the most important factor, so we gave it a weight of 50%. Job rating seemed to be a more subjective factor, so we gave it a weight of 15%. We felt that job availibilty was the second most important factor so we weighted it at 35%. 

After weighting each city's average salary, average job rating, and average amount of jobs, we found that Memphis ranked the heighest of all. Here we found that while Memphis didn't have an overwhelming amount of jobs, they still had decent availibilty. This coupled with the fact that Data Analysts are paid handsomly and people rated their jobs very highly means that Memphis has the best rounded package for someone confident in their abilites to get a job in a market with fewer listings. 

### How to Run the project: 
1.	Download the folder “Run_Project” from The A-team’s Github. 
2.  Make sure your mongoDB software is installed and working. 
3.  In the terminal, activate your conda environment. 
4.	Run the datainsert.py file and ensure the mongo database is being fed JSON.
5.  Create your config.js file in the "static" folder within Run_Folder. 
6.	Create the "CONST API_KEY" variable in your config.js and set your api key equal to this variable. 
7.	Run the app.py file to set up the website.

### Explanation of commits: 
Adam's github stopped working a couple days into working on the project. He troubleshot it with Cass but the solution did not stick. He was able to pass us his work through slack so we could push it up. He was an integral part of our team!
