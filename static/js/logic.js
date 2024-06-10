// Create map object
let myMap = L.map("map", {
  center: [30, -90],
  zoom: 4
});

// Add tile layer to the map
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(myMap);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);
// Function to determine marker size based on earthquake magnitude
function markerSize(magnitude) {
  // Earthquakes with missing magnitude will be plotted with a size of 1
  // Set default value
  let result = 1;
  if (magnitude) {
    result = Math.pow(magnitude, 2) * 5000;
  }
  return result;
}

function depthColor(depth) {
  // Set default color
  let color = '#CCFFCC';

  // Define colors based on depth
  if (depth >= 90) {
    color = '#FFB3B3'
  } else if (depth >= 70){
    color = '#FFCC99'
  } else if (depth >= 50){
    color = '#FFE0B2'
  } else if (depth >= 30){
    color = '#FFFFCC'
  } else if (depth >= 10){
    color = '#E6FFCC'
  }
  return color;
};

// URL to get the dataset
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson";

// Make API call to retrieve data
d3.json(queryUrl).then(function(data) {
  // Create geoJSON layer with the retrieved data and add it to the map object
  L.geoJson(data, {
    // For each feature in the data, create a circle marker
    pointToLayer: function(feature, latlng) {
      return L.circle(latlng, {
        radius: markerSize(feature.properties.mag),
        color: "grey",
        fillColor: depthColor(feature.geometry.coordinates[2]),
        fillOpacity: 1.0,
        weight: 1
      });
    },

    // Create popup for each marker
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        `<h3>Location: ${feature.properties.place}</h3>
         <hr><p>Date & Time: ${new Date(feature.properties.time)}<br>
         Magnitude: ${feature.properties.mag}<br>
         Depth: ${feature.geometry.coordinates[2]} km</p>`
      );
    }
  }).addTo(myMap);

  // Define legend
  let legend = L.control({position: "bottomright"});

  // Fill legend with content
  legend.onAdd = function() {
    let div = L.DomUtil.create('div', 'info legend');

    // div.style.backgroundColor = 'white';    // Set the background color to white
    // div.style.padding = '6px';              // Add some padding for aesthetics
    // div.style.border = '1px solid #ccc';    // Add a light grey border
    // div.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)'; // Add a subtle shadow

    div.innerHTML = '<strong>Depth</strong><br>';

    // Define depth boundaries range
    depthRange = [{"depth": -10, "range": "-10-10 km"}, 
                   {"depth": 10, "range": "10-30 km"},
                   {"depth": 30, "range": "30-50 km"},
                   {"depth": 50, "range": "50-70 km"},
                   {"depth": 70, "range": "70-90 km"},
                   {"depth": 90, "range": "90+ km"}];

    // Label with colored square for each interval
    depthRange.forEach(x => {
      div.innerHTML += '<i style=background-color:' + depthColor(x.depth) + 
                       '; width: 15px; height: 18px; display: inline-block; margin-right: 8px"></i> ' + x.range + '<br>'
    })
    return div;
  };
  
  // Add legend
  legend.addTo(myMap);

});