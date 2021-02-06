// Create a map object
var myMap = L.map("map", {
  center: [21.3068, -157.7912],
  zoom: 2.45
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap); 


// // API  EARTHQUAKE
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson";

// controls the colors of the dots (paired to MAG)
function earthQuakeColor (mag){
  if (mag>90)
  return "purple"
  if (mag>70)
  return "DarkRed"
  else if (mag>50)
  return "OrangeRed"
  else if (mag>30)
  return "Gold"
  else if (mag>10)
  return "GreenYellow"
  else 
  return "Green"
}

// Grab the data with d3
d3.json(link).then(function(data) {
  console.log(data);

  // // Build MARKERS
  // (currently flags only appear when CLICKed)
  
  // code sets text on flag
  // set to display MAG 
  L.geoJson(data, {
    onEachFeature: function(feature, layer){
      var myDate = new Date(feature.properties.time);
      layer.bindPopup(
        feature.properties.place+
        "<hr> Time: "+ myDate.toGMTString()+
        "<br> Magnitude: "+ feature.properties.mag+
        "<br> Depth: "+ feature.geometry.coordinates[2]
      )
    },
  // set FLAG STYLE
  // color set to DEPTH
  style: function(feature){
    return {
    color : earthQuakeColor(feature.geometry.coordinates[2]),
    radius : feature.properties.mag*3,
    fillOpacity : 0.75,
    fillColor : earthQuakeColor(feature.geometry.coordinates[2])
  }
  },


  pointToLayer: function(feature, latlng){
    return L.circleMarker(latlng)
  }

  }).addTo(myMap)

  // code for legend
  
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
          magnitudes = [-10, 10, 30, 50, 70, 90],
          labels = [];
  
      // loop through magnitudes and create legend colors
      for (var i = 0; i < magnitudes.length; i++) {
          div.innerHTML +=
              '<i style="background:' + earthQuakeColor (magnitudes[i] + 1) + '"></i> ' +
              magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
      }
  
      return div;
  };
  
  legend.addTo(myMap);

  });



