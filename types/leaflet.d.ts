import * as L from 'leaflet';

declare module 'leaflet' {
    namespace CRS {
        const RD: L.CRS;
    }

    namespace Projection {
        const RD: L.Projection;
    }
}