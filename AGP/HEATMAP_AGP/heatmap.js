// // don't forget to include leaflet-heatmap.js
// var testData = {
//     max: 8,
//     data: [{lat: 24.6408, lng:46.7728, count: 3},{lat: 50.75, lng:-1.55, count: 1}, ...]
//   };
  
//   var baseLayer = L.tileLayer(
//     'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
//       attribution: '...',
//       maxZoom: 18
//     }
//   );

// Create a map object
var myMap = L.map("map", {
    center: [21.3068, -157.7912],
    zoom: 2.45
  });
  
  // Adding tile layer to the map
    var baseLayer = L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(myMap); 
  
  
  // // API  EARTHQUAKE
  var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson";
    
// Grab the data with d3
d3.json(link).then(function(data) {
    console.log(data);
  

  var cfg = {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    // if scaleRadius is false it will be the constant radius used in pixels
    "radius": 2,
    "maxOpacity": .8,
    // scales the radius based on map zoom
    "scaleRadius": true,
    // if set to false the heatmap uses the global maximum for colorization
    // if activated: uses the data maximum within the current map boundaries
    //   (there will always be a red spot with useLocalExtremas true)
    "useLocalExtrema": true,
    // which field name in your data represents the latitude - default "lat"
    latField: data.features.geometry.coordinates[0],
    // which field name in your data represents the longitude - default "lng"
    lngField: data.features.geometry.coordinates[1],
    // which field name in your data represents the data value - default "value"
    valueField: data.features.geometry.coordinates[2],
  };
  
  
  var heatmapLayer = new HeatmapOverlay(cfg);
  
  var map = new L.Map('map-canvas', {
    center: new L.LatLng(25.6586, -80.3568),
    zoom: 4,
    layers: [baseLayer, heatmapLayer]
  });
  
  heatmapLayer.setData(data);
});