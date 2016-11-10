# Leaflet.RD
This plugin adds support for the Amersfoort / RD New coordinate system. 
*Created for leaflet 1.0 and up.* 

## Usage

### Standalone
Include the javascript file on your page behind both Leaflet and [Proj4js](http://proj4js.org/)

### Node
Require the Leaflet.RD package.

### Setup Leaflet
Leaflet.RD adds a projection under L.projection.RD and a CRS under L.CRS.RD. 

To immediately  start using RD resources on your map set the CRS of your Leaflet map to L.CRS.RD:
```javascript
var map = L.map("map", {
    crs: L.CRS.RD,
});
```
### Projecting Markers and Vector Layers
Markers and Vector Layers still expect latlng input. Project points using L.projection.RD.unproject(point). You can convert GeoJson-data using [reproject](https://github.com/perliedman/reproject).
