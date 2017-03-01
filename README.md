[![Build Status](https://travis-ci.org/geoloep/Leaflet.RD.svg?branch=master)](https://travis-ci.org/geoloep/Leaflet.RD)

# Leaflet.RD
Deze plugin voegt ondersteuning voor het Rijksdriehoeksstelsel toe aan Leaflet. Gebruik het meegelverde coördinatensysteem bij het aanmaken van een nieuwe kaart. Leaflet is dan meteen geschikt voor het tonen van bijvoorbeeld kaartlagen uit [PDOK](https://www.pdok.nl/).

This plugin adds support for the Amersfoort / RD New coordinate system. 
*Created for leaflet 1.0 and up.* 

## Usage

### Standalone
Include the javascript file on your page behind both Leaflet and [Proj4js](http://proj4js.org/)

### Node
Require the '[leaflet-rd](https://www.npmjs.com/package/leaflet-rd)' package.

### Setup Leaflet
Leaflet.RD adds a projection under L.projection.RD and a CRS under L.CRS.RD. 

To immediately  start using RD resources on your map set the CRS of your Leaflet map to L.CRS.RD:
```javascript
var map = L.map("map", {
    crs: L.CRS.RD,
});
```

The plugin exports L.CRS.RD, in node the following is also possible:
```javascript
var rd = require("leaflet-rd");

var map = L.map("map", {
    crs: rd,
});
```

### Projecting Markers and Vector Layers
Markers and Vector Layers still expect latlng input. Project points using L.projection.RD.unproject(point) or map.options.crs.projection.unproject. You can convert GeoJson-data using [reproject](https://github.com/perliedman/reproject), as an added convenience an proj4 defenition string is located at L.projection.RD.pro4def.
