// Add console.log tto check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [39.5,-98.5],
    zoom: 3,
    layers: [streets]
});


//Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

//Accessing the airport GeoJSON URL
let earthquakeData= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Grabbing our GeoJSON URL
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    // console.log(data);
  // Creating a GeoJSON layer with the retrieved data.  Skill Drill 13.5.3 add popups to all markers
  L.geoJson(data).addTo(map);
});


  // L.geoJson(data,{
  //   onEachFeature: function(feature, layer) {
  //     console.log(layer);
  //     layer.bindPopup("<h3>" + "Airport Code: " + feature.properties.faa +
  //     "</h3><hr><p>" + feature.properties.name + "</p>");
  //   }    
  // }).addTo(map);
  // });