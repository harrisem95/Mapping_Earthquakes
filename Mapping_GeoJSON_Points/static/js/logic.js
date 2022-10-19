// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
};

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [30,30],
    zoom: 2,
    layers: [streets]
});


//Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

//Accessing the airport GeoJSON URL
let airportData= "https://raw.githubusercontent.com/harrisem95/Mapping_Earthquakes/main/majorAirports.json?token=GHSAT0AAAAAABXO2G3V2KPZNCU64WH5ZZUOY2PGU4Q";

//Grabbing our GeoJSON URL
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.  Skill Drill 13.5.3 add popups to all markers
  L.geoJson(data,{
    onEachFeature: function(feature, layer) {
      console.log(layer);
      layer.bindPopup("<h3>" + "Airport Code: " + feature.properties.faa +
      "</h3><hr><p>" + feature.properties.name + "</p>");
    }    
  }).addTo(map);
  });
