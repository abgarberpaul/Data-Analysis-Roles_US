# Python code to query Bureau of Labor Statistics (BLS) data
# https://www.bls.gov/developers/api_python.htm#python1
import requests
import json
import prettytable
headers = {'Content-type': 'application/json'}
data = json.dumps({"seriesid": ['CUUR0000SA0','SUUR0000SA0'],"startyear":"2011", "endyear":"2014"})
p = requests.post('https://api.bls.gov/publicAPI/v1/timeseries/data/', data=data, headers=headers)
json_data = json.loads(p.text)
for series in json_data['Results']['series']:
    x=prettytable.PrettyTable(["series id","year","period","value","footnotes"])
    seriesId = series['seriesID']
    for item in series['data']:
        year = item['year']
        period = item['period']
        value = item['value']
        footnotes=""
        for footnote in item['footnotes']:
            if footnote:
                footnotes = footnotes + footnote['text'] + ','
    
'if 'M01' <= period <= 'M12':'
            x.add_row([seriesId,year,period,value,footnotes[0:-1]])
    output = open(&quot;c:\\temp\\&quot; + seriesId + &quot;.txt&quot;,&quot;w&quot;)
    output.write (x.get_string())
    output.close()