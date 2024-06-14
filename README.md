# leaflet-challenge

## Project Overview
The United States Geological Survey (USGS) is tasked with providing scientific data about natural hazards, ecosystem health, environmental changes, and more. This project focuses on visualizing earthquake data collected by the USGS. The goal is to create an interactive map that displays earthquake information in a meaningful way.

## Languages, Tools and Libraries Used
JavaScript
D3.js: For data fetching and manipulation.
Leaflet: For creating interactive maps.
HTML/CSS: For structuring and styling the webpage.

## Description of Process
### Data Acquisition
Dataset Source: The earthquake data is sourced from the USGS GeoJSON Feed. This feed provides real-time earthquake data updated every 5 minutes.

Dataset Selection: For this project, the dataset representing "All Earthquakes from the Past 7 Days" was chosen. The data is available in JSON format and contains information on the location, magnitude, depth, and other attributes of each earthquake.

### Data Visualization
Map Creation: A basic map was created using Leaflet centered on a latitude and longitude that covers the area of interest.
Tile layers from OpenStreetMap and CartoDB were used for the base map.

Plotting Earthquakes:Earthquake data was plotted on the map using circle markers.
Marker Size: The size of each marker was determined by the earthquake's magnitude. Larger magnitudes resulted in larger markers.
Marker Color: The color of each marker was determined by the depth of the earthquake. Deeper earthquakes were represented with darker colors.

Popups: Each marker was equipped with a popup that displayed additional information about the earthquake, including the location, time, magnitude, and depth.
Legend: A legend was added to the map to provide context for the marker colors, indicating the depth range of the earthquakes.

### Implementation Details
Fetching Data: D3.js was used to fetch the earthquake data from the USGS API.
Circle Markers: Leaflet's L.circleMarker function was used to create markers with properties like radius and color dynamically set based on the earthquake's attributes.
Popup Bindings: Each marker was bound with a popup using Leaflet's bindPopup method.
Legend Creation: A custom legend was created using Leaflet's L.control method, styled with CSS for clarity.

## Conclusion
This project successfully demonstrates how to visualize real-time earthquake data using modern web technologies. By plotting earthquakes on an interactive map, the project provides a clear and informative way to understand seismic activity. The use of marker size and color to represent magnitude and depth makes the visualization intuitive and accessible. This tool can aid the USGS in educating the public and other stakeholders about earthquake activity, potentially securing more support for their important work.

## See Visual Sample
![Figure 1: Screen shot of map.](Visualization_Sample.png)
