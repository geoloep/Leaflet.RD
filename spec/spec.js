describe('L.Projection.RD', function() {
    var rd = L.Projection.RD;

    it('adds a projection', function() {
        expect(rd).toBeDefined();
    });

    it('has an unproject method', function() {
        expect(rd.unproject).toBeDefined();
    });

    it('has an project method', function() {
        expect(rd.project).toBeDefined();
    });

    it('has bounds', function() {
        expect(rd.bounds).toBeDefined();
    });

    it('projects to rd', function() {
        var point = rd.project(L.latLng(52.225, 5.21));
        expect(point.x).toBeCloseTo(142735.75);
        expect(point.y).toBeCloseTo(470715.91);
    });

    it('unprojects to wgs84', function() {
        var latLng = rd.unproject(L.point(142735.75, 470715.91));
        expect(latLng.lng).toBeCloseTo(5.21);
        expect(latLng.lat).toBeCloseTo(52.225);
    });
});

describe('L.CRS.RD', function() {
    var rd = L.CRS.RD;

    it('adds an crs', function () {
        expect(rd).toBeDefined();
    });

    it('provides 16 predifined scale and zoom levels', function() {
        for (var i = 0; i <= 16; i++) {
            var scale = rd.scale(i)
            expect(scale).toBeDefined();
            expect(rd.zoom(scale)).toBeDefined();
        };
    });

    it('provides scales for fractional zoom levels', function() {
        for (var i = 0.5; i <= 15; i += 1) {
            expect(rd.scale(i)).toBeCloseTo(1 / (3440.640 * Math.pow(0.5, i)));
        }
    });

    it('provides zoom for scale levels', function() {
        for (var i = 0; i <= 16; i++) {
            let scale = rd.scale(i);
            expect(rd.zoom(scale)).toBeCloseTo(Math.log((1/scale) / 3440.640) / (Math.log(0.5)));
        };
    })

    it('transforms rd coordinates', function() {
        expect(rd.transformation).toBeDefined();

        var transformed = rd.transformation.transform(L.point(142735.75, 470715.91));
        expect(transformed.x).toBeCloseTo(428137.67);
        expect(transformed.y).toBeCloseTo(432686.01);
    });

});