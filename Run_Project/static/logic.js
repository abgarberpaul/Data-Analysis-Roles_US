// API
var dataanalystpath = "http://127.0.0.1:5000/data";
console.log(dataanalystpath)

// // SET UP: define LayersGroups

var layerOne = new L.LayerGroup();
var layerTwo = new L.LayerGroup();
var layerThree = new L.LayerGroup();

// // SET UP: define variables for layers

var standardMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

var grayMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v9",
  accessToken: API_KEY
});

var geoMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/satellite-v9",
  accessToken: API_KEY
});

// Create a base map object to hold base layer variables
var baseMaps = {
  "Standard" : standardMap,
  "Gray": grayMap,
  "Satellite" : geoMap
};

// Overlay Object (holds over layers)
 var mapLayers = {
   "Rating": layerOne,
   "Salary": layerTwo,
   "Job Count": layerThree
 }
 
// Create Map, pass in standard layers for default setting
var myMap = L.map("map", {
    center: [38.58, -93.46],
    zoom: 3,
    layers: [grayMap, layerThree]
  });
  
// Create a Layer Control + Pass in baseMaps and overlayMaps + Add the Layer Control to the Map
  L.control.layers(baseMaps, mapLayers).addTo(myMap);

// controls the colors of the dots (paired to RATING)
function pointColorRating(Rating){
    if (Rating>4)
    return "Cyan"
    if (Rating>4)
    return "DeepBlueSky"
    if (Rating>3)
    return "RoyalBlue"
    else if (Rating>2)
    return "MediumBlue"
    else if (Rating>1)
    return "DarkBlue"
    else 
    return "MidnightBlue"
  }  
// controls the colors of the dots (paired to SALARY)
function pointColorSalary(salary_Mid){
    if (salary_Mid>145000)
    return "#8f00b3"
    if (salary_Mid>125000)
    return "#d11aff"
    else if (salary_Mid>100000)
    return "#e066ff"
    else if (salary_Mid>75000)
    return "#f0b3ff"
    else if (salary_Mid>55000)
    return "#fae6ff"
    else 
    return "#ffffff"
}    
// FIRST APPROACH (group work): flask (app.py) > serve in app > js queries app

// Grab the data with d3
d3.json(dataanalystpath).then(function (data) {
    console.log(data);

// convert the data into coordinates, store related info:
    console.log(data.lat);
    console.log(Object.keys(data.lat).length);
    var index = 0;
    var plotdata = [];
    Object.keys(data.lat).forEach(function () {
        var thisobject = {
            location: [data.lat[index], data.lng[index]],
            citystate: data.Location[index],
            salary_Mid: data.Salary_Mid[index], //salary_Mid is a string
            industry: data.Industry[index],
            Rating: data.Rating[index]
        }
        plotdata.push(thisobject)
        index = index + 1
    })
    console.log(plotdata)

    // ORIGINAL PATH:
    // Loop through the plotdata array and create one marker for each city, 
    // bind a popup containing its name and population add it to the map.
  
  
    // LAYER ONE: RATING

    for (var i = 0; i < plotdata.length; i++) {
        var city = plotdata[i];
        L.circleMarker(city.location, {
            color : "black",
            radius : city.Rating*4,
            fillOpacity : 0.75,
            fillColor : pointColorRating(city.Rating)            
        })
            .bindPopup(
              "RATINGS LAYER"+
              "<br>"+ city.citystate + 
                "<hr> Industry: "+ city.industry +
                "<br> Salary Midpoint: $"+ city.salary_Mid +
                "<br> Rating: "+ city.Rating
              )
            .addTo(layerOne);
            layerOne.addTo(myMap);}
    
    // LAYER TWO: SALARY LAYER
    for (var i = 0; i < plotdata.length; i++) {
        var city = plotdata[i];
        L.circleMarker(city.location, {
            color : "black",
            radius : city.salary_Mid/5000,
            fillOpacity : 0.75,
            fillColor : pointColorSalary(city.salary_Mid)            
        })
            .bindPopup(
                "SALARY LAYER"+
                "<br>"+ city.citystate + 
                "<hr> Industry: "+ city.industry +
                "<br> Salary Midpoint: $"+ city.salary_Mid +
                "<br> Rating: "+ city.Rating
              )
            .addTo(layerTwo);            
            layerTwo.addTo(myMap);}
     
    // LAYER THREE : HEAT MAP
    // SHOWS THE CONCENTRATION OF DATA POINTS (does not tie to salary )
    
    var index = 0;
    var plotdata = [];
    Object.keys(data.lat).forEach(function () {
        var thisobject = {
            lat: data.lat[index],
            lng: data.lng[index],
            count: data.Salary_Mid[index]
        }
        plotdata.push(thisobject)
        index = index + 1
    })

    // NOTE - hard coded due to time constraints.
    var testData = {
      max: 60,
      data: plotdata
    }

    var cfg = {
      // radius should be small ONLY if scaleRadius is true (or small radius is intended)
      // if scaleRadius is false it will be the constant radius used in pixels
      "radius": 20,
      "maxOpacity": .8,
      // scales the radius based on map zoom
      "scaleRadius": false,
      // if set to false the heatmap uses the global maximum for colorization
      // if activated: uses the data maximum within the current map boundaries
      //   (there will always be a red spot with useLocalExtremas true)
      "useLocalExtrema": false,
      // which field name in your data represents the latitude - default "lat"
      latField: 'lat',
      // which field name in your data represents the longitude - default "lng"
      lngField: 'lng',
      // which field name in your data represents the data value - default "value"
      valueField: 'lat'
    };

    var heatmapLayer = new HeatmapOverlay(cfg);
   

    // layerThree.addTo(myMap);
    // console.log(cfg);

    heatmapLayer.setData(testData);
    heatmapLayer.addTo(layerThree);

  // code for LEGEND
  
        var legendSalary = L.control({position: 'bottomright'});

        legendSalary.onAdd = function () {
            var div = L.DomUtil.create('div', 'info legend'),
                salary_range = [55000, 75000, 100000, 125000, 145000],
                labels = [];

            div.innerHTML += "<h3> SALARY </h3>"
            console.log(city)
            console.log(city.salary_Mid)

            // loop through salaries and create legend colors
            for (var i = 0; i < salary_range.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + pointColorSalary (salary_range[i] + 1) + '"></i> ' +
                    salary_range[i] + (salary_range[i + 1] ? '&ndash;' +
                    salary_range[i + 1] + '<br>' : '+');
            }
            return div;            
        };

        legendSalary.addTo(myMap);
        
        var legendRating = L.control({position: 'bottomleft'});

        legendRating.onAdd = function () {
            var div = L.DomUtil.create('div', 'info legend'),
                rating_range = [1, 2, 3, 4, 5],
                labels = [];

            div.innerHTML += "<h3> RATING </h3>"
          
            // loop through salaries and create legend colors
            for (var i = 0; i < rating_range.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + pointColorRating(rating_range[i] + 1) + '"></i> ' +
                    rating_range[i] + (rating_range[i + 1] ? '&ndash;' +
                    rating_range[i + 1] + '<br>' : '+');
            }
            return div;            
        };
        legendRating.addTo(myMap);
        });
