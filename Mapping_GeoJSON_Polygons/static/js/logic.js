//Add console.log to check to see if our code is working.
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
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
});



//Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

//Accessing the airport GeoJSON URL
let airportData= "https://raw.githubusercontent.com/harrisem95/Mapping_Earthquakes/main/majorAirports.json?token=GHSAT0AAAAAABXO2G3V2KPZNCU64WH5ZZUOY2PGU4Q";

//Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/harrisem95/Mapping_Earthquakes/main/torontoRoutes.json";

//Accessing the Toronto neighborhood GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/harrisem95/Mapping_Earthquakes/main/torontoNeighborhoods.json";

//Create a style for the lines.
let myStyle = {
  color: "blue",
  weight: 1
};

//Grabbing our GeoJSON URL
d3.json(torontoHoods).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.  Skill Drill 13.5.3 add popups to all markers
  L.geoJson(data,{
    style: myStyle,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>" + "Area Name:  " + feature.properties.AREA_NAME +
      "</h3><hr><h3> Area ID: " + feature.properties.AREA_S_CD + "</h3>");
    }    
  }).addTo(map);
  });
