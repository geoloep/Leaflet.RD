(function (factory, window) {

    // define an AMD module that relies on 'leaflet'
    if (typeof define === 'function' && define.amd) {
        define(['leaflet', 'proj4'], factory);

    // define a Common JS module that relies on 'leaflet'
    } else if (typeof exports === 'object' && !(window.test)) {
        module.exports = factory(require('leaflet'), require('proj4'));
    } else {

    // attach your plugin to the global 'L' variable
        if (typeof L !== 'undefined' && typeof proj4 !== 'undefined') {
            factory(L, proj4);
        }
    }
}(function (L, proj4) {
    var def = '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.4171,50.3319,465.5524,1.9342,-1.6677,9.1019,4.0725 +units=m +no_defs ';
    var proj4RD = proj4('WGS84', def);

    var maxZoom = 16; // Alleen de schalen t/m 14 zijn officieel vastgesteld
    var scale = 3440.640;
    var scales = []

    for (var i = 0; i <= maxZoom; i++) {
        scales.push(1 / scale);
        scale /= 2;
    };

    L.Projection.RD = {
        project: function(latlng) {
            var point = proj4RD.forward([latlng.lng, latlng.lat])
            return new L.Point(point[0], point[1]);
        },
        unproject: function(point) {
            var latlng = proj4RD.inverse([point.x, point.y])
            return L.latLng(latlng[1], latlng[0]);
        },

        bounds: L.bounds([482.06, 308914.15], [275902.39, 636381.86]) // Begrenzing in RD(?)

    };

    L.CRS.RD = L.extend({}, L.CRS.Simple, {
        code: 'EPSG:28992',
        infinite: false,
        projection: L.Projection.RD,
        transformation: new L.Transformation(1, 285401.920, -1, 903401.920),

        scale: function(zoom) {
            return scales[zoom];
        },

        zoom: function(scale) {
            return scales.indexOf(scale);
        },
    });

    return L.CRS.RD;
}, window));
