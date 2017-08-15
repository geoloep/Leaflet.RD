(function (factory, window) {

    // define an AMD module that relies on 'leaflet'
    if (typeof define === 'function' && define.amd) {
        define(['leaflet', 'proj4'], factory);

    // define a Common JS module that relies on 'leaflet'
    } else if (typeof exports === 'object' && !(window.test)) {
        module.exports = factory(require('leaflet'), require('proj4').default);
    } else {

    // attach your plugin to the global 'L' variable
        if (typeof L !== 'undefined' && typeof proj4 !== 'undefined') {
            factory(L, proj4);
        }
    }
}(function (L, proj4) {
    var def = '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.4171,50.3319,465.5524,-0.398957,0.343988,-1.87740,4.0725 +units=m +no_defs';
    var proj4RD = proj4('WGS84', def);

    var maxZoom = 16; // Alleen de schalen t/m 14 zijn officieel vastgesteld
    var zeroScale = 3440.640;
    var scales = []

    for (var i = 0; i <= maxZoom; i++) {
        scales.push(1/ (zeroScale * Math.pow(0.5, i)));
    };

    L.Projection.RD = {
        project: function(latlng) {
            var point = proj4RD.forward([latlng.lng, latlng.lat]);
            return new L.Point(point[0], point[1]);
        },
        unproject: function(point) {
            var lnglat = proj4RD.inverse([point.x, point.y]);
            return L.latLng(lnglat[1], lnglat[0]);
        },

        bounds: L.bounds([-285401.920, 903401.920], [595401.920, 22598.080]),
        
        proj4def: def
    };

    L.CRS.RD = L.extend({}, L.CRS.Simple, {
        code: 'EPSG:28992',
        infinite: false,
        projection: L.Projection.RD,
        transformation: new L.Transformation(1, 285401.920, -1, 903401.920),

        scale: function(zoom) {
            if (scales[zoom]) {
                return scales[zoom]
            } else {
                return 1 / (zeroScale * Math.pow(0.5, zoom));
            }
        },

        zoom: function(scale) {
            return Math.log((1/scale) / zeroScale) / (Math.log(0.5));
        },
    });

    return L.CRS.RD;
}, window));
