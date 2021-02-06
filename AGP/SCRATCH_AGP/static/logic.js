// API
var dataanalystpath = "http://127.0.0.1:5000/data";
console.log(dataanalystpath)

// // SET UP: define LayersGroups

var layerOne = new L.LayerGroup();
var layerTwo = new L.LayerGroup();

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
   "Layer One": layerOne,
   "Layer Two": layerTwo
 }
 
// Create Map, pass in standard layers for default setting
var myMap = L.map("map", {
    center: [38.58, -93.46],
    zoom: 4,
    layers: [standardMap, layerOne]
  });
  
// Create a Layer Control + Pass in baseMaps and overlayMaps + Add the Layer Control to the Map
  L.control.layers(baseMaps, mapLayers).addTo(myMap);

// controls the colors of the dots (paired to RATING)
function pointColor(Rating){
    if (Rating>4)
    return "DarkGreen"
    if (Rating>3)
    return "GreenYellow"
    else if (Rating>2)
    return "Yellow"
    else 
    return "Blue"
  }  

function pointColor2(Rating){
    if (Rating>4)
    return "Purple"
    if (Rating>3)
    return "Pink"
    else if (Rating>2)
    return "Red"
    else 
    return "Blue"
}    
// FIRST APPROACH (group work): flask (app.py) > serve in app > js queries app

// Grab the data with d3
d3.json(dataanalystpath).then(function (data) {
    console.log(data);

// convert the data into coordinates, store related info
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
    // Loop through the plotdata array and create one marker for each city, bind a popup containing its name and population add it to the map
    for (var i = 0; i < plotdata.length; i++) {
        var city = plotdata[i];
        L.circleMarker(city.location, {
            color : "black",
            radius : city.Rating*5,
            fillOpacity : 0.75,
            fillColor : pointColor(city.Rating)            
        })
            .bindPopup(
                city.citystate + 
                "<hr> Industry: "+ city.industry +
                "<br> Salary Midpoint: "+ city.salary_Mid +
                "<br> Rating: "+ city.Rating
              )
            .addTo(layerOne);
            layerOne.addTo(myMap);}

    for (var i = 0; i < plotdata.length; i++) {
        var city = plotdata[i];
        L.circleMarker(city.location, {
            color : "black",
            radius : city.Rating*5,
            fillOpacity : 0.75,
            fillColor : pointColor2(city.Rating)            
        })
            .bindPopup(
                "SECOND LAYER"+
                "<br>"+ city.citystate + 
                "<hr> Industry: "+ city.industry +
                "<br> Salary Midpoint: "+ city.salary_Mid +
                "<br> Rating: "+ city.Rating
              )
            .addTo(layerTwo);
            layerTwo.addTo(myMap);}
            
    // }





//   },

});

//   pointToLayer: function(feature, latlng){
//     return L.circleMarker(latlng)
//   }

//   }).addTo(layerOne);
//   layerOne.addTo(myMap);
// }
//  // NEW LAYER :

// // Create a variable for the new data set
//   var plateData

//   // Grab plate data with d3
//   d3.json(Tec_link).then(function(tec_data) {
//     console.log(tec_data);
//     L.geoJson(tec_data).addTo(plates);

//     // Add Layer to the Map
//     plates.addTo(myMap)
// });



  // code for LEGEND
  
//   var legend = L.control({position: 'bottomright'});

//   legend.onAdd = function (map) {
  
//       var div = L.DomUtil.create('div', 'info legend'),
//           depth = [1, 2, 3, 4],
//           labels = [];

//       div.innerHTML += "<h3>DATA</h3>"
  
//       // loop through depth and create legend colors
//       for (var i = 0; i < feature.properties.Rating.length; i++) {
//           div.innerHTML +=
//               '<i style="background:' + pointColor (feature.properities.Rating[i] + 1) + '"></i> ' +
//               feature.properties.Rating[i] + (features.properties.Rating[i + 1] ? '&ndash;' + feature.properities.Rating[i + 1] + '<br>' : '+');
//       }
  
//       return div;
//   };
  
//   legend.addTo(myMap);

// });

// [{location:[lat,lon]}]
// HINTS: Store this in MongoDB so you don't have to do some stuff